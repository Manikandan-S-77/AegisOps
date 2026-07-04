import { LuFileText, LuUser, LuServer, LuActivity } from "react-icons/lu";
import GlassCard from "../ui/GlassCard";
import Badge from "../ui/Badge";

export default function IncidentSummaryCard({ incident }) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <LuFileText className="h-4 w-4 text-[#5b8dff]" />
          <p className="text-xs font-mono uppercase tracking-wider text-ink-dim">Incident Summary</p>
        </div>
        {incident.incidentId && (
          <span className="font-mono text-xs text-[#5b8dff] bg-[#5b8dff]/10 border border-[#5b8dff]/25 rounded px-2 py-0.5">
            {incident.incidentId}
          </span>
        )}
      </div>

      <p className="text-sm text-ink font-medium leading-snug mb-3">
        {incident.title || "Incident details extracted from supervisor response."}
      </p>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2 text-ink-dim">
          <LuActivity className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{incident.status || "Unknown status"}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-dim">
          <LuUser className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{incident.owner || "Unassigned"}</span>
        </div>
        <div className="col-span-2 flex items-center gap-2 text-ink-dim">
          <LuServer className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{incident.system || "System not specified"}</span>
        </div>
      </div>

      {incident.status && (
        <div className="mt-3 pt-3 border-t border-white/8">
          <Badge variant="info">{incident.status}</Badge>
        </div>
      )}
    </GlassCard>
  );
}
