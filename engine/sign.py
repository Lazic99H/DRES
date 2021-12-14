from flask import jsonify,Blueprint

bp_sign = Blueprint('sign',__name__,url_prefix='/sign')

@bp_sign.route('/in')
def sign_in():
    return "SIGN IN"

@bp_sign.route('/up')
def sign_up():
    return "SIGN UP"