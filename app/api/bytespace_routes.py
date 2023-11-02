from flask import Blueprint, request
from random import choice, sample
from datetime import date
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..models import Bytespace
from ..forms.create_bytespace_form import CreateBytespaceForm
from ..models.db import db

bytespace_routes = Blueprint('bytespaces', __name__)

@bytespace_routes.route('')
def public_bytespaces():
    """Query for all bytespaces and returns them in a list of bytespace dictionaries"""

    all_bytespaces = Bytespace.query.all()
    return [bytespace.to_dict() for bytespace in all_bytespaces]

@bytespace_routes.route('/create', methods=['POST'])
def create_bytespace():
    """Adding a bytespace to the database when someone wants to create a new one"""

    form = CreateBytespaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('inside form', form.data['name'])
    if form.validate_on_submit():
        bytespace = Bytespace(
            name=form.data['name'],
            owner_id=current_user.id,
            date_created=date.today()
        )

        db.session.add(bytespace)
        db.session.commit()
        return bytespace.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
