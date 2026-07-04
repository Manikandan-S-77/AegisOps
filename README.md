# 🛡️ AegisOps

## AI-Powered Incident Resolution & Operational Risk Intelligence Platform

AegisOps is an AI-powered enterprise incident response platform that transforms traditional incident investigation into an intelligent operational workspace. Instead of forcing engineers to manually search through incidents, tickets, runbooks, and documentation, AegisOps retrieves relevant enterprise knowledge using Retrieval-Augmented Generation (RAG) and assists engineers with context-aware incident analysis.

---

## 🚀 Problem Statement

During production incidents, enterprise engineers spend valuable time switching between multiple systems:

- Incident Management Platforms
- Ticketing Systems
- Runbooks
- Internal Documentation
- Meeting Notes
- Operational Dashboards

This constant context switching increases the **Mean Time To Resolution (MTTR)** and delays incident recovery.

Most existing AI assistants only generate text responses and fail to provide an intelligent operational workspace.

---

## 💡 Our Solution

AegisOps combines **Artificial Intelligence**, **Retrieval-Augmented Generation (RAG)**, and an **Agent-based Architecture** to provide engineers with a single intelligent platform capable of:

- Investigating production incidents
- Retrieving related tickets
- Finding operational runbooks
- Understanding historical incidents
- Providing actionable recommendations
- Maintaining conversational context across sessions

Unlike conventional chatbots, AegisOps is designed to evolve into an **Agentic UI**, where the AI dynamically controls which interface components should appear based on the operational context.

---

# ✨ Features

- 🤖 AI Incident Investigation
- 📚 Retrieval-Augmented Generation (RAG)
- 🧠 Enterprise Knowledge Search using ChromaDB
- 💬 Gemini 2.5 Flash Integration
- 🗂️ Related Ticket Retrieval
- 📖 Intelligent Runbook Retrieval
- 🧾 Incident Context Memory
- 🎯 Supervisor Agent Architecture
- 📊 Interactive Analytics Dashboard
- ⚡ FastAPI REST Backend
- ⚛️ React + Vite Frontend
- 🎨 Responsive Modern UI

---

# 🏗️ System Architecture

```text
                  User

                    │

                    ▼

           React Dashboard (Frontend)

                    │

              REST API (FastAPI)

                    │

             Supervisor Agent

                    │

         Incident Response Agent

                    │

     Retrieval-Augmented Generation

                    │

             ChromaDB Vector Store

                    │

      Enterprise Knowledge Base

      ├── Incidents
      ├── Tickets
      ├── Runbooks
      ├── Risks
      └── Meeting Notes

                    │

              Gemini 2.5 Flash

                    │

        AI-Powered Operational Response
```

---

# 🛠️ Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router

## Backend

- FastAPI
- Python

## AI Stack

- Google Gemini 2.5 Flash
- Retrieval-Augmented Generation (RAG)
- ChromaDB
- Sentence Embeddings
- Session Memory
- Supervisor Agent

## Database

- JSON Knowledge Base
- Chroma Vector Database

---

# 📂 Project Structure

```text
AegisOps/
│
├── backend/
│   ├── agents/
│   ├── api/
│   ├── data/
│   ├── memory/
│   ├── models/
│   ├── services/
│   ├── requirements.txt
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/AegisOps.git

cd AegisOps
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend will run at:

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# 📖 Example Usage

Example prompt:

```
Investigate INC-101
```

The AI will:

- Retrieve the incident
- Retrieve related tickets
- Retrieve operational runbooks
- Analyze enterprise knowledge
- Generate an intelligent response

---

# 🧠 AI Workflow

```text
User Question

        │

        ▼

Supervisor Agent

        │

        ▼

Conversation Memory

        │

        ▼

Semantic Retrieval (RAG)

        │

        ▼

ChromaDB

        │

        ▼

Gemini 2.5 Flash

        │

        ▼

AI Response

        │

        ▼

Dynamic Operational Workspace
```

---

# 🎯 Current Capabilities

✅ Incident Investigation

✅ Enterprise Knowledge Retrieval

✅ Ticket Correlation

✅ Runbook Recommendation

✅ Context-Aware Conversation Memory

✅ AI Incident Analysis

✅ Analytics Dashboard

---

# 🚀 Future Roadmap

- Dynamic AI-Controlled Workspace (Agentic UI)
- Multi-Agent Collaboration
- Live Monitoring Integration
- SIEM Integration
- Automatic Ticket Creation
- Predictive Operational Risk Analysis
- Incident Timeline Generation
- Enterprise Authentication
- Real-time Event Streaming

---

# 📸 Screenshots

> Add application screenshots here.

Example:

```
docs/dashboard.png

docs/chat.png

docs/analytics.png
```

---

# 👥 Team

Hackathon Project

Developed for building an AI-powered operational intelligence platform.

---

# 📄 License

This project is intended for educational and hackathon purposes.

---

# 🌟 Vision

**AegisOps aims to transform enterprise incident response from a traditional chatbot experience into an intelligent operational workspace where AI not only answers questions but actively orchestrates the information engineers need to resolve incidents faster.**
