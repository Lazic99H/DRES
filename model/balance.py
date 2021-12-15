from config import db
from marshmallow import Shema,fields

class Balance(db.Model):

    accountId=db.Column(db.Integer, foreign_key=True)
    currency = db.Column(db.String(10))
    balance = db.Column(db.Double(100))



    def __init__(self,accountId ,currency, balance):
        self.accountId=accountId
        self.currency=currency
        self.balance=balance


class UserShema(Shema):
    accountId=fields.Number()
    balance=fields.Number()
    currency=fields.Str()


