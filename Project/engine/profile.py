from flask import jsonify, Blueprint, request, json
from model.users import Users, UsersSchema
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from database.config import db


bp_profile = Blueprint('profile', __name__, url_prefix='/profile')

user_schema = UsersSchema
users_schema = UsersSchema(many=True)


@bp_profile.route('/update/<id>/', methods=['PUT'])
def update_profile(id):

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

