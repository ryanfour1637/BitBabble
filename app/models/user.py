from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    ## Bytespace Relationships
    bytespace_user = db.relationship('Bytespace', back_populates='user_bytespace', cascade='all, delete-orphan')

    ## Bytestream Relationships
    bytestream_user = db.relationship('Bytestream', back_populates='user_bytestream', cascade='all, delete-orphan')

    ## BytestreamUser Relationships
    bytestreamuser_user = db.relationship('BytestreamUser', back_populates='user_bytestreamuser', cascade='all, delete-orphan')

    ## BytespaceUser Relationships
    bytespaceuser_user = db.relationship('BytespaceUser', back_populates='user_bytespaceuser', cascade='all, delete-orphan')



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'email': self.email
        }
