from flask.cli import AppGroup
from .users import seed_users, undo_users
from .bytespaces import seed_bytespaces, undo_bytespaces
from .bytestreams import seed_bytestreams, undo_bytestreams
from .bytespace_members import seed_bytespace_members, undo_bytespace_members
from .bytestream_members import seed_bytestream_members, undo_bytestream_members
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold commands for `flask seed --help`
seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':

        undo_bytestream_members()
        undo_bytespace_members()
        undo_bytestreams()
        undo_bytespaces()
        undo_users()
    seed_users()
    seed_bytespaces()
    seed_bytestreams()
    seed_bytespace_members()
    seed_bytestream_members()




@seed_commands.command('undo')
def undo():
    undo_bytestream_members()
    undo_bytespace_members()
    undo_bytestreams()
    undo_bytespaces()
    undo_users()
