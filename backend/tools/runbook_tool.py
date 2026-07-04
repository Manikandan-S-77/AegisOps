from services.loader import load_json

def get_runbooks():

    return load_json("data/runbooks.json")