from flask import jsonify, Blueprint, request, json
from model.users import Users, UsersSchema
from model.balance import Balance, BalanceSchema
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from database.config import db


bp_sign = Blueprint('sign', __name__, url_prefix='/sign')

user_schema = UsersSchema
users_schema = UsersSchema(many=True)
balance_schema = BalanceSchema
balances_schema = BalanceSchema(many=True)


@bp_sign.route('/in', methods=['POST'])
def sign_in():
    all_users = Users.query.all()
    all_balances = Balance.query.all()
    print(all_balances)
    mail = request.json['mail']
    password = request.json['password']

    the_user = users_schema.dump(
        filter(lambda t: (t.mail, t.password) == (mail, password), all_users)
    )

    if the_user:
        access_token = create_access_token(identity=mail)
        print(the_user[0]['account_id'])
        user_balance = balances_schema.dump(
            filter(lambda t: t.user_account_id == the_user[0]['account_id'], all_balances)
        )
        return jsonify(access_token=access_token, user=the_user, user_balance=user_balance)

    return jsonify(the_user)


@bp_sign.route('/up', methods=['POST'])
def sign_up():
    all_users = Users.query.all()

    name = request.json['name']
    last_name = request.json['last_name']
    address = request.json['address']
    city = request.json['city']
    country = request.json['country']
    phone = request.json['phone']
    mail = request.json['mail']
    password = request.json['password']

    user_list = users_schema.dump(
        filter(lambda t: t.mail == mail, all_users)
    )
    if user_list:
        return {"Error": "Email is already registered!"}

    new_user = Users(name=name, last_name=last_name, address=address, city=city,
                     country=country, phone=phone, mail=mail, password=password)
    db.session.add(new_user)
    db.session.commit()

    user_balance = Balance(user_account_id=new_user.account_id, currency="RSD", balance=0)
    db.session.add(user_balance)
    db.session.commit()
    return {"Registered": "You are now registered"}