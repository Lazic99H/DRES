from flask import jsonify, Blueprint, request, json

bp_sign = Blueprint('sign', __name__, url_prefix='/sign')

@bp_sign.route('init', methods=['POST'])
def sign_in():
    request_data = json.loads(request.data)
    return {"201:" "Uspjesno posalto"}

@bp_sign.route('upit')
def sign_up():
    return "SIGN UP"