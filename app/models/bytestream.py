from .db import db, environment, SCHEMA, add_prefix_for_prod

class Bytestream(db.Model):
    __tablename__ = 'bytestreams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    bytespace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('bytespaces.id')))
    date_created = db.Column(db.Date, nullable=False)

    ## User Relationships
    my_bytestream_user_id = db.relationship('User', back_populates='my_bytestream_id')

    ## Bytespace Relationships
    my_bytespace_id = db.relationship('Bytespace', back_populates='my_bytestream_bytespace_id')

    ## BytestreamUser Relationship
    my_bytestream_users_id = db.relationship('BytestreamUser', back_populates='my_bytestream_id', cascade='all, delete-orphan')



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'bytespaceId': self.bytespace_id,
            'dateCreated': self.date_created
        }
