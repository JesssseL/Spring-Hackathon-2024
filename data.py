
# All Fusion Data
def fusion_data():
    with open("data/fusion.csv") as f:
        return [x.strip().split(",") for x in f.readlines()[1:]]

def fusion_budget():
    return 1000


# All Dorset House Data
def dorset_house_data():
    with open("data/dorset_house.csv") as f:
        return [x.strip().split(",") for x in f.readlines()[1:]]

# All Kimmeridge House Data
def kimmeridge_data():
    with open("data/kimmeridge.csv") as f:
        return [x.strip().split(",") for x in f.readlines()[1:]]

# All PGB Data
def pgb_data():
    with open("data/pgb.csv") as f:
        return [x.strip().split(",") for x in f.readlines()[1:]]