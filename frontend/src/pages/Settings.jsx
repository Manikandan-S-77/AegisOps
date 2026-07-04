import { useState } from "react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { LuSettings, LuServer } from "react-icons/lu";
import { checkHealth } from "../api/chatService";

export default function Settings() {
  const [status, setStatus] = useState(null);
  const [checking, setChecking] = useState(false);

  const runHealthCheck = async () => {
    setChecking(true);
    setStatus(null);
    try {
      await checkHealth();
      setStatus("ok");
    } catch {
      setStatus("error");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="p-6 space-y-5 max-w-2xl">
      <div className="flex items-center gap-2.5">
        <LuSettings className="h-5 w-5 text-[#5b8dff]" />
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Settings</h2>
          <p className="text-sm text-ink-dim">Backend connection and workspace preferences</p>
        </div>
      </div>

      <GlassCard className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <LuServer className="h-4 w-4 text-ink-dim" />
          <p className="text-sm font-medium text-ink">Backend Connection</p>
        </div>
        <p className="text-sm text-ink-dim mb-1">
          API base URL is read from <code className="font-mono text-xs bg-white/8 px-1.5 py-0.5 rounded">VITE_API_BASE_URL</code>.
        </p>
        <p className="text-xs font-mono text-ink-faint mb-4">
          {import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}
        </p>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={runHealthCheck} disabled={checking}>
            {checking ? "Checking…" : "Run health check"}
          </Button>
          {status === "ok" && <span className="text-sm text-[#34d399]">Connected</span>}
          {status === "error" && <span className="text-sm text-[#f5455c]">Unreachable</span>}
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <p className="text-sm font-medium text-ink mb-3">About</p>
        <p className="text-sm text-ink-dim leading-relaxed">
          AegisOps pairs a FastAPI supervisor agent, Gemini reasoning, and a ChromaDB hybrid-RAG
          knowledge base with this enterprise SOC frontend. This panel intentionally stays
          read-only in the demo build.
        </p>
      </GlassCard>
    </div>
  );
}
