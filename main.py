import json
import os
import sys

from flask import Flask, jsonify, make_response, render_template, request, url_for, redirect

import data

app = Flask(__name__,
           static_folder='static')

#app routes to different pages
@app.route('/')
def index(): # Main Page
  return render_template('index.html')


# |== Config Routes ==|

# Get Prices
@app.route('/prices')
def get_prices():
    with open('data/prices.json') as f:
        return json.load(f)



# |== FUSION DATA ==| 

@app.route("/fusion")
def fusion_all_data():
    # Get All Data about Fusion Building
    return data.fusion_data()


@app.route("/fusion/budget")
def fusion_budget():
    # Get Budget Data about Fusion Building
    return {"budget": data.fusion_budget()}


# |== DORSET HOUSE DATA ==|

@app.route("/dorset_house")
def dorset_house_all_data():
    # Get all data about Dorset House
    return data.dorset_house_data()

@app.route("/kimmeridge")
def kimmeridge_all_data():
    # Get all data about Kimmeridge House
    return data.kimmeridge_data()

@app.route("/pgb")
def pgb_all_data():
    # Get all data about PGB
    return data.pgb_data()


# Main Loop
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)
