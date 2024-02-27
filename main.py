import json
import os
import sys

from flask import Flask, jsonify, make_response, render_template, request, url_for, redirect

import data

ALL_BUILDINGS = ["dorset_house", "fusion", "kimmeridge", "pgb"]


app = Flask(__name__,
            static_folder='static')


# app routes to different pages
@app.route('/')
def index():  # Main Page
    return render_template('index.html')


# |== FUSION DATA ==|

@app.route("/data/<building>")
def all_data(building):
    # Get All Data about Fusion Building
    return data.get_data(building)


@app.route("/budget/<building>")
def budget(building):
    # Get Budget Data about Fusion Building
    budget_data = data.budget(building)
    return {"budget": budget_data[0], "total": budget_data[1]}

@app.route("/budgets")
def all_budgets():
    result = {}
    for building in ALL_BUILDINGS:
        result[building] = data.budget(building)
    return result

@app.route("/projects")
def all_projects():
    with open("data/projects.json") as projects_file:
        return json.load(projects_file)



# Main Loop
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
