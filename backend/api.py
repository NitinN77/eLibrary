from flask import request, url_for, jsonify
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS, cross_origin


app = FlaskAPI(__name__)
cors = CORS(app)

notes = {
    0: {'text': 'hello', 'length': 5},
}

@app.route("/", methods=['GET'])
def fetch():
    args = request.args
    if args:
        print (args)
        no1 = args['key1']
        no2 = args['key2']
        res = len(no1) + len(no2)
        return jsonify(dict(data=[no1, no2, res]))
    else:
        return notes
        

if __name__ == "__main__":
    app.run(debug=True)