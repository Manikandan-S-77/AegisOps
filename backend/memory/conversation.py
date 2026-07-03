conversation_memory = {}


def save_context(session_id, key, value):
    if session_id not in conversation_memory:
        conversation_memory[session_id] = {}

    conversation_memory[session_id][key] = value


def get_context(session_id, key):
    if session_id in conversation_memory:
        return conversation_memory[session_id].get(key)

    return None


def clear_context(session_id):
    if session_id in conversation_memory:
        del conversation_memory[session_id]