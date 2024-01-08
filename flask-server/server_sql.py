from flask import Flask
from flask import request
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
import numpy as np
import pandas as pd
import time

db = SQLAlchemy()
# create the app
app = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
# initialize the app with the extension
db.init_app(app)

#API Route
@app.route("/search", methods=['GET'])
def search():
    name = request.args.get('gene')
    dataset = request.args.get('dataset')
    result = db.session.execute(text("SELECT * FROM " + dataset + " where Gene = :name"), {"name": name})
    print(print(list(result.all()[0][1:])))

@app.route("/searchWeighted", methods=['GET'])
def searchWeighted():
    dataset = request.args.get('dataset')
    tissue = request.args.get("tissue")
    weight = int(request.args.get("weight"))
    number = int(request.args.get("number"))
    # set which datasets to get data from
    if dataset == "Zebrafish Retina":
        base_data = df
        spec_data = df_spec
    elif dataset == "Zebrafish Landscape":
        base_data = df_land
        spec_data = df_land_spec
    elif dataset == "Zebrafish Landscape Day 3":
        base_data = df_land_72hr
        spec_data = df_land_72hr_spec
    elif dataset == "Larval RGC":
        base_data = df_larval_RGC
        spec_data = df_larval_RGC_spec
    percent =  weight / 100
    cov = base_data[tissue]
    spec = spec_data[tissue + "_spec"]
    cov_weighted = base_data[tissue] * percent
    spec_weighted = spec_data[tissue + "_spec"] * (1 - percent)

    sum = cov_weighted + spec_weighted

    sum = sum.sort_values(ascending=False)
    list = []
    for gene in sum.iloc[:number].index:
        list.append({"data": gene, "x": cov[gene], "y": spec[gene]})
    return list
    

if __name__ == "__main__":
    app.run(debug = True)