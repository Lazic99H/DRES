from flask import jsonify, Blueprint, request, json
from model.users import Users, UsersSchema
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import stripe
from database.config import db

stripe.api_key = "sk_test_51KCTtTEVTmWxmcOS0wB3u8YGu3ZNmDR1pjCdur8wymqDzIXXMcyvVrQfeo23SWNhd23rJrE7ZL2pVXzkGtY4reby0001A4d8zs"
bp_bank = Blueprint('bank', __name__, url_prefix='/bank')

user_schema = UsersSchema
users_schema = UsersSchema(many=True)


@bp_bank.route('/bank/verify', methods=['POST'])
def verify_profile():
    email = request.json['mail']

    if not email:
        return "You need to send an email", 400

    intent = stripe.PaymentIntent.create(
        amount=103.01,
        currency='rsd',
        receipt_email=email
    )

    old_user = Users.query.get(id)
    all_users = Users.query.all()
    mail = request.json['mail']

    print(old_user)

    user_has_same_email = users_schema.dump(
        filter(lambda t: (t.account_id != float(id) and t.mail == mail), all_users)
    )
    print(user_has_same_email)
    if user_has_same_email:
        return {"Error": "Email is already registered!"}

    old_user.name = request.json['name']
    old_user.last_name = request.json['last_name']
    old_user.address = request.json['address']
    old_user.city = request.json['city']
    old_user.country = request.json['country']
    old_user.phone = request.json['phone']
    old_user.mail = request.json['mail']
    old_user.password = request.json['password']

    send_user = users_schema.dump(
        filter(lambda t: t.account_id == float(id), all_users)
    )

    db.session.commit()
    return jsonify(user=send_user)

