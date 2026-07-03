import re

from services.loader import load_json


def retrieve_context(question: str):

    context = []

    incidents = load_json("data/incidents.json")
    tickets = load_json("data/tickets.json")
    runbooks = load_json("data/runbooks.json")

    # -----------------------
    # Find Incident ID
    # -----------------------

    match = re.search(r"INC-\d+", question.upper())

    if not match:
        return ""

    incident_id = match.group()

    # -----------------------
    # Incident
    # -----------------------

    incident_system = None

    for incident in incidents:

        if incident["id"] == incident_id:

            incident_system = incident["system"]

            context.append(f"""
[INCIDENT]

Incident ID: {incident['id']}
Title: {incident['title']}
Severity: {incident['severity']}
System: {incident['system']}
Issue: {incident['issue']}
Root Cause: {incident['root_cause']}
Recovery Steps:
{", ".join(incident['recovery_steps'])}

Resolved By:
{incident['resolved_by']}

Date:
{incident['date']}
""")

            break

    # -----------------------
    # Related Tickets
    # -----------------------

    for ticket in tickets:

        if ticket["incident"] == incident_id:

            context.append(f"""
[TICKET]

Ticket ID:
{ticket['ticket_id']}

Assigned To:
{ticket['assigned_to']}

Status:
{ticket['status']}

Description:
{ticket['description']}
""")

    # -----------------------
    # Related Runbook
    # -----------------------

    if incident_system:

       incident_system_lower = incident_system.lower()

       for runbook in runbooks:

        runbook_system = runbook["system"].lower()

        if (
            runbook_system in incident_system_lower
            or incident_system_lower in runbook_system
        ):

            context.append(f"""
[RUNBOOK]

Runbook ID:
{runbook['id']}

Title:
{runbook['title']}

System:
{runbook['system']}

Steps:

{", ".join(runbook['steps'])}

Last Updated:
{runbook['last_updated']}
""")

    return "\n\n".join(context)