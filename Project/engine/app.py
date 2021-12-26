from flask import Flask, request, json, jsonify
from sign import bp_sign
from database.config import db, ma
from model.user import User, UserSchema

app = Flask(__name__)
app.register_blueprint(bp_sign)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/dresdatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False;

db.init_app(app)
ma.init_app(app)

user_schema = UserSchema()


@app.route('/', methods=['GET'])
def main():
    return {'name': "Hello World"}


@app.route('/add', methods=['POST'])
def add_user():
    name = request.json['name']
    last_name = request.json['last_name']
    address = request.json['address']
    city = request.json['city']
    country = request.json['country']
    phone = request.json['phone']
    mail = request.json['mail']
    password = request.json['password']

    new_user = User(name=name, last_name=last_name, address=address, city=city, country=country, phone=phone, mail=mail, password=password)
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user)


if __name__ == "__main__":
    app.run(debug=True, port=5002)
