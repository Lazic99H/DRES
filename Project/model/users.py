from database.config import db
from marshmallow import Schema, fields


class Users(db.Model):
    account_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    address = db.Column(db.String(100))
    city = db.Column(db.String(100))
    country = db.Column(db.String(100))
    phone = db.Column(db.String(30))
    mail = db.Column(db.String(100))
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


class UsersSchema(Schema):
    account_id = fields.Number()
    name = fields.Str()
    last_name = fields.Str()
    address = fields.Str()
    city = fields.Str()
    country = fields.Str()
    phone = fields.Str()
    mail = fields.Str()
    password = fields.Str()
    verification = fields.Boolean()

