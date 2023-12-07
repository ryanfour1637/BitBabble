from app.models import db, BytespaceMember, environment, SCHEMA
from sqlalchemy.sql import text

def seed_bytespace_members():
    farm = BytespaceMember (
        bytespace_id=1, user_id=1
    )

    field = BytespaceMember (
        bytespace_id=2, user_id=2
    )

    lawn = BytespaceMember (
        bytespace_id=3, user_id=3
    )

    db.session.add(farm)
    db.session.add(field)
    db.session.add(lawn)
    db.session.commit()

def undo_bytespace_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bytespace_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bytespace_members"))

    db.session.commit()
