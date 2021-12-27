from flask import Flask, request, json, jsonify
from engine.sign import bp_sign
from database.config import db, ma
from flask_cors import CORS
from model.users import Users, UsersSchema


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(bp_sign)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/dresdatabase'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False;

    db.init_app(app)
    ma.init_app(app)
    return app


app = create_app()

user_schema = UsersSchema
users_schema = UsersSchema(many=True)


@app.route('/', methods=['GET'])
def main():
    return {'name': "Hello World"}


@app.route('/add', methods=['POST'])
def add_user():
    first_user = Users.query.get(1)

    name = request.json['name']
    last_name = request.json['last_name']
    address = request.json['address']
    city = request.json['city']
    country = request.json['country']
    phone = request.json['phone']
    mail = request.json['mail']
    password = request.json['password']

    new_user = Users(name=name, last_name=last_name, address=address, city=city, country=country, phone=phone, mail=mail, password=password)
    db.session.add(new_user)
    db.session.commit()
    account_id = new_user.account_id
    all_users = Users.query.all()
    users = db.session.query(account_id)
    user_list = users_schema.dump(
        filter(lambda t: t.account_id == 1, all_users)
    )
    return jsonify(user_list)


if __name__ == "__main__":
    app.run(debug=True, port=5002)
