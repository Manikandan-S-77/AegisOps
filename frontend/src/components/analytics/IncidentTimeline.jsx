import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import Badge from "../ui/Badge";
import { recentIncidents } from "../../utils/mockData";

export default function IncidentTimeline() {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="p-4 h-full"
    >
      <p className="text-xs font-mono uppercase tracking-wider text-ink-dim mb-3">Recent Incidents</p>
      <div className="relative pl-4 space-y-4">
        <div className="absolute left-[5px] top-1 bottom-1 w-px bg-white/10" />
        {recentIncidents.map((inc, i) => (
          <motion.div
            key={inc.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="relative"
          >
            <span
              className="absolute -left-4 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#0c0d11]"
              style={{
                backgroundColor:
                  inc.severity === "critical"
                    ? "#f5455c"
                    : inc.severity === "high"
                    ? "#fb923c"
                    : inc.severity === "warning"
                    ? "#fbbf24"
                    : "#34d399",
              }}
            />
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#5b8dff]">{inc.id}</span>
                  <Badge variant={inc.severity} className="!py-0.5 !px-1.5 text-[10px]">
                    {inc.severity}
                  </Badge>
                </div>
                <p className="text-sm text-ink truncate mt-0.5">{inc.title}</p>
                <p className="text-xs text-ink-faint mt-0.5">{inc.system}</p>
              </div>
              <span className="text-xs font-mono text-ink-faint shrink-0">{inc.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
