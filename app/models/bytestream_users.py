from .db import db, environment, SCHEMA, add_prefix_for_prod

class BytestreamUser(db.Model):
    __tablename__ = 'bytestream_users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    bytestream_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('bytestreams.id')))
    bytespace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('bytespaces.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    user_username = db.Column(db.String(add_prefix_for_prod('users.username')))
    user_first_name = db.Column(db.String(add_prefix_for_prod('users.first_name')))
    user_last_name = db.Column(db.String(add_prefix_for_prod('users.last_name')))
    user_email = db.Column(db.String(add_prefix_for_prod('users.email')))

    ## Bytespace Relationships
    my_bytespace_id = db.relationship('Bytespace', back_populates='my_bytestream_users_id')

    ## Bytestream Relationships
    my_bytestream_id = db.relationship('Bytestream', back_populates='my_bytestream_users_id')

    ## User Relationships
    my_user_id = db.relationship('Users', back_populates='my_bytestream_users_id')
    my_user_username = db.relationship('Users', back_populates='my_bytestream_users_username')
    my_user_first_name = db.relationship('Users', back_populates='my_bytestream_users_first_name')
    my_user_last_name = db.relationship('Users', back_populates='my_bytestream_users_last_name')
    my_user_email = db.relationship('Users', back_populates='my_bytestream_users_email')



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
