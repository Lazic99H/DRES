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
import time
from database.config import db

stripe.api_key = "sk_test_51KCTtTEVTmWxmcOS0wB3u8YGu3ZNmDR1pjCdur8wymqDzIXXMcyvVrQfeo23SWNhd23rJrE7ZL2pVXzkGtY4reby0001A4d8zs"
bp_bank = Blueprint('bank', __name__, url_prefix='/bank')

user_schema = UsersSchema
users_schema = UsersSchema(many=True)
balance_schema = BalanceSchema
balances_schema = BalanceSchema(many=True)
history_schema = HistorySchema
histories_schema = HistorySchema(many=True)


@bp_bank.route('/verify', methods=['POST'])
def verify_profile():
    email = request.json['mail']
    if not email:
        return "You need to send an email", 400

    intent = stripe.PaymentIntent.create(
        amount=100,
        currency='usd',
        receipt_email=email
    )

    return {"client_secret": intent['client_secret']}, 200


@bp_bank.route('/update', methods=['POST'])
def update_database():
    event = request.get_json()

    if event['type'] == 'payment_intent.succeeded':
        mail = event["data"]["object"]["receipt_email"]
        amount = event["data"]["object"]["amount"]/100
        currency = event["data"]["object"]["currency"]
        transaction_type = event["data"]["object"]["statement_descriptor"]
        description = event["data"]["object"]["description"]

        all_users = Users.query.all()
        the_user = users_schema.dump(
            filter(lambda t: t.mail == mail, all_users)
        )

        user_id = -1;

        if the_user:
            user_id = the_user[0]["account_id"]

        if transaction_type == 'DEPOSIT':
            all_balances = Balance.query.all()

            user_balance = balances_schema.dump(
                filter(lambda t: (t.user_account_id, t.currency) == (float(user_id),"RSD"), all_balances)
            )
            the_user_balance = Balance.query.get(user_balance[0]["balance_id"])
            the_user_balance.balance += amount
            db.session.commit()

            history = History(the_user_account_id=user_id,
                              transaction=Transaction.SUCCESSFUL,
                              transaction_type=TransactionType.DEPOSIT,
                              amount=amount)
            db.session.add(history)
            db.session.commit()

        elif transaction_type == 'WITHDRAW':
            the_transaction = History.query.get(float(description))
            the_transaction.transaction = Transaction.SUCCESSFUL
            db.session.commit()

            withdraw_user = Users.query.get(the_transaction.the_user_account_id)

            all_balances = Balance.query.all()
            the_wanted_balance_id = balances_schema.dump(
             filter(lambda t: (t.user_account_id, t.currency) == (float(withdraw_user.account_id), 'RSD'), all_balances)
            )

            user_balance = Balance.query.get(the_wanted_balance_id[0]["balance_id"])
            user_balance.balance -= float(amount)
            db.session.commit()

            if mail:
                user_balance = balances_schema.dump(
                    filter(lambda t: (t.user_account_id, t.currency) == (float(user_id), 'RSD'), all_balances)
                )
                the_user_balance = Balance.query.get(user_balance[0]["balance_id"])
                the_user_balance.balance += amount
                db.session.commit()
                user_that_gets_the_money = History(the_user_account_id=user_id,
                                                   transaction=Transaction.SUCCESSFUL,
                                                   transaction_type=TransactionType.DEPOSIT,
                                                   amount=amount)

                db.session.add(user_that_gets_the_money)
                db.session.commit()

        else:
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
    lower = currency.lower()
    converted_amount = (int(amount) * 100)
    print(lower)
    print(converted_amount)

    if not email:
        return "You need to send an email", 400

    #NAPISANO JE DA U DINARIMA SE VRSE UPLATE
    intent = stripe.PaymentIntent.create(
        amount=converted_amount,
        currency='rsd',
        receipt_email=email,
        statement_descriptor='DEPOSIT'
    )

    return {"client_secret": intent['client_secret']}, 200


@bp_bank.route('/update/balance/<id>/', methods=['POST'])
def update_balance(id):

    all_balances = Balance.query.all()
    balance = balances_schema.dump(
                filter(lambda t: t.balance_id == float(id), all_balances)
            )
    return jsonify(user_balance=balance), 200


@bp_bank.route('/update/balances/<id>/', methods=['POST'])
def update_balances(id):
    all_balances = Balance.query.all()

    other_balances = balances_schema.dump(
        filter(lambda t: (t.user_account_id == float(id)) & (t.currency != 'RSD'), all_balances)
    )
    print(other_balances)
    return jsonify(other_balances=other_balances)


@bp_bank.route('/transfer', methods=['POST'])
def transfer_money():
    email = request.json['mail']
    amount = request.json['amount']
    currency = request.json['currency']
    balance_id = request.json['balance_id']

    lower = currency.lower()
    converted_amount = (int(amount) * 100)

    balances = Balance.query.all()
    user_balance = balances_schema.dump(
        filter(lambda t: t.balance_id == float(balance_id), balances)
    )

    history = History(the_user_account_id=user_balance[0]["user_account_id"],
                      transaction=Transaction.PENDING,
                      transaction_type=TransactionType.WITHDRAWAL,
                      amount=amount)
    db.session.add(history)
    db.session.commit()

    #OVDJE TREBA SPAVANJE
    print("NA SPAVANJE")
    print("NA BUDJENJE")
    if user_balance[0]["balance"] < float(amount):
        the_transaction = History.query.get(history.history_id)
        the_transaction.transaction = Transaction.DENIED
        db.session.commit()
        return "Not enough money to preform this transaction", 401

    if not email:
        intent = stripe.PaymentIntent.create(
            amount=int(converted_amount),
            currency=lower,
            statement_descriptor='WITHDRAW',
            description=history.history_id
        )
        return {"client_secret": intent['client_secret']}, 200

    all_users = Users.query.all()
    the_user = users_schema.dump(
        filter(lambda t: t.mail == email, all_users)
    )
    if the_user:
        intent = stripe.PaymentIntent.create(
            amount=converted_amount,
            currency=lower,
            receipt_email=email,
            statement_descriptor='WITHDRAW',
            description=history.history_id
        )

    else:
        the_transaction = History.query.get(history.history_id)
        the_transaction.transaction = Transaction.DENIED
        db.session.commit()
        return "Email dose not exist", 400

    return {"client_secret": intent['client_secret']}, 200


@bp_bank.route('/update/converter/<id>/', methods=['PUT'])
def update_balance_converter(id):

    wanted_amount = request.json['wanted_amount']
    wanted_currency = request.json['currency']
    required_rsd_money = request.json['required_money']

    user_rsd_balance = Balance.query.get(id)
    user_account_id = user_rsd_balance.user_account_id

    balances = Balance.query.all()

    old_balance = balances_schema.dump(
        filter(lambda t: (t.user_account_id, t.currency) == (user_account_id, wanted_currency), balances)
    )

    user_rsd_balance.balance -= required_rsd_money
    db.session.commit()

    new_old_balance_id = -1

    if old_balance:
        the_old_balance = Balance.query.get(old_balance[0]["balance_id"])
        the_old_balance.balance += wanted_amount
        new_old_balance_id = the_old_balance.balance_id
        db.session.commit()

    else:
        new_balance = Balance(user_account_id=user_account_id,
                              currency=wanted_currency,
                              balance=wanted_amount)
        db.session.add(new_balance)
        db.session.commit()
        new_old_balance_id = new_balance.balance_id

    send_user_balance = balances_schema.dump(
        filter(lambda t: (t.user_account_id, t.currency) == (float(id), 'RSD'), balances)
    )

    return jsonify(user_balance=send_user_balance)

