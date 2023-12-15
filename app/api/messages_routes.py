from flask import Blueprint, request
from datetime import datetime
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..models import Message
from ..models.db import db

message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:id>')
def get_messages(bytestream_id=None):
    """Query for all messages and returns them in a list of message dictionaries"""
    if bytestream_id is not None:
        messages = Message.query.filter_by(Message.bytestream_id == bytestream_id).all().order_by(Message.timestamp).all()
    else:
        messages = Message.query.all().order_by(Message.timestamp).all()

    ## handle cases where a bytestream has no messages
    if len(messages) == 0:
        return []
    return [message.to_dict() for message in messages]

@message_routes.route('/create', methods=['POST'])
def create_message(bytestream_id=None):
    """Create a message and return the message dictionary"""
    data = request.json

    message = Message(
        bytestream_id=data['bytestreamId'],
        user_id=current_user.id,
        message=data['message']
    )

    db.session.add(message)
    db.session.commit()
    return message.to_dict()
