export const promptSuggestions = [
  "Investigate INC-101",
  "What is the root cause of the latest outage?",
  "Show me open critical incidents",
  "Summarize today's SOC activity",
];

export const incidentDistribution = [
  { name: "Network", value: 34, color: "#5b8dff" },
  { name: "Application", value: 27, color: "#a78bfa" },
  { name: "Identity", value: 18, color: "#34d399" },
  { name: "Infrastructure", value: 14, color: "#fbbf24" },
  { name: "Endpoint", value: 7, color: "#f5455c" },
];

export const severityCounts = [
  { name: "Critical", count: 6, color: "#f5455c" },
  { name: "High", count: 14, color: "#fb923c" },
  { name: "Warning", count: 23, color: "#fbbf24" },
  { name: "Low", count: 31, color: "#34d399" },
];

export const recentIncidents = [
  { id: "INC-101", title: "Auth service latency spike", severity: "critical", time: "09:42", system: "IAM Gateway" },
  { id: "INC-100", title: "Elevated 5xx on payments-api", severity: "high", time: "08:15", system: "Payments" },
  { id: "INC-099", title: "Suspicious login pattern detected", severity: "warning", time: "Yesterday", system: "Identity" },
  { id: "INC-098", title: "Disk utilization threshold breach", severity: "warning", time: "Yesterday", system: "DB Cluster 3" },
  { id: "INC-097", title: "Cert rotation completed", severity: "low", time: "2 days ago", system: "Edge Proxy" },
];

export const sidebarNav = [
  { key: "dashboard", label: "Dashboard", path: "/" },
  { key: "assistant", label: "AI Assistant", path: "/assistant" },
  { key: "incidents", label: "Incidents", path: "/incidents" },
  { key: "runbooks", label: "Runbooks", path: "/runbooks" },
  { key: "tickets", label: "Tickets", path: "/tickets" },
  { key: "knowledge", label: "Knowledge Risks", path: "/knowledge-risks" },
  { key: "analytics", label: "Analytics", path: "/analytics" },
  { key: "settings", label: "Settings", path: "/settings" },
];
