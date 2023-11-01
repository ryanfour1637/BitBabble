from app.models import db, BytestreamUser, environment, SCHEMA
from sqlalchemy.sql import text

def seed_bytestream_users():
    tree = BytestreamUser (
        bytestream_id=1, bytespace_id=1, user_id=1
    )

    rock = BytestreamUser (
        bytestream_id=2, bytespace_id=2, user_id=2
    )

    stick = BytestreamUser (
        bytestream_id=3, bytespace_id=3, user_id=3
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
