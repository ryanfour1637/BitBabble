from .db import db, environment, SCHEMA, add_prefix_for_prod

class BytespaceUser(db.Model):
    __tablename__ = 'bytespace_users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    bytespace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('bytespaces.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    ## User Relationships
    user_bytespaceuser = db.relationship('User', back_populates='bytespaceuser_user')

    ## Bytespace Relationships
    bytespace_bytespaceuser = db.relationship('Bytespace', back_populates='bytespaceuser_bytespace')

    def to_dict(self):
        return {
            'id': self.id,
            'bytestreamId': self.bytestream_id,
            'bytespaceId': self.bytespace_id,
            'userId': self.user_id,
            'username': self.user_username,
            'firstName': self.user_first_name,
            'lastName': self.user_last_name,
            'email': self.user_email
        }
