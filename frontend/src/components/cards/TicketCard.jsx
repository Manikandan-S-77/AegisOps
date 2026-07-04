import { LuTicket, LuArrowUpRight, LuCheckCheck } from "react-icons/lu";
import GlassCard from "../ui/GlassCard";

export default function TicketCard({ incident }) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <LuTicket className="h-4 w-4 text-[#5b8dff]" />
        <p className="text-xs font-mono uppercase tracking-wider text-ink-dim">Related Ticket</p>
      </div>

      {incident.relatedTicket ? (
        <button className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 hover:border-[#5b8dff]/40 hover:bg-white/8 transition-colors group mb-3">
          <span className="text-sm text-ink truncate">{incident.relatedTicket}</span>
          <LuArrowUpRight className="h-4 w-4 text-ink-faint group-hover:text-[#5b8dff] transition-colors shrink-0" />
        </button>
      ) : (
        <p className="text-sm text-ink-faint italic mb-3">No ticket linked to this incident.</p>
      )}

      {incident.resolvedBy && (
        <div className="flex items-center gap-2 text-xs text-ink-dim pt-3 border-t border-white/8">
          <LuCheckCheck className="h-3.5 w-3.5 text-[#34d399]" />
          <span>Resolved by {incident.resolvedBy}</span>
        </div>
      )}
    </GlassCard>
  );
}
