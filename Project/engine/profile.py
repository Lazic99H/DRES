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
    op=Users.query.get(id)
    print(op)
    all_users = Users.query.all()
    print(all_users)
    mail = request.json['mail']

    old_user = users_schema.dump(
        filter(lambda t: round(t.account_id) == id, all_users)
    )
    print(old_user)

    all_other_users = users_schema.dump(
        filter(lambda t: t.account_id != id, all_users)
    )

    user_has_same_email = users_schema.dump(
        filter(lambda t: t.mail == mail, all_other_users)
    )

    if(user_has_same_email):
        return {"Error": "Email is already registered!"}

    old_user.name = request.json['name']
    old_user.last_name = request.json['last_name']
    old_user.address = request.json['address']
    old_user.city = request.json['city']
    old_user.country = request.json['country']
    old_user.phone = request.json['phone']
    old_user.password = request.json['password']

    db.session.commit()
    return {"Successful": "You updated your profile successfully"}