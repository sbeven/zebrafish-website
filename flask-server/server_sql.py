from flask import Flask, Blueprint
from flask import request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
import numpy as np
import pandas as pd
import sys

db = SQLAlchemy()
# create the app
app = Flask(__name__)
backend = Blueprint('backend', __name__, url_prefix='/backend')

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://admin:faaZa=[h5rh&@72.167.69.4:3306/Genes"
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_recycle": 55}
# initialize the app with the extension
db.init_app(app)

# check if flask works
@backend.route("/", methods=['GET'])
def ret():
    return {"data": "wow"}
#API Route
@backend.route("/search", methods=['GET'])
def search():
    name = request.args.get('gene')
    dataset = request.args.get('dataset')
    result = db.session.execute(text("SELECT * FROM `" + dataset + "` where Gene = BINARY :name"), {"name": name})
    try: 
        return {"data": list(result.all()[0][1:])}
    except:
        return "Record not found", 400

@backend.route("/searchAvgExpr", methods=['GET'])
def searchAvgExpr():
    name = request.args.get('gene')
    dataset = request.args.get('dataset')
    dataset_avg_expr = dataset + "_avgexprcounts"
    result = db.session.execute(text("SELECT * FROM `" + dataset_avg_expr + "` where Gene = BINARY :name"), {"name": name})
    # convert the avg expr data type to float
    decimals = list(result.all()[0][1:])
    floats = [float(i) for i in decimals]
    try: 
        return {"data": floats}
    except:
        return "Record not found", 400

@backend.route("/searchWeighted", methods=['GET'])
def searchWeighted():
    dataset = request.args.get('dataset')
    tissue = request.args.get("tissue")
    weight = int(request.args.get("weight")) / 100
    number = int(request.args.get("number"))
    result = db.session.execute(text(f"SELECT Gene, `{tissue}`, `{tissue}_spec`, (`{tissue}` * :weight +  `{tissue}_spec` * (1 - :weight)) AS weighted FROM `{dataset}_join` ORDER BY weighted DESC LIMIT :number;"),
                    {"weight": weight, "number": number})
    ret = []
    for row in result.mappings():
        ret.append({"data": row["Gene"], "x": row[tissue], "y": row[tissue + "_spec"]})
    return ret
app.register_blueprint(backend)



if __name__ == "__main__":
    app.run(debug = True)