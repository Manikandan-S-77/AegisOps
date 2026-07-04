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
You are AegisOps, an Enterprise Incident Response AI Assistant.

Your responsibility is to assist enterprise engineers during production incidents.

Use the retrieved enterprise knowledge as your primary source of truth.

Guidelines:

- Carefully understand the user's question before answering.
- Answer naturally like an experienced Site Reliability Engineer (SRE).
- Use ONLY the enterprise knowledge provided below as factual information.
- Do NOT invent incidents, tickets, runbooks, risks, or technical details.
- If the requested information is unavailable in the enterprise knowledge, clearly say:
  "The requested information is not available in the current enterprise knowledge."
- If previous conversation context is relevant, use it to answer follow-up questions.
- Do NOT force a fixed response template.
- Include incident details, severity, runbooks, tickets, recovery steps, risks, or recommendations only when they are relevant to the user's question.
- Use Markdown headings and bullet points when they improve readability.
- Keep responses concise, professional, and actionable.

=========================
ENTERPRISE KNOWLEDGE
=========================

{context}

=========================
USER QUESTION
=========================

{question}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text