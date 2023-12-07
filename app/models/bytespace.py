from .db import db, environment, SCHEMA, add_prefix_for_prod

class Bytespace(db.Model):
    __tablename__ = 'bytespaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    date_created = db.Column(db.Date, nullable=False)

    ## User Relationships
    user_bytespace = db.relationship('User', back_populates='bytespace_user')

    ## Bytestream Relationships
    bytestream_bytespace = db.relationship('Bytestream', back_populates='bytespace_bytestream', cascade='all, delete-orphan')

    ## BytestreamMember Relationships
    bytestreammembers_bytespace = db.relationship('BytestreamMember', back_populates='bytespace_bytestreammembers', cascade='all, delete-orphan')

    ## BytespaceUser Relationships
    bytespacemembers_bytespace = db.relationship('BytespaceMember', back_populates='bytespace_bytespacemembers', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'dateCreated': self.date_created
        }
