from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Wena los cabros'

app.run()