from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import UniqueConstraint

class Bytestream(db.Model):
    __tablename__ = 'bytestreams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    bytespace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('bytespaces.id')))
    date_created = db.Column(db.Date, nullable=False)

    ## User Relationships
    user_bytestream = db.relationship('User', back_populates='bytestream_user')

    ## Bytespace Relationships
    bytespace_bytestream = db.relationship('Bytespace', back_populates='bytestream_bytespace')

    ## BytestreamUser Relationship
    bytestreammembers_bytestream = db.relationship('BytestreamMember', back_populates='bytestream_bytestreammembers', cascade='all, delete-orphan')

    ## Message Relationships
    message_bytestream = db.relationship('Message', back_populates='bytestream_message', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'bytespaceId': self.bytespace_id,
            'dateCreated': self.date_created
        }
