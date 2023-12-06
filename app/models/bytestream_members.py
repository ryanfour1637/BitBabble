from .db import db, environment, SCHEMA, add_prefix_for_prod

class BytestreamMember(db.Model):
    __tablename__ = 'bytestream_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    bytestream_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('bytestreams.id')))
    bytespace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('bytespaces.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    ## User Relationships
    user_bytestreammembers = db.relationship('User', back_populates='bytestreammembers_user')

    ## Bytespace Relationships
    bytespace_bytestreammembers = db.relationship('Bytespace', back_populates='bytestreammembers_bytespace')

    ## Bytestream Relationships
    bytestream_bytestreammembers = db.relationship('Bytestream', back_populates='bytestreammembers_bytestream')

    def to_dict(self):
        return {
            'id': self.id,
            'bytestreamId': self.bytestream_id,
            'bytespaceId': self.bytespace_id,
            'userId': self.user_id,
        }
