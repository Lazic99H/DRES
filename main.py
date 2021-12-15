from flask import Flask
from engine.sign import bp_sign
from database.config import db,ma

app = Flask(__name__)
app.register_blueprint(bp_sign)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:123@0.0.0.0/dresdata'
db.init_app(app)
ma.init_app(app)

@app.route('/')
def main():

    return "<h1>Main funk</h1>"

if __name__ == "__main__":
    app.run(port=5002)