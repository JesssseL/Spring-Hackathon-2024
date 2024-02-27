import pandas as pd
import numpy as np
import json
import random

# Get the prices of each utility
def get_prices():
    with open('data/prices.json') as f:
        return json.load(f)

# Get all data about a given building
def get_data(building: str):
    try:
        # Get the building data
        with open(f"data/{building}.csv") as f:
            # vv Does funky csv stripping & splitting vv
            return [x.rstrip().split(",") for x in f.readlines()[1:]]
    except FileNotFoundError as e:
        # Basically if the file doesnt exist, throw hands
        return 404


# Get the budget data for a given building
def budget(building: str):
    all_prices = get_prices() # Gets the prices
    try:
        with open(f"data/{building}.csv") as f:
            file_data = pd.read_csv(f) # Get data into a pandas dataframe (boujee stuff here)
            mean_vals = {} 
            # If the building data has a specific column, get the mean of that column
            if "incoming_energy" in file_data.columns:
                mean_vals["energy"] = round((np.mean(file_data["incoming_energy"])*all_prices["elec"])/100, 2)
            if "incoming_gas" in file_data.columns:
                mean_vals["gas"] = round((np.mean(file_data["incoming_gas"])*all_prices["gas"])/100, 2)
            if "incoming_water" in file_data.columns:
                mean_vals ["water"] = round((np.mean(file_data["incoming_water"])*all_prices["water"])/100, 2)

            return {"vals": mean_vals, "total": round(sum(mean_vals.values()), 2)}
    except FileNotFoundError as e:
        # Basically if the file doesnt exist, throw hands
        return 404


# Get the sustainability data for a given building
def sustainable(building: str):
    return random.randint(0,100) # TODO: make not random values
    # try: 
    #     with open(f"data/{building}.csv") as f:
    #         file_data = pd.read_csv(f)
    #         return round(np.mean(file_data["sustainability"]), 2)