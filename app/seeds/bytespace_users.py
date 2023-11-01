from app.models import db, BytespaceUser, environment, SCHEMA
from sqlalchemy.sql import text

def seed_bytespace_users():
    farm = BytespaceUser (
        bytespace_id=1, user_id=1
    )

    field = BytespaceUser (
        bytespace_id=2, user_id=2
    )

    lawn = BytespaceUser (
        bytespace_id=3, user_id=3
    )

    db.session.add(farm)
    db.session.add(field)
    db.session.add(lawn)
    db.session.commit()

def undo_bytespace_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bytespace_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bytespace_users"))

    db.session.commit()
