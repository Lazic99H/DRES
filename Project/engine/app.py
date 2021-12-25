from flask import Flask, request, json
from sign import bp_sign
from database.config import db, ma

app = Flask(__name__)
app.register_blueprint(bp_sign)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/dresdatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False;
db.init_app(app)
ma.init_app(app)


@app.route('/', methods=['GET'])
def main():
    return {'name': "Hello World"}


if __name__ == "__main__":
    app.run(debug=True,port=5002)