# Imports
import json
import os
import sys
import random
from flask import Flask, jsonify, make_response, render_template, request, url_for, redirect

# Import data handler
import data

# List all buildings
ALL_BUILDINGS = ["dorset_house", "fusion", "kimmeridge", "pgb"]


# Setup flask app
app = Flask(__name__,
            static_folder='static')


# Main Route - 
@app.route('/')
def index():  # Main Page
    return render_template('index.html')

@app.route('/dan')
def dan():
    return render_template("dan.html")

@app.route("/james")
def james():
    return render_template("james.html")

# WebGL

@app.route('/webgl')
def webgl():
    return render_template("webgl/index.html")

# ^^ MAIN ROUTE WEHRE BALLS AND BOXES ARE ^^


# vv API ROUTES TO GET DATA AND FUN STUFF vv

@app.route("/data/<building>")
def all_data(building):
    # Get All Data about a specific building
    return data.get_data(building)


@app.route("/budget/<building>")
def budget(building):
    # Get Budget Data about a specific building
    return data.budget(building)

@app.route("/budgets")
def all_budgets():
    # Get all budgets. 
    result = {}
    for building in ALL_BUILDINGS: # Go through each building and get its budget data
        result[building] = data.budget(building)
    return result

@app.route("/sustainability")
def all_sustainability():
    # Get all sustainability data
    sustain = {}
    for building in ["PG", "F", "K", "D"]: # Go through each building and get its sustainability data
        sustain[building] = data.sustainable()
    return sustain

@app.route("/projects")
def all_projects():
    # Get all projects - will end up as balls
    with open("data/projects.json") as projects_file:
        return json.load(projects_file) # Just reads the projects file, and returns it as a json object

# @app.route("/projects")
# def all_projects():
#     return data.projects()


# CUSTOM 404 PAGE
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404



# Main Loop
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
