from database.config import db
from marshmallow import Schema, fields


class Balance(db.Model):
    __tablename__ = 'balance'
    account_id = db.Column(db.Integer, foreign_key=True)
    currency = db.Column(db.String(10))
    balance = db.Column(db.Double(), default=0.0)

    def __init__(self, account_id, currency, balance):
        self.account_id = account_id
        self.currency = currency
        self.balance = balance


class UserSchema(Schema):
    account_id = fields.Number()
    balance = fields.Number()
    currency = fields.Str()
