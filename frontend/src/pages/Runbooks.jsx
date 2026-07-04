import { motion } from "framer-motion";
import GlassCard from "../components/ui/GlassCard";
import { LuBookOpenText, LuArrowUpRight } from "react-icons/lu";

const runbooks = [
  { id: "RB-11", title: "Auth service latency remediation", updated: "3 days ago", uses: 42 },
  { id: "RB-22", title: "Payment API 5xx spike response", updated: "1 hr ago", uses: 18 },
  { id: "RB-08", title: "Suspicious login investigation", updated: "1 week ago", uses: 63 },
  { id: "RB-15", title: "Disk utilization threshold response", updated: "2 days ago", uses: 27 },
  { id: "RB-03", title: "Certificate rotation & renewal", updated: "5 days ago", uses: 9 },
  { id: "RB-19", title: "DDoS mitigation escalation", updated: "12 days ago", uses: 5 },
];

export default function Runbooks() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center gap-2.5">
        <LuBookOpenText className="h-5 w-5 text-[#a78bfa]" />
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Runbooks</h2>
          <p className="text-sm text-ink-dim">Knowledge-base playbooks used by the supervisor agent</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {runbooks.map((rb, i) => (
          <GlassCard
            key={rb.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/25 rounded px-2 py-0.5">
                {rb.id}
              </span>
              <LuArrowUpRight className="h-4 w-4 text-ink-faint group-hover:text-[#a78bfa] transition-colors" />
            </div>
            <p className="text-sm text-ink font-medium leading-snug mb-3">{rb.title}</p>
            <div className="flex items-center justify-between text-xs text-ink-faint">
              <span>Updated {rb.updated}</span>
              <span className="font-mono">{rb.uses} uses</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
