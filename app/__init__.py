import os
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
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
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

socketio = SocketIO(app)

@socketio.on('join_bytestream')
def handle_join_bytestream(data):
    join_room(data['bytestream_id'])
    emit('join_stream', data, room=data['bytestream_id'])

@socketio.on('leave_bytestream')
def handle_leave_bytestream(data):
    leave_room(data['bytestream_id'])
    emit('leave_stream', data, room=data['bytestream_id'])

@socketio.on('send_message')
def handle_send_message(data):
    bytestream = data['bytestream_id']
    message = data['message']
    emit('receive_message', {'message': message}, room=bytestream)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('typing')
def handle_typing(data):
    bytestream = data['bytestream_id']
    user=data['user']
    emit('user_typing', {'user': user}, room=bytestream)

@socketio.on('error')
def handle_error(e):
    print(e)

@socketio.on('connect')
def handle_connect():
    user_id = get_user_id()  # Your method to identify the connected user
    user = User.query.get(user_id)
    if user:
        user.is_online = True
        db.session.commit()
        emit('user_status_change', {'user_id': user_id, 'status': 'online'}, broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    user_id = b 
    user = User.query.get(user_id)
    if user:
        user.is_online = False
        db.session.commit()
        emit('user_status_change', {'user_id': user_id, 'status': 'offline'}, broadcast=True)


# @socketio.on('send_file')
# def handle_send_file(data):
#     bytestream = data['bytestream_id']
#     file = data['file']
#     emit('receive_file', {'file': file}, room=bytestream)

# @socketio.on('send_image')
# def handle_send_image(data):
#     bytestream = data['bytestream_id']
#     image = data['image']
#     emit('receive_image', {'image': image}, room=bytestream)

# @socketio.on('send_video')
# def handle_send_video(data):
#     bytestream = data['bytestream_id']
#     video = data['video']
#     emit('receive_video', {'video': video}, room=bytestream)

# @socketio.on('send_audio')
# def handle_send_audio(data):
#     bytestream = data['bytestream_id']
#     audio = data['audio']
#     emit('receive_audio', {'audio': audio}, room=bytestream)
