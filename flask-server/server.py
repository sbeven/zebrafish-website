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
df_land = pd.read_csv("../Landscape.gene.expr.truncated.csv")
df_land = df_land.set_index("gene")
df_land_spec = pd.read_csv("../Landscape_spec.csv")
df_land_spec = df_land_spec.set_index("gene")
df_land_72hr = pd.read_csv("../Landscape72hr.truncated.csv")
df_land_72hr = df_land_72hr.set_index("Unnamed: 0")
df_land_72hr_spec = pd.read_csv("../Landscape72hr_spec.csv")
df_land_72hr_spec = df_land_72hr_spec.set_index("Unnamed: 0")


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
    elif dataset == "Zebrafish Landscape":
        if row in df_land.index:
            return {"data": df_land.loc[row].tolist()}
        else:
            return "Record not found", 400
    elif dataset == "Zebrafish Landscape Day 3":
        if row in df_land_72hr.index:
            return {"data": df_land_72hr.loc[row].tolist()}
        else:
            return "Record not found", 400

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
    percent =  weight / 100
    cov = base_data[tissue]
    spec = spec_data[tissue + "_spec"]
    cov_weighted = base_data[tissue] * percent
    spec_weighted = spec_data[tissue + "_spec"] * (1 - percent)

    sum = cov_weighted + spec_weighted

    sum = sum.sort_values(ascending=False)
    list = []
    for gene in sum.iloc[:number].index:
        print(gene)
        print(cov[gene])
        print(spec[gene])
        print(len(list))
        list.append({"data": gene, "x": cov[gene], "y": spec[gene]})
    return list
    

if __name__ == "__main__":
    app.run(debug = True)