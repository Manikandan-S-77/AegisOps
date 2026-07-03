from agents.incident_agent import ask_agent as incident_agent


def supervisor(session_id: str, question: str):

    question_lower = question.lower()

    if (
        "incident" in question_lower
        or "inc-" in question_lower
        or "investigate" in question_lower
    ):

        return incident_agent(session_id, question)

    if "runbook" in question_lower:

        return incident_agent(session_id, question)

    if "ticket" in question_lower:

        return incident_agent(session_id, question)

    if "risk" in question_lower:

        return incident_agent(session_id, question)

    return incident_agent(session_id, question)