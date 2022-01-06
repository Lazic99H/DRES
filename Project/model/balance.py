from database.config import db
from marshmallow import Schema, fields
from model.users import Users, UsersSchema


class Balance(db.Model):
    balance_id = db.Column(db.Integer, primary_key=True)
    currency = db.Column(db.String(10))
    balance = db.Column(db.Float(), default=0.0)
    user_account_id = db.Column(db.Integer, db.ForeignKey(Users.account_id))

    def __init__(self, user_account_id, currency, balance):
        self.user_account_id = user_account_id
        self.currency = currency
        self.balance = balance


class BalanceSchema(Schema):
    balance_id = fields.Number()
    balance = fields.Number()
    currency = fields.Str()
    user_account_id = fields.Number()
