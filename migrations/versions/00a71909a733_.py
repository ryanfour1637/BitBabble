"""empty message

Revision ID: 12aacbe3a375
Revises:
Create Date: 2023-12-20 09:06:14.648057

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '12aacbe3a375'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('is_online', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('bytespaces',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('date_created', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE bytespaces SET SCHEMA {SCHEMA};")

    op.create_table('bytespace_members',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('bytespace_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['bytespace_id'], ['bytespaces.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE bytespace_members SET SCHEMA {SCHEMA};")

    op.create_table('bytestreams',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('bytespace_id', sa.Integer(), nullable=True),
    sa.Column('date_created', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['bytespace_id'], ['bytespaces.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE bytestreams SET SCHEMA {SCHEMA};")


    op.create_table('bytestream_members',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('bytestream_id', sa.Integer(), nullable=True),
    sa.Column('bytespace_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['bytespace_id'], ['bytespaces.id'], ),
    sa.ForeignKeyConstraint(['bytestream_id'], ['bytestreams.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE bytestream_members SET SCHEMA {SCHEMA};")

    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('bytestream_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('message', sa.String(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=False),
    sa.Column('system', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['bytestream_id'], ['bytestreams.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE messages SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    op.drop_table('bytestream_members')
    op.drop_table('bytestreams')
    op.drop_table('bytespace_members')
    op.drop_table('bytespaces')
    op.drop_table('users')
    # ### end Alembic commands ###
