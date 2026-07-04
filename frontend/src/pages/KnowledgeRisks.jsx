import { motion } from "framer-motion";
import GlassCard from "../components/ui/GlassCard";
import Badge from "../components/ui/Badge";
import { LuShieldAlert, LuDatabase } from "react-icons/lu";

const risks = [
  { title: "Stale runbook: RB-19 references deprecated firewall rules", level: "high", source: "ChromaDB" },
  { title: "Low-confidence retrieval on payment-gateway incidents", level: "warning", source: "Hybrid RAG" },
  { title: "No runbook coverage for new Kubernetes autoscaler", level: "critical", source: "Knowledge Gap" },
  { title: "Duplicate root-cause entries for INC-08x series", level: "low", source: "ChromaDB" },
];

export default function KnowledgeRisks() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center gap-2.5">
        <LuShieldAlert className="h-5 w-5 text-[#f5455c]" />
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Knowledge Risks</h2>
          <p className="text-sm text-ink-dim">Gaps and confidence issues surfaced from the RAG knowledge base</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {risks.map((r, i) => (
          <GlassCard
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="p-4"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-sm text-ink leading-snug">{r.title}</p>
              <Badge variant={r.level} className="shrink-0">
                {r.level}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-faint">
              <LuDatabase className="h-3.5 w-3.5" /> {r.source}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
