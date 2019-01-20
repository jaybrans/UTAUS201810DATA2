import datetime as dt
import numpy as np
import pandas as pd
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

engine = create_engine("sqlite:///Resources/hawaii.sqlite")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# Save references to each table
Measurement = Base.classes.measurement
Station = Base.classes.station

session = Session(engine)

app = Flask(__name__)

#################################################
# Flask Routes
#################################################


@app.route("/")
def welcome():
    """List available api routes"""
    return ("""
    Available Routes:<br/>
    <br/>
- Precipitations
    <br/>
    /api/v1.0/precipitation<br/>
      - Stations
    <br/>
    /api/v1.0/stations<br/>
   - Tobs
    <br/>
    /api/v1.0/tobs<br/>
       - From Start
     <br/>
    /api/v1.0/start<br/>
   - From Start To End
    /api/v1.0/start/<end><br/>
 
    
    """)


@app.route("/api/v1.0/precipitation")
def precipitation():
    measurements = session.query(
        Measurement.date, Measurement.prcp).order_by(Measurement.date).all()

    measurementTotals = []
    for measurement in measurements:
        row = {}
        row["date"] = measurement[0]
        row["prcp"] = measurement[1]
        measurementTotals.append(row)
    return jsonify(measurementTotals)


@app.route("/api/v1.0/stations")
def stations():
    stations = session.query(Station.name, Station.station)
    return jsonify(stations.all())


@app.route("/api/v1.0/tobs")
def tobs():
    prev_year = dt.date(2017, 8, 23) - dt.timedelta(days=365)
    measurements = session.query(
        Measurement.date, Measurement.tobs).filter(Measurement.date > prev_year).order_by(Measurement.date).all()

    measurementTotals = []
    for measurement in measurements:
        row = {}
        row["date"] = measurement[0]
        row["tobs"] = measurement[1]
        measurementTotals.append(row)
    return jsonify(measurementTotals)


@app.route("/api/v1.0/<start>")
def start(start):
    print(start)
    startDate = dt.datetime.strptime(start, '%Y-%m-%d')
    tripData = session.query(func.min(Measurement.tobs), func.avg(
        Measurement.tobs), func.max(Measurement.tobs)).filter(Measurement.date >= startDate).all()
    return jsonify(tripData)


@app.route("/api/v1.0/<start>/<end>")
def startEnd(start, end):
    print("hello")
    startDate = dt.datetime.strptime(start, '%Y-%m-%d')
    endDate = dt.datetime.strptime(end, '%Y-%m-%d')
    tripData = session.query(func.min(Measurement.tobs), func.avg(
        Measurement.tobs), func.max(Measurement.tobs)).filter(Measurement.date >= startDate).filter(Measurement.date <= endDate).all()
    return jsonify(tripData)


if __name__ == "__main__":
    app.run(debug=True)
