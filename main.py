from flask import Flask

app = Flask(__name__)


@app.route('/')
def main():
    return "REKLI SU MI STA O TEBI MISLE"

if __name__ == "__main__":
    app.run()