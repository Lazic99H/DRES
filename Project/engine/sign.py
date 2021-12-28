from flask import jsonify, Blueprint, request, json
from model.users import Users, UsersSchema
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

bp_sign = Blueprint('sign', __name__, url_prefix='/sign')

user_schema = UsersSchema
users_schema = UsersSchema(many=True)


@bp_sign.route('/in', methods=['POST'])
def sign_in():
    all_users = Users.query.all()

    mail = request.json['mail']
    password = request.json['password']

    the_user = users_schema.dump(
        filter(lambda t: (t.mail, t.password) == (mail, password), all_users)
    )
    if the_user:
        access_token = create_access_token(identity=mail)
        return jsonify(access_token=access_token,user=the_user)

    return jsonify(the_user)


@bp_sign.route('/up', methods=['GET'])
def sign_up():
    return {'signUp': "Signed UP"}