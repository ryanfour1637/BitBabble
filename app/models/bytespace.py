from .db import db, environment, SCHEMA, add_prefix_for_prod

class Bytespace(db.Model):
    __tablename__ = 'bytespaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    date_created = db.Column(db.Date, nullable=False)

    ## User Relationships
    my_bytespace_user_id = db.relationship('User', back_populates='my_bytespace_id')

    ## Bytestream Relationships
    my_bytestream_bytespace_id = db.relationship('Bytestream', back_populates='my_bytespace_id', cascade='all, delete-orphan')

    ## BytestreamUser Relationships
    my_bytestream_users_id = db.relationship('BytestreamUser', back_populates='my_bytespace_id', cascade='all, delete-orphan')

    ## BytespaceUser Relationships
    my_bytespace_users_id = db.relationship('BytespaceUser', back_populates='my_bytespace_id', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'dateCreated': self.date_created
        }
