import { motion } from "framer-motion";
import { LuListChecks } from "react-icons/lu";
import GlassCard from "../ui/GlassCard";

export default function RecoveryStepsCard({ incident }) {
  const steps = incident.recoverySteps || [];

  return (
    <GlassCard
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <LuListChecks className="h-4 w-4 text-[#34d399]" />
        <p className="text-xs font-mono uppercase tracking-wider text-ink-dim">Recovery Steps</p>
      </div>

      {steps.length === 0 ? (
        <p className="text-sm text-ink-faint italic">No remediation steps returned yet.</p>
      ) : (
        <ol className="space-y-2.5">
          {steps.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="flex items-start gap-2.5 text-sm"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#34d399]/15 text-[#34d399] text-[11px] font-mono font-semibold mt-0.5">
                {i + 1}
              </span>
              <span className="text-ink-dim leading-relaxed">{step}</span>
            </motion.li>
          ))}
        </ol>
      )}
    </GlassCard>
  );
}
