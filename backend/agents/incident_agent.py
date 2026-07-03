from google import genai

from config import GEMINI_API_KEY
from services.retrieve import retrieve_context
from memory.conversation import save_context, get_context

client = genai.Client(api_key=GEMINI_API_KEY)


def ask_agent(session_id: str, question: str):

    # ----------------------------
    # Conversation Memory
    # ----------------------------

    previous_incident = get_context(session_id, "incident")

    words = question.upper().split()

    for word in words:

        if word.startswith("INC-"):

            save_context(session_id, "incident", word)

            previous_incident = word

            break

    if previous_incident and "INC-" not in question.upper():

        question = f"{question} regarding {previous_incident}"

    # ----------------------------
    # Hybrid Retrieval
    # ----------------------------

    context = retrieve_context(question)

    print("\n========== CONTEXT ==========\n")
    print(context)
    print("\n=============================\n")

    # ----------------------------
    # Prompt
    # ----------------------------

    prompt = f"""
You are AegisOps Enterprise Incident Response AI.

Answer ONLY using the enterprise knowledge below.

If information is unavailable, say:

Information not available.

Never invent information.

=========================
ENTERPRISE KNOWLEDGE
=========================

{context}

=========================
QUESTION
=========================

{question}

Return exactly this format:

# Incident Summary

# Severity

# Root Cause

# Recovery Steps

# Related Ticket

# Related Runbook

# Resolved By

# Final Recommendation
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text