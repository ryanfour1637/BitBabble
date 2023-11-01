from app.models import db, Bytestream, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_bytestreams():
    one = Bytestream(
        name='Stream 1', owner_id=1, bytespace_id=1, date_created=date.today()
    )
    two = Bytestream(
        name='Stream 2', owner_id=2, bytespace_id=2, date_created=date.today()
    )
    three = Bytestream(
        name='Stream 3', owner_id=3, bytespace_id=3, date_created=date.today()
    )

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.commit()

def undo_bytestreams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bytestreams RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bytestreams"))

    db.session.commit()
