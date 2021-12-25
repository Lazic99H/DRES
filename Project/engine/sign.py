from flask import jsonify, Blueprint, request, json

bp_sign = Blueprint('sign', __name__, url_prefix='/sign')


@bp_sign.route('/in', methods=['GET'])
def sign_in():
    return {'signIn': "Signed IN"}


@bp_sign.route('/up', methods=['GET'])
def sign_up():
    return {'signUp': "Signed UP"}