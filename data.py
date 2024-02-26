import pandas as pd
import numpy as np


# All Fusion Data
def get_data(building: str):
    try:
        # Get the building data
        with open(f"data/{building}.csv") as f:
            return [x.rstrip().split(",") for x in f.readlines()[1:]]
    except FileNotFoundError as e:
        return 404


def budget(building: str):
    try:
        with open(f"data/{building}.csv") as f:
            file_data = pd.read_csv(f)
            mean_vals = {"energy": np.mean(file_data["incoming_energy"]).round(2),
                         "gas": np.mean(file_data["incoming_gas"]).round(2),
                         "water": np.mean(file_data["incoming_water"]).round(2)}
            return mean_vals, sum(mean_vals.values())
    except FileNotFoundError as e:
        return 404
