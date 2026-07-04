import { LuSparkles } from "react-icons/lu";
import GlassCard from "../ui/GlassCard";

export default function RecommendationCard({ incident }) {
  return (
    <GlassCard
      strong
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: 0.25 }}
      className="p-4 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-[#5b8dff]/15 blur-3xl pointer-events-none" />
      <div className="flex items-center gap-2 mb-3 relative">
        <LuSparkles className="h-4 w-4 text-[#5b8dff]" />
        <p className="text-xs font-mono uppercase tracking-wider text-ink-dim">AI Recommendation</p>
      </div>
      <p className="text-sm text-ink leading-relaxed relative">
        {incident.recommendation ||
          "Ask the supervisor agent to investigate a specific incident to receive a tailored recommendation here."}
      </p>
    </GlassCard>
  );
}
