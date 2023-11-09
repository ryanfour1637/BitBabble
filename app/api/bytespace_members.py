from flask import Blueprint, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..models.db import db
from ..models.bytespace_members import BytespaceMember


bytespace_members_routes = Blueprint('bytespace_members', __name__)

@bytespace_members_routes.route('/<int:id>/add_user', methods={'POST'})
def add_to_bytespace(id):
    """This route is used to add users to a specific bytespace"""
    membership_to_add = BytespaceMember(
        bytespace_id=id,
        user_id=current_user.id
    )

    db.session.add(membership_to_add)
    db.session.commit()
    return membership_to_add.to_dict()

@bytespace_members_routes.route('/<int:id>', methods=['DELETE'])
def remove_from_bytespace(id):
    """This route is used to remove users from a specific bytespace"""
    membership_to_delete = BytespaceMember.query.get(id)
    db.session.delete(membership_to_delete)
    db.session.commit()
    return {membership_to_delete}
