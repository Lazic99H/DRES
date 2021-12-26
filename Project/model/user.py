from database.config import db
from marshmallow import Schema,fields


class User(db.Model):
    __tablename__ = 'user'
    account_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    address = db.Column(db.String(100))
    city = db.Column(db.String(50))
    country = db.Column(db.String(50))
    phone = db.Column(db.String(30))
    mail = db.Column(db.String(50))
    password = db.Column(db.String(100))
    verification = db.Column(db.Boolean, default=False)

    def __init__(self, name, last_name, address, city, country, phone, mail, password):
        self.name = name
        self.last_name = last_name
        self.address = address
        self.city = city
        self.country = country
        self.phone = phone
        self.mail = mail
        self.password = password


class UserSchema(Schema):
    account_id = fields.Number()
    name = fields.Str()
    last_name = fields.Str()
    address = fields.Str()
    city = fields.Str()
    country = fields.Str()
    phone = fields.Str()
    mail = fields.Str()
    password = fields.Str()
    balance = fields.Number()
    verification = fields.Boolean()
    currency = fields.Str()
