from flask import Flask
from engine.sign import bp_sign
from database.config import db,ma

app = Flask(__name__)
app.register_blueprint(bp_sign)


app.config["SQLALCHEMY_DATABASE_URL"] = "mysql+mysqlconnector://root:123@0.0.0.0/dresbase"
db.init_app(app)
ma.init_app(app)

@app.route('/api')
def main():
    return "REKLI SU MI STA O TEBI MISLE"

if __name__ == "__main__":
    app.run()