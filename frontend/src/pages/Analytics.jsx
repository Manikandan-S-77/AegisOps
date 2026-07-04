import IncidentPieChart from "../components/analytics/IncidentPieChart";
import SeverityBarChart from "../components/analytics/SeverityBarChart";
import IncidentTimeline from "../components/analytics/IncidentTimeline";
import GlassCard from "../components/ui/GlassCard";
import { LuChartColumn } from "react-icons/lu";

const KPIS = [
  { label: "Open Incidents", value: "17", trend: "+3 today" },
  { label: "Mean Time to Resolve", value: "42m", trend: "-8m vs last week" },
  { label: "Agent Resolutions", value: "68%", trend: "+5% vs last week" },
  { label: "Knowledge Confidence", value: "91%", trend: "steady" },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center gap-2.5">
        <LuChartColumn className="h-5 w-5 text-[#5b8dff]" />
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Analytics</h2>
          <p className="text-sm text-ink-dim">SOC-wide incident and agent performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi) => (
          <GlassCard key={kpi.label} className="p-4">
            <p className="text-[11px] font-mono uppercase tracking-wider text-ink-faint mb-1.5">{kpi.label}</p>
            <p className="font-display text-2xl font-semibold text-ink">{kpi.value}</p>
            <p className="text-xs text-[#34d399] mt-1">{kpi.trend}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <IncidentPieChart />
        <SeverityBarChart />
        <IncidentTimeline />
      </div>
    </div>
  );
}
