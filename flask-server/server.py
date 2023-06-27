from flask import Flask
from flask import request
from flask import jsonify
import numpy as np
import pandas as pd
import time

app = Flask(__name__)

# set up data
df = pd.read_csv("../Retina.gene.expr.renamed.csv")
df = df.set_index("Unnamed: 0")
df_spec = pd.read_csv("../spec.csv")
df_spec = df_spec.set_index("Unnamed: 0")
df_land = pd.read_csv("../Landscape.gene.expr.csv")
df_land = df_land.set_index("gene")

#API Route
@app.route("/search", methods=['GET'])
def search():
    row = request.args.get('gene')
    dataset = request.args.get('dataset')
    if dataset == "Zebrafish Retina":
        if row in df.index:
            return {"data": df.loc[row].tolist()}
        else:
            return "Record not found", 400
    else:
        if row in df_land.index:
            return {"data": df_land.loc[row].tolist()[:-2]}
        else:
            return "Record not found", 400

@app.route("/searchWeighted", methods=['GET'])
def searchWeighted():
    tissue = request.args.get("tissue")
    weight = int(request.args.get("weight"))
    number = int(request.args.get("number"))
    
    percent =  weight / 100
    cov = df[tissue]
    spec = df_spec[tissue + "_spec"]
    cov_weighted = df[tissue] * percent
    spec_weighted = df_spec[tissue + "_spec"] * (1 - percent)

    sum = cov_weighted + spec_weighted

    sum = sum.sort_values(ascending=False)

    list = []
    for gene in sum.iloc[:number].index:
        list.append({"data": gene, "x": cov[gene], "y": spec[gene]})
    return list
if __name__ == "__main__":
    app.run(debug = True)