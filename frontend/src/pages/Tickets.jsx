import { motion } from "framer-motion";
import GlassCard from "../components/ui/GlassCard";
import Badge from "../components/ui/Badge";
import { LuTicket } from "react-icons/lu";

const tickets = [
  { id: "TCK-4021", incident: "INC-101", subject: "Auth service latency spike", status: "in-progress" },
  { id: "TCK-4018", incident: "INC-100", subject: "Elevated 5xx on payments-api", status: "resolved" },
  { id: "TCK-4014", incident: "INC-099", subject: "Suspicious login pattern", status: "resolved" },
  { id: "TCK-4009", incident: "INC-098", subject: "Disk utilization breach", status: "open" },
];

const STATUS_VARIANT = { "in-progress": "warning", resolved: "success", open: "info" };

export default function Tickets() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center gap-2.5">
        <LuTicket className="h-5 w-5 text-[#5b8dff]" />
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Tickets</h2>
          <p className="text-sm text-ink-dim">Tickets opened from incident investigations</p>
        </div>
      </div>

      <div className="space-y-3">
        {tickets.map((t, i) => (
          <GlassCard
            key={t.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="font-mono text-xs text-[#5b8dff] bg-[#5b8dff]/10 border border-[#5b8dff]/25 rounded px-2 py-0.5 shrink-0">
                {t.id}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-ink truncate">{t.subject}</p>
                <p className="text-xs text-ink-faint font-mono">linked to {t.incident}</p>
              </div>
            </div>
            <Badge variant={STATUS_VARIANT[t.status]}>{t.status}</Badge>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
