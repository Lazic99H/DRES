from flask import jsonify, Blueprint, request, json
from model.users import Users, UsersSchema

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
    return jsonify(the_user)


@bp_sign.route('/up', methods=['GET'])
def sign_up():
    return {'signUp': "Signed UP"}