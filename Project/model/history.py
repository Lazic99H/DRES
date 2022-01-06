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

    def __init__(self, account_id, date, transaction, transaction_type):
        self.account_id = account_id
        self.date = date
        self.transaction = transaction
        self.transaction_type = transaction_type


class HistorySchema(Schema):
    accountId = fields.Number()
    date = fields.Date()
    transaction = EnumField(Transaction)
    transaction_type = EnumField(TransactionType)


