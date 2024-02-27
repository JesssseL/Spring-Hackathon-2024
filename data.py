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
            mean_vals = {}
            if "incoming_energy" in file_data.columns:
                mean_vals["energy"] = round((np.mean(file_data["incoming_energy"])*all_prices["elec"])/100, 2)
            if "incoming_gas" in file_data.columns:
                mean_vals["gas"] = round((np.mean(file_data["incoming_gas"])*all_prices["gas"])/100, 2)
            if "incoming_water" in file_data.columns:
                mean_vals ["water"] = round((np.mean(file_data["incoming_water"])*all_prices["water"])/100, 2)

            return {"vals": mean_vals, "total": round(sum(mean_vals.values()), 2)}
    except FileNotFoundError as e:
        return 404
