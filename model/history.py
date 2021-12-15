from config import db
from datetime import datetime
from marshmallow import Shema,fields

class Balance(db.Model):

    accountId = db.Column(db.Integer, foreign_key=True)
    date = db.Column(db.DateTime,default=datetime.utcnow,onupdata=datetime.utcnow)
    transaction = db.Column(db.String(50))
    type = db.Column(db.String(50))



    def __init__(self,accountId ,date, transaction,type):
        self.accountId=accountId
        self.date=date
        self.transaction=transaction
        self.type = type


class UserShema(Shema):
    accountId=fields.Number()
    date=fields.Date()
    transaction=fields.Str()
    type = fields.Str()


