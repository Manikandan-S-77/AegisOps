/**
 * parseAIResponse
 * ----------------
 * AegisOps is an AI-driven operational workspace, not a chatbot: the AI
 * decides WHICH components appear on screen for a given request, not just
 * what text to say. This function is the bridge between the backend's
 * response and that rendering system.
 *
 * FUTURE CONTRACT (once the backend/Supervisor Agent is upgraded):
 *   {
 *     "response": "<assistant text>",
 *     "ui": ["IncidentSummaryCard", "SeverityCard", "RecommendationCard"],
 *     "data": { "incidentId": "INC-101", "severity": "critical", ... }
 *   }
 *   - `ui` is an ORDERED LIST of component keys the AI decided to show.
 *   - `data` is the shared payload passed to every one of those components.
 *   This function short-circuits at the top and returns that shape almost
 *   untouched — the component registry and DynamicRenderer already know
 *   how to consume it. No card, page, or renderer needs to change.
 *
 * TODAY (backend only returns plain text):
 *   The text is scanned for labeled sections ("Severity: Critical",
 *   "Root Cause: ...", "Recovery Steps: ...") and turned into the same
 *   normalized data object. A `ui` plan is then derived from WHICH fields
 *   were actually present in the response — not a fixed list of six cards.
 *   This means the interface already behaves in an AI-driven way today:
 *   if the agent's reply only talks about recovery steps and a
 *   recommendation, only those two cards render; if it also names a
 *   severity and a root cause, the Severity card joins them. As soon as
 *   the backend starts returning `ui` explicitly, the AI's own decision
 *   takes over completely and this heuristic is bypassed.
 */

const FIELD_PATTERNS = [
  { key: "incidentId", labels: ["incident id", "incident", "id"] },
  { key: "title", labels: ["title", "summary", "incident summary"] },
  { key: "severity", labels: ["severity"] },
  { key: "status", labels: ["status"] },
  { key: "owner", labels: ["owner", "assigned to", "assignee"] },
  { key: "system", labels: ["system", "affected system", "service"] },
  { key: "rootCause", labels: ["root cause", "cause"] },
  { key: "recoverySteps", labels: ["recovery steps", "remediation steps", "resolution steps", "next steps"] },
  { key: "relatedTicket", labels: ["related ticket", "ticket"] },
  { key: "relatedRunbook", labels: ["related runbook", "runbook"] },
  { key: "resolvedBy", labels: ["resolved by"] },
  { key: "recommendation", labels: ["recommendation", "recommendations", "advice"] },
];

function normalizeSeverity(value = "") {
  const v = value.toLowerCase();
  if (v.includes("crit")) return "critical";
  if (v.includes("high")) return "high";
  if (v.includes("warn") || v.includes("medium") || v.includes("med")) return "warning";
  if (v.includes("low") || v.includes("info")) return "low";
  return "unknown";
}

function extractListItems(block = "") {
  return block
    .split(/\r?\n/)
    .map((line) => line.replace(/^[\s\-\*\d\.\)]+/, "").trim())
    .filter(Boolean);
}

/**
 * Splits raw text into labeled sections based on "Label: value" or
 * "**Label:** value" markdown-style headers, tolerant of AI formatting
 * variance.
 */
function extractSections(text) {
  const sections = {};
  const lines = text.split(/\r?\n/);

  let currentKey = null;
  let buffer = [];

  const flush = () => {
    if (currentKey) {
      sections[currentKey] = (sections[currentKey] || "") + buffer.join("\n");
    }
    buffer = [];
  };

  lines.forEach((line) => {
    const cleaned = line.replace(/\*\*/g, "").trim();
    const match = cleaned.match(/^([A-Za-z][A-Za-z\s]{2,30}):\s*(.*)$/);

    if (match) {
      const label = match[1].trim().toLowerCase();
      const found = FIELD_PATTERNS.find((f) => f.labels.includes(label));
      if (found) {
        flush();
        currentKey = found.key;
        buffer = match[2] ? [match[2]] : [];
        return;
      }
    }
    if (currentKey) buffer.push(line);
  });
  flush();

  return sections;
}

/**
 * Derives an ordered component plan from whichever fields are actually
 * present. This is what makes the interface "AI-driven" today, before the
 * backend sends an explicit `ui` array: the set of cards shown is a
 * function of what the agent actually talked about, not a fixed layout.
 */
function buildUIPlan(incident) {
  const plan = [];

  if (incident.title || incident.incidentId || incident.status || incident.owner || incident.system) {
    plan.push("IncidentSummaryCard");
  }
  if (incident.severity || incident.rootCause) {
    plan.push("SeverityCard");
  }
  if (incident.recoverySteps && incident.recoverySteps.length > 0) {
    plan.push("RecoveryStepsCard");
  }
  if (incident.relatedRunbook) {
    plan.push("RunbookCard");
  }
  if (incident.relatedTicket || incident.resolvedBy) {
    plan.push("TicketCard");
  }
  if (incident.recommendation) {
    plan.push("RecommendationCard");
  }

  return plan;
}

export function parseAIResponse(raw) {
  // Future contract: the backend/AI explicitly names which components to
  // render and supplies the shared data for them. Use it as-is.
  if (raw && typeof raw === "object" && Array.isArray(raw.ui)) {
    return {
      ...(raw.data || raw.structured || {}),
      rawText: raw.response || "",
      hasStructuredData: true,
      ui: raw.ui,
    };
  }

  const text = typeof raw === "string" ? raw : raw?.response || "";
  const sections = extractSections(text);
  const hasStructuredData = Object.keys(sections).length > 0;

  const incident = {
    incidentId: sections.incidentId?.trim() || null,
    title: sections.title?.trim() || null,
    severity: sections.severity ? normalizeSeverity(sections.severity) : null,
    severityLabel: sections.severity?.trim() || null,
    status: sections.status?.trim() || null,
    owner: sections.owner?.trim() || null,
    system: sections.system?.trim() || null,
    rootCause: sections.rootCause?.trim() || null,
    recoverySteps: sections.recoverySteps ? extractListItems(sections.recoverySteps) : [],
    relatedTicket: sections.relatedTicket?.trim() || null,
    relatedRunbook: sections.relatedRunbook?.trim() || null,
    resolvedBy: sections.resolvedBy?.trim() || null,
    recommendation: sections.recommendation?.trim() || null,
  };

  return {
    ...incident,
    rawText: text,
    hasStructuredData,
    ui: buildUIPlan(incident),
  };
}

export function markdownToHtml(text = "") {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Lists
  html = html.replace(/(^|\n)([\-\*] .+(\n[\-\*] .+)*)/g, (block) => {
    const items = block
      .trim()
      .split(/\n/)
      .map((l) => `<li>${l.replace(/^[\-\*]\s*/, "")}</li>`)
      .join("");
    return `\n<ul>${items}</ul>`;
  });

  html = html
    .split(/\n{2,}/)
    .map((para) =>
      para.startsWith("<h") || para.startsWith("<ul")
        ? para
        : `<p>${para.replace(/\n/g, "<br/>")}</p>`
    )
    .join("");

  return html;
}
