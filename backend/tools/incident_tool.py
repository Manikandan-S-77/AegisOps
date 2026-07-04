from services.retrieve import retrieve_context

def incident_lookup(query: str):
    return retrieve_context(query)