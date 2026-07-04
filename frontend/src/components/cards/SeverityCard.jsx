import { LuTriangleAlert } from "react-icons/lu";
import GlassCard from "../ui/GlassCard";
import Badge from "../ui/Badge";

const SEVERITY_METER = { critical: 100, high: 75, warning: 50, low: 25, unknown: 10 };

export default function SeverityCard({ incident }) {
  const severity = incident.severity || "unknown";
  const meter = SEVERITY_METER[severity] ?? 10;

  return (
    <GlassCard
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <LuTriangleAlert className="h-4 w-4 text-[#f5455c]" />
        <p className="text-xs font-mono uppercase tracking-wider text-ink-dim">Severity Assessment</p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <Badge variant={severity === "unknown" ? "neutral" : severity} className="text-sm px-3 py-1.5">
          {incident.severityLabel || severity}
        </Badge>
      </div>

      <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${meter}%`,
            background:
              severity === "critical"
                ? "#f5455c"
                : severity === "high"
                ? "#fb923c"
                : severity === "warning"
                ? "#fbbf24"
                : "#34d399",
          }}
        />
      </div>

      {incident.rootCause && (
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-ink-faint mb-1">Root Cause</p>
          <p className="text-sm text-ink-dim leading-relaxed">{incident.rootCause}</p>
        </div>
      )}
    </GlassCard>
  );
}
