from flask import jsonify, Blueprint, request, json
from model.history import History, HistorySchema
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from database.config import db


bp_table = Blueprint('table', __name__, url_prefix='/table')

history_schema = HistorySchema(many=True)


@bp_table.route('/update/<id>/', methods=['POST'])
def update_table(id):
    print(id)
    all_transactions = History.query.all()
    user_transactions = history_schema.dump(
        filter(lambda t: t.the_user_account_id == float(id), all_transactions)
    )

    return jsonify(user_transactions=user_transactions)

