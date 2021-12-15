from config import db
from marshmallow import Shema,fields

class User(db.Model):
    __tablename__== 'user'
    accountId=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(50))
    lastName = db.Column(db.String(50))
    address = db.Column(db.String(100))
    city = db.Column(db.String(50))
    country = db.Column(db.String(50))
    phone = db.Column(db.String(30))
    mail = db.Column(db.String(50))
    password = db.Column(db.String(100))
    balance = db.Column(db.Double(100))
    verification = db.Column(db.Bool)
    currency = db.Column(db.String(10))


    def __init__(self,name ,lastName ):
        self.name=name
        self.lastName=lastName


class UserShema(Shema):
    accountId=fields.Number()
    name=fields.Str()
    lastName=fields.Str()
    address=fields.Str()
    city=fields.Str()
    country=fields.Str()
    phone=fields.Str()
    mail=fields.Str()
    password=fields.Str()
    balance=fields.Number()
    verification=fields.Bool()
    currency=fields.Str()


