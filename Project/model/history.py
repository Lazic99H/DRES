from database.config import db
from datetime import datetime
from marshmallow import Schema, fields
from model.transaction import Transaction
from model.transaction_type import TransactionType
from model.users import Users, UsersSchema
from marshmallow_enum import EnumField


class History(db.Model):
    history_id = db.Column(db.Integer, primary_key=True)
    the_user_account_id = db.Column(db.Integer, db.ForeignKey(Users.account_id))
    date = db.Column(db.DateTime, default=datetime.utcnow)
    transaction = db.Column(db.Enum(Transaction), default=Transaction.PENDING)
    transaction_type = db.Column(db.Enum(TransactionType))
    amount = db.Column(db.Float())

    def __init__(self, the_user_account_id, transaction, transaction_type, amount):
        self.the_user_account_id = the_user_account_id
        self.transaction = transaction
        self.transaction_type = transaction_type
        self.amount = amount


class HistorySchema(Schema):
    the_user_account_id = fields.Number()
    transaction = EnumField(Transaction)
    transaction_type = EnumField(TransactionType)
    amount = fields.Number()

