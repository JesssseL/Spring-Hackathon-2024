import json
import os
import sys

from flask import Flask, jsonify, make_response, render_template, request, url_for, redirect

import data

app = Flask(__name__,
            static_folder='static')


# app routes to different pages
@app.route('/')
def index():  # Main Page
    return render_template('index.html')


# |== Config Routes ==|

# Get Prices



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

@app.route("/projects")
def all_projects():
    with open("data/projects.json") as projects_file:
        return json.load(projects_file)


# Main Loop
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
