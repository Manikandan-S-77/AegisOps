from services.loader import load_json

def get_risks():

    return load_json("data/knowledge_risks.json")