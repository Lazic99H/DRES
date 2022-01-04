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


if __name__ == "__main__":
    app.run(debug=True, port=5002)
