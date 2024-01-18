from flask import Blueprint, request
from datetime import date
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..forms.create_update_bytestream_form import CreateUpdateBytestreamForm
from ..models import Bytestream
from ..forms.create_update_bytespace_form import CreateUpdateBytespaceForm
from ..models.db import db
from sqlalchemy.exc import IntegrityError

bytestream_routes = Blueprint('bytestreams', __name__)

@bytestream_routes.route('')
def bytestreams():
    """Query for all bytestreams and returns them in a list of bytestream dictionaries"""

    all_bytestreams = Bytestream.query.all()
    return [bytestream.to_dict() for bytestream in all_bytestreams]

@bytestream_routes.route('/create/<int:id>', methods=['POST'])
def create_bytestream(id):
    """Adding a bytestream to the database when someone wants to create a new one"""

    form = CreateUpdateBytestreamForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            bytestream = Bytestream(
                name=form.data['name'],
                owner_id=current_user.id,
                bytespace_id=id,
                date_created=date.today()
            )

            db.session.add(bytestream)
            db.session.commit()
            return bytestream.to_dict()
        except IntegrityError:
            db.session.rollback()
            return {'errors': 'A channel with this name already exists'}, 400
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@bytestream_routes.route('/<int:id>/update', methods=['PUT'])
def update_bytestream(id):
    '''Updating a bytestream's details in the database when the user needs to'''
    bytestream_to_update = Bytestream.query.get(id)

    form = CreateUpdateBytestreamForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            new_name = form.data['name']
            bytestream_to_update.name = new_name
            db.session.commit()
            return bytestream_to_update.to_dict()
        except IntegrityError:
            db.session.rollback()
            return {'errors': 'A channel with this name already exists'}, 400
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@bytestream_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_bytestream(id):
    bytestream_to_delete = Bytestream.query.get(id)

    db.session.delete(bytestream_to_delete)
    db.session.commit()
    return {"Message" : "Comment Deleted"}
