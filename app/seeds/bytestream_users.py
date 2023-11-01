from app.models import db, BytestreamUser, environment, SCHEMA
from sqlalchemy.sql import text

def seed_bytestream_users():
    tree = BytestreamUser (
        bytestream_id=1, bytespace_id=1, user_id=1, user_username='Demo', user_first_name='Demo', user_last_name='User', user_email='demo@aa.io'
    )

    rock = BytestreamUser (
        bytestream_id=2, bytespace_id=2, user_id=2, user_username='marnie', user_first_name='Marnie', user_last_name='Flock', user_email='marnie@aa.io'
    )

    stick = BytestreamUser (
        bytestream_id=3, bytespace_id=3, user_id=3, user_username='bobbie', user_first_name='Bobbie', user_last_name='Knight', user_email='bobbie@aa.io'
    )

    db.session.add(tree)
    db.session.add(rock)
    db.session.add(stick)
    db.session.commit()

def undo_bytestream_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bytestream_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bytestream_users"))

    db.session.commit()
