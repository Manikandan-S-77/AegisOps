import { LuBookOpenText, LuArrowUpRight } from "react-icons/lu";
import GlassCard from "../ui/GlassCard";

export default function RunbookCard({ incident }) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <LuBookOpenText className="h-4 w-4 text-[#a78bfa]" />
        <p className="text-xs font-mono uppercase tracking-wider text-ink-dim">Related Runbook</p>
      </div>

      {incident.relatedRunbook ? (
        <button className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 hover:border-[#a78bfa]/40 hover:bg-white/8 transition-colors group">
          <span className="text-sm text-ink truncate">{incident.relatedRunbook}</span>
          <LuArrowUpRight className="h-4 w-4 text-ink-faint group-hover:text-[#a78bfa] transition-colors shrink-0" />
        </button>
      ) : (
        <p className="text-sm text-ink-faint italic">No runbook linked to this incident.</p>
      )}
    </GlassCard>
  );
}
