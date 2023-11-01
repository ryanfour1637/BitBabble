from app.models import db, BytespaceUser, environment, SCHEMA
from sqlalchemy.sql import text

def seed_bytespace_users():
    farm = BytespaceUser (
        bytespace_id=1, user_id=1, user_username='Demo', user_first_name='Demo', user_last_name='User', user_email='demo@aa.io'
    )

    field = BytespaceUser (
        bytespace_id=2, user_id=2, user_username='marnie', user_first_name='Marnie', user_last_name='Flock', user_email='marnie@aa.io'
    )

    lawn = BytespaceUser (
        bytespace_id=3, user_id=3, user_username='bobbie', user_first_name='Bobbie', user_last_name='Knight', user_email='bobbie@aa.io'
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
