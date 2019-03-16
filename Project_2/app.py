import sys
from flask import Flask, render_template, jsonify, redirect
import pymongo
from bson.json_util import dumps
from flask import request
app = Flask(__name__)

client = pymongo.MongoClient("localhost", 27017)
db = client.blackFriday
collection = db.blackFridayPurchases


@app.route('/blackfridaypurchases/')
def home():
    limit = request.args.get('limit', default=100, type=int)
    black_friday_purchases = list(collection.find().limit(limit))
    return dumps(black_friday_purchases)


if __name__ == "__main__":
    app.run(debug=True)
