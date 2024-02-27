import pandas as pd
import numpy as np
import json

def get_prices():
    with open('data/prices.json') as f:
        return json.load(f)

# All Fusion Data
def get_data(building: str):
    try:
        # Get the building data
        with open(f"data/{building}.csv") as f:
            return [x.rstrip().split(",") for x in f.readlines()[1:]]
    except FileNotFoundError as e:
        return 404


def budget(building: str):
    all_prices = get_prices()
    try:
        with open(f"data/{building}.csv") as f:
            file_data = pd.read_csv(f)
            
            mean_vals = {"energy": (np.mean(file_data["incoming_energy"])*all_prices["elec"])/100,
                         "gas": (np.mean(file_data["incoming_gas"])*all_prices["gas"])/100,
                         "water": (np.mean(file_data["incoming_water"])*all_prices["water"])/100}
            return mean_vals, sum(mean_vals.values())
    except FileNotFoundError as e:
        return 404
