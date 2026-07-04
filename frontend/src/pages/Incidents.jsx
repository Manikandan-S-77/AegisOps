import { motion } from "framer-motion";
import GlassCard from "../components/ui/GlassCard";
import Badge from "../components/ui/Badge";
import { recentIncidents } from "../utils/mockData";
import { LuSiren, LuFilter } from "react-icons/lu";

export default function Incidents() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <LuSiren className="h-5 w-5 text-[#5b8dff]" />
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Incidents</h2>
            <p className="text-sm text-ink-dim">All incidents tracked by the supervisor agent</p>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-ink-dim hover:text-ink transition-colors">
          <LuFilter className="h-4 w-4" /> Filter
        </button>
      </div>

      <GlassCard className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 text-left text-xs font-mono uppercase tracking-wider text-ink-faint">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">System</th>
              <th className="px-4 py-3 font-medium">Severity</th>
              <th className="px-4 py-3 font-medium">Reported</th>
            </tr>
          </thead>
          <tbody>
            {recentIncidents.map((inc, i) => (
              <motion.tr
                key={inc.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
              >
                <td className="px-4 py-3 font-mono text-[#5b8dff]">{inc.id}</td>
                <td className="px-4 py-3 text-ink">{inc.title}</td>
                <td className="px-4 py-3 text-ink-dim">{inc.system}</td>
                <td className="px-4 py-3">
                  <Badge variant={inc.severity}>{inc.severity}</Badge>
                </td>
                <td className="px-4 py-3 text-ink-faint font-mono text-xs">{inc.time}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
