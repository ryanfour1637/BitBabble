from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    bytestream_id = db.Column(db.Integer, db.ForeignKey('bytestreams.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user_message = db.relationship('User', back_populates='message_user')
    bytestream_message = db.relationship('Bytestream', back_populates='message_bytestream')

    def to_dict(self):
        return {
            'id': self.id,
            'bytestreamId': self.bytestream_id,
            'userId': self.user_id,
            'message': self.message,
            'timestamp': self.timestamp.isoformat()
        }
