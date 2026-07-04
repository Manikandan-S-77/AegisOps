import { AnimatePresence, motion } from "framer-motion";
import ChatWindow from "../components/chat/ChatWindow";
import DynamicRenderer from "../components/render/DynamicRenderer";
import IncidentPieChart from "../components/analytics/IncidentPieChart";
import SeverityBarChart from "../components/analytics/SeverityBarChart";
import IncidentTimeline from "../components/analytics/IncidentTimeline";
import { useIncident } from "../context/IncidentContext";
import { LuLayoutGrid } from "react-icons/lu";

export default function Dashboard() {
  const { activeIncident, isTyping } = useIncident();

  return (
    <div className="grid h-full grid-cols-1 xl:grid-cols-[1fr_380px] gap-4 p-4">
      {/* Center: Chat */}
      <div className="glass rounded-2xl overflow-hidden min-h-[560px] xl:min-h-0 flex flex-col">
        <ChatWindow />
      </div>

      {/* Right: AI-driven workspace — whatever the backend's `ui` plan says */}
      <div className="flex flex-col gap-4 overflow-y-auto pr-0.5">
        <div className="flex items-center gap-2 px-1">
          <LuLayoutGrid className="h-4 w-4 text-ink-dim" />
          <p className="text-xs font-mono uppercase tracking-wider text-ink-dim">AI Workspace</p>
          {isTyping && (
            <span className="ml-auto text-[10px] font-mono text-[#5b8dff] animate-pulse">analyzing…</span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {activeIncident?.ui?.length > 0 ? (
            <motion.div
              key={activeIncident.incidentId || activeIncident.ui.join("-")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              <DynamicRenderer plan={activeIncident.ui} data={activeIncident} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <p className="text-sm text-ink-dim">
                This workspace is empty — the AI hasn't decided what to show yet. Ask the
                supervisor agent something and it will choose which components to render here.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom: Analytics spans full width */}
      <div className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-4 pb-2">
        <IncidentPieChart />
        <SeverityBarChart />
        <IncidentTimeline />
      </div>
    </div>
  );
}
