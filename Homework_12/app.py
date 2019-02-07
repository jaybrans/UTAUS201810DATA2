import sys
from flask import Flask, render_template, jsonify, redirect
import pymongo
import scrape_mars

app = Flask(__name__)

client = pymongo.MongoClient("localhost", 27017)
db = client.mars_db
collection = db.mars_data


@app.route('/scrape')
def scrape():
    mars = scrape_mars.scrape()
    db.mars_data.insert_one(mars)
    return "We scraped some data"


@app.route('/')
def home():
    mars = list(db.mars_data.find())
    return render_template("index.html", mars=mars)


if __name__ == "__main__":
    app.run(debug=True)
