from app.models import db, Bytespace, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_bytespaces():
    first = Bytespace(
        name='Group 1', owner_id=1, date_created=date.today()
    )
    second = Bytespace(
        name='Group 2', owner_id=2, date_created=date.today()
    )
    third = Bytespace(
        name='Group 3', owner_id=3, date_created=date.today()
    )

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.commit()

def undo_bytespaces():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bytespaces RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bytespaces"))

    db.session.commit()
