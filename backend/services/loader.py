import json


def load_json(filename):
    with open(filename, "r", encoding="utf-8") as f:
        return json.load(f)


def build_all_documents():

    documents = []
    ids = []

    # ------------------------
    # Incidents
    # ------------------------
    incidents = load_json("data/incidents.json")

    for incident in incidents:

        text = f"""
[INCIDENT]

Incident ID: {incident['id']}
Title: {incident['title']}
Severity: {incident['severity']}
System: {incident['system']}
Issue: {incident['issue']}
Root Cause: {incident['root_cause']}
Recovery Steps: {', '.join(incident['recovery_steps'])}
Resolved By: {incident['resolved_by']}
Date: {incident['date']}
"""

        ids.append(incident["id"])
        documents.append(text)

    # ------------------------
    # Runbooks
    # ------------------------
    runbooks = load_json("data/runbooks.json")

    for runbook in runbooks:

        text = f"""
[RUNBOOK]

Runbook ID: {runbook['id']}
System: {runbook['system']}
Title: {runbook['title']}
Steps:
{', '.join(runbook['steps'])}

Last Updated:
{runbook['last_updated']}
"""

        ids.append(runbook["id"])
        documents.append(text)

    # ------------------------
    # Tickets
    # ------------------------
    tickets = load_json("data/tickets.json")

    for ticket in tickets:

        text = f"""
[TICKET]

Ticket ID: {ticket['ticket_id']}
Incident: {ticket['incident']}
Assigned To: {ticket['assigned_to']}
Status: {ticket['status']}
Description: {ticket['description']}
"""

        ids.append(ticket["ticket_id"])
        documents.append(text)

    # ------------------------
    # Meetings
    # ------------------------
    meetings = load_json("data/meetings.json")

    for meeting in meetings:

        text = f"""
[MEETING]

Meeting ID: {meeting['meeting_id']}
Topic: {meeting['topic']}
Summary: {meeting['summary']}
"""

        ids.append(meeting["meeting_id"])
        documents.append(text)

    # ------------------------
    # Knowledge Risks
    # ------------------------
    risks = load_json("data/knowledge_risks.json")

    for risk in risks:

        text = f"""
[KNOWLEDGE RISK]

Engineer: {risk['engineer']}
Specialization: {risk['specialization']}
Critical Incidents: {risk['critical_incidents_resolved']}
Backup Engineer: {risk['backup_engineer']}
Risk: {risk['risk']}
"""

        ids.append("RISK-" + risk["engineer"])
        documents.append(text)

    return ids, documents