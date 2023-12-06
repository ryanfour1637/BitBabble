from flask import Blueprint, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..models.db import db
from ..models.bytestream_members import BytestreamMember

bytestream_members_routes = Blueprint('bytestream_members', __name__)

@bytestream_members_routes.route('/<int:bytespaceId>/bytestreams/<int:bytestreamId>/add_user', methods=['POST'])
def add_to_bytestream(bytespaceId, bytestreamId):
    membership_to_add = BytestreamMember(
        bytestream_id=bytestreamId,
        bytespace_id=bytespaceId,
        user_id=current_user.id
    )

    db.session.add(membership_to_add)
    db.session.commit()
    return membership_to_add.to_dict()

@bytestream_members_routes.route('/<int:id>', methods=['DELETE'])
def remove_from_bytestream(id):
    membership_to_delete = BytestreamMember.query.get(id)
    db.session.delete(membership_to_delete)
    db.session.commit()
    return {membership_to_delete}

@bytestream_members_routes.route('/get_all_members')
def get_all_members():
    '''This route is used to get a list of all the members of all the bytespaces'''
    all_bytestreams_membership = BytestreamMember.query.all()
    print(all_bytestreams_membership)
    return [bytestream_members.to_dict() for bytestream_members in all_bytestreams_membership]
