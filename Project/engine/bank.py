from flask import jsonify, Blueprint, request, json
from model.users import Users, UsersSchema
from model.balance import Balance, BalanceSchema
from model.history import History, HistorySchema
from model.transaction import Transaction
from model.transaction_type import TransactionType
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import stripe
from database.config import db

stripe.api_key = "sk_test_51KCTtTEVTmWxmcOS0wB3u8YGu3ZNmDR1pjCdur8wymqDzIXXMcyvVrQfeo23SWNhd23rJrE7ZL2pVXzkGtY4reby0001A4d8zs"
bp_bank = Blueprint('bank', __name__, url_prefix='/bank')

user_schema = UsersSchema
users_schema = UsersSchema(many=True)
balance_schema = BalanceSchema
balances_schema = BalanceSchema(many=True)
history_schema = HistorySchema
historys_schema = HistorySchema(many=True)


@bp_bank.route('/verify', methods=['POST'])
def verify_profile():
    email = request.json['mail']
    if not email:
        return "You need to send an email", 400

    intent = stripe.PaymentIntent.create(
        amount=10300,
        currency='rsd',
        receipt_email=email
    )

    return {"client_secret": intent['client_secret']}, 200


@bp_bank.route('/update', methods=['POST'])
def webhook():
    event = request.get_json()

    if event['type'] == 'payment_intent.succeeded':
        mail = event["data"]["object"]["receipt_email"]
        amount = event["data"]["object"]["amount"]/100
        currency = event["data"]["object"]["currency"]
        transaction_type = event["data"]["object"]["calculated_statement_descriptor"]

        if transaction_type == 'DEPOSIT':
            print('DEPOSIT')
        elif transaction_type == 'WITHDRAW':
            print('WITHDRAW')
        else:
            all_users = Users.query.all()
            the_user = users_schema.dump(
                filter(lambda t: t.mail == mail, all_users)
            )
            user_id = the_user[0]["account_id"]
            current_user = Users.query.get(user_id)
            current_user.verification = True
            history = History(the_user_account_id=user_id,
                              transaction=Transaction.SUCCESSFUL,
                              transaction_type=TransactionType.DEPOSIT,
                              amount=amount)
            db.session.add(history)
            db.session.commit()
            history = History(the_user_account_id=user_id,
                              transaction=Transaction.SUCCESSFUL,
                              transaction_type=TransactionType.WITHDRAWAL,
                              amount=amount)
            db.session.add(history)
            db.session.commit()

    else:
        return 'Unexpected event type', 400

    return '', 200


@bp_bank.route('/deposit', methods=['POST'])
def deposit_money():
    email = request.json['mail']
    amount = request.json['amount']
    currency = request.json['currency']

    converted_amount = int(amount)

    if not email:
        return "You need to send an email", 400

    intent = stripe.PaymentIntent.create(
        amount=(converted_amount*100),
        currency=currency.lower(),
        receipt_email=email,
        statement_descriptor='deposit'
    )

    return {"client_secret": intent['client_secret']}, 200
