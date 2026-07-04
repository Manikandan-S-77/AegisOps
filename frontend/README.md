# AegisOps — Enterprise Incident Response AI (Frontend)

A production-quality SOC dashboard frontend for the AegisOps supervisor-agent
backend (FastAPI + Gemini + ChromaDB hybrid RAG). Built with React, Vite,
Tailwind CSS v4, and Framer Motion.

## Stack

- React 19 + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion (animation)
- Axios (API client)
- React Icons (`lucide` set via `react-icons/lu`)
- Recharts (analytics)
- React Router v7

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your FastAPI backend
npm run dev
```

The app expects the backend to expose:

```
GET  /            -> health check
POST /chat        -> { session_id, message } -> { response }
```

## Project structure

```
src/
  api/                 Axios client + chat service
  context/             IncidentContext — shared chat + parsed-incident state
  components/
    layout/             Sidebar, Topbar, Layout shell
    chat/               ChatWindow, ChatBubble, ChatInput, TypingIndicator, PromptSuggestions
    cards/              The 6 structured incident cards + skeleton loader
    analytics/          Pie chart, bar chart, incident timeline
    ui/                 GlassCard, Badge, Button, StatusDot
  pages/                Dashboard, AIAssistant, Incidents, Runbooks, Tickets,
                        KnowledgeRisks, Analytics, Settings
  utils/
    parseAIResponse.js  Parses plain-text AI replies into structured card data
    mockData.js         Placeholder analytics/nav data until backend endpoints exist
```

## How structured cards work today (and later)

The backend currently returns `{ response: "<plain text>" }`. `src/utils/parseAIResponse.js`
scans that text for labeled sections (`Severity: Critical`, `Root Cause: ...`,
`Recovery Steps: ...`, etc.) and turns them into a normalized object that every
card component consumes.

When the backend is upgraded to return structured JSON directly — e.g.
`{ response: "...", structured: { severity, rootCause, recoverySteps, ... } }` —
only `parseAIResponse.js` needs to change: it already short-circuits and returns
`raw.structured` untouched if present. No card or page component needs to be
touched.

## Notes

- The backend is not modified by this project — it is a pure frontend.
- Analytics charts currently render with representative mock data
  (`src/utils/mockData.js`) since no analytics endpoints were specified;
  swap in real API calls in `src/api/` when those endpoints exist.
