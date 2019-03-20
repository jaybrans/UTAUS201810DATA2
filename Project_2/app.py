import sys
from flask import Flask, render_template, jsonify, redirect
import pymongo
from bson.json_util import dumps
from flask import request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
client = pymongo.MongoClient("localhost", 27017)
db = client.blackFriday
collection = db.blackFridayPurchases


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
        {"$group": {"_id": {choice:"$"+choice+"","Product_Category_1":"$Product_Category_1" }, "count": {"$sum": 1}}}
    ]))

    return dumps(black_friday_purchases)


if __name__ == "__main__":
    app.run(debug=True)
