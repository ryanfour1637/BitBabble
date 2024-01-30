import os
from datetime import datetime
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, login_required, current_user
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.bytespace_routes import bytespace_routes
from .api.bytespace_members import bytespace_members_routes
from .api.bytestream_members import bytestream_members_routes
from .api.bytestream_routes import bytestream_routes
from .api.messages_routes import message_routes
from .models import User, Message
from .seeds import seed_commands
from .config import Config

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(bytespace_routes, url_prefix='/api/bytespaces')
app.register_blueprint(bytestream_routes, url_prefix='/api/bytestreams')
app.register_blueprint(bytespace_members_routes, url_prefix='/api/bytespace_members')
app.register_blueprint(bytestream_members_routes, url_prefix='/api/bytestream_members')
app.register_blueprint(message_routes, url_prefix='/api/messages')
db.init_app(app)

Migrate(app, db)
CORS(app)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

socketio = SocketIO(app, cors_allowed_origins="*")


## Begin Channel Routes
@socketio.on('join_room')
def handle_join_room(data):
    join_room(data['bytestream_id'])
    emit('join_room_confirm', {'bytestreamId': data['bytestream_id'], 'user': current_user.to_dict()}, room=data['bytestream_id'])

@socketio.on('leave_room')
def handle_leave_room(data):
    emit('leave_room_confirm', {'bytestreamId': data['bytestream_id'], 'user': current_user.to_dict()}, room=data['bytestream_id'], broadcast=True)
    leave_room(data['bytestream_id'])

@socketio.on('ws_send_message')
def handle_send_message(data):
    bytestream = data['bytestreamId']
    message = data['message']
    if data['system'] == True:
        try:
            new_message = Message(
                bytestream_id=bytestream,
                user_id=current_user.id,
                message=message,
                timestamp=datetime.utcnow(),
                system=True
            )
            db.session.add(new_message)
            db.session.commit()
        except Exception as e:
            print(f"An error occurred: {e}")
    else:
        try:
            new_message = Message(
                bytestream_id=bytestream,
                user_id=current_user.id,
                message=message,
                timestamp=datetime.utcnow(),
                system=False
            )
            db.session.add(new_message)
            db.session.commit()
        except Exception as e:
            print(f"An error occurred: {e}")

    emit("ws_receive_message", new_message.to_dict(), broadcast=True)

@socketio.on('ws_update_message')
def handle_update_message(message_obj):
    message = Message.query.get(message_obj['id'])
    message.message = message_obj['message']
    db.session.commit()
    emit('update_message_confirm', message.to_dict(), broadcast=True)

@socketio.on('ws_delete_message')
def handle_delete_message(message_id):
    message = Message.query.get(message_id)
    db.session.delete(message)
    db.session.commit()
    emit('delete_message_confirm', message.to_dict_delete(), broadcast=True)

@socketio.on('error')
def handle_error(e):
    print(e)


## End Channel Routes

## Begin Direct Message Routes
