from flask import Flask, request, json
""" from engine.sign import bp_sign"""
from database.config import db,ma

app = Flask(__name__)
"""app.register_blueprint(bp_sign)"""

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:123@0.0.0.0/dresdata'
db.init_app(app)
ma.init_app(app)

@app.route('/api', methods=['GET'])
def main():
    return { 'name': "Hello World"}



@app.route('/signin', methods=['POST'])
def signin():
    request_data = json.loads(request.data)
    return {"201:" "Uspjesno posalto"}







if __name__ == "__main__":
    app.run(port=5002)