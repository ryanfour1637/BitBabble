from flask import Blueprint, request
from random import choice, sample
from datetime import date
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..models import Bytespace

bytespace_routes = Blueprint('bytespaces', __name__)

@bytespace_routes.route('')
def public_bytespaces():
    """Query for all bytespaces and returns them in a list of bytespace dictionaries"""

    all_bytespaces = Bytespace.query.all()
    print(all_bytespaces)
    return [bytespace.to_dict() for bytespace in all_bytespaces]
