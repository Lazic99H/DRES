from flask import Flask, request, json, jsonify
from engine.sign import bp_sign
from engine.profile import bp_profile
from database.config import db, ma
from database.config import CORS
from model.users import Users, UsersSchema
from flask_jwt_extended import JWTManager


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(bp_sign)
    app.register_blueprint(bp_profile)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/dresdatabase'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False;
    app.config['JWT_SECRET_KEY'] = "askdjl12k3jl1ejasldkj12lk31j3lkqdjalsk"

    jwt = JWTManager(app)
    db.init_app(app)
    ma.init_app(app)
    return app


app = create_app()

user_schema = UsersSchema
users_schema = UsersSchema(many=True)


@app.route('/', methods=['GET'])
def main():
    return {'name': "Hello World"}


@app.route('/add', methods=['GET'])
def add_user():
    all_users = Users.query.all()

    name = request.json['name']
    last_name = request.json['last_name']
    address = request.json['address']
    city = request.json['city']
    country = request.json['country']
    phone = request.json['phone']
    mail = request.json['mail']
    password = request.json['password']

    user_list = users_schema.dump(
        filter(lambda t: t.mail == mail, all_users)
    )
    if user_list:
        return {"Error": "Email is already registered!"}

    new_user = Users(name=name, last_name=last_name, address=address, city=city,
                     country=country, phone=phone, mail=mail, password=password)
    db.session.add(new_user)
    db.session.commit()
    return {"Registered": "You are now registered"}


if __name__ == "__main__":
    app.run(debug=True, port=5002)
