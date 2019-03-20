import sys
from flask import Flask, render_template, jsonify, redirect
import pymongo
from bson.json_util import dumps
from flask import request
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
client = pymongo.MongoClient("ds117806.mlab.com", 17806)
db = client.heroku_35zktvbd
db.authenticate("admin", "olafhunterdb979")
collection = db.blackFridayPurchases


@app.route('/')
@cross_origin()
def home():
    return render_template('index.html')


@app.route('/nav')
@cross_origin()
def nav():
    return render_template('nav.html')


@app.route('/csvtohtml')
@cross_origin()
def csvtohtml():
    return render_template('csvtohtml.html')


@app.route('/scattercharts')
@cross_origin()
def scattercharts():
    return render_template('scattercharts.html')


@app.route('/barcharts')
@cross_origin()
def barcharts():
    return render_template('barcharts.html')


@app.route('/blackfridaypurchases/groupby')
@cross_origin()
def age():
    #   results = collection.aggregate([
    #     {"$group": {"_id": {"age", "$Age"}, "count": {"$sum": 1}}}
    # ])
    choice = request.args.get('choice', default="Age")

    black_friday_purchases = list(collection.aggregate([
        {"$group": {"_id": "$"+choice+"", "count": {"$sum": 1}}}
    ]))

    return dumps(black_friday_purchases)


@app.route('/blackfridaypurchases/')
@cross_origin()
def firstAmount():
    #   results = collection.aggregate([
    #     {"$group": {"_id": {"age", "$Age"}, "count": {"$sum": 1}}}
    # ])
    amount = request.args.get('amount', default=1000)

    black_friday_purchases = list(collection.find().limit(amount))

    return dumps(black_friday_purchases)


@app.route('/blackfridaypurchases/groupby/productcategory1')
@cross_origin()
def occupation():
    #   results = collection.aggregate([
    #     {"$group": {"_id": {"age", "$Age"}, "count": {"$sum": 1}}}
    # ])
    choice = request.args.get('choice', default="Age")

    black_friday_purchases = list(collection.aggregate([
        {"$group": {"_id": {choice: "$"+choice+"",
                            "Product_Category_1": "$Product_Category_1"}, "count": {"$sum": 1}}}
    ]))

    return dumps(black_friday_purchases)


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
