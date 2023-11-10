from .db import db, environment, SCHEMA, add_prefix_for_prod

class BytespaceMember(db.Model):
    __tablename__ = 'bytespace_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    bytespace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('bytespaces.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    ## User Relationships
    user_bytespacemembers = db.relationship('User', back_populates='bytespacemembers_user')

    ## Bytespace Relationships
    bytespace_bytespacemembers = db.relationship('Bytespace', back_populates='bytespacemembers_bytespace')

    def to_dict(self):
        return {
            'id': self.id,
            'bytespaceId': self.bytespace_id,
            'userId': self.user_id,
        }
