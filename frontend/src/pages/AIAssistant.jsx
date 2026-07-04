import { AnimatePresence, motion } from "framer-motion";
import ChatWindow from "../components/chat/ChatWindow";
import DynamicRenderer from "../components/render/DynamicRenderer";
import { useIncident } from "../context/IncidentContext";

export default function AIAssistant() {
  const { activeIncident } = useIncident();

  return (
    <div className="grid h-full grid-cols-1 xl:grid-cols-[1fr_380px] gap-4 p-4">
      <div className="glass rounded-2xl overflow-hidden min-h-[70vh] xl:min-h-0 flex flex-col">
        <ChatWindow />
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto pr-0.5">
        <AnimatePresence mode="wait">
          {activeIncident?.ui?.length > 0 ? (
            <motion.div
              key={activeIncident.incidentId || activeIncident.ui.join("-")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-4"
            >
              <DynamicRenderer plan={activeIncident.ui} data={activeIncident} />
            </motion.div>
          ) : (
            <div className="glass rounded-2xl p-6 text-center">
              <p className="text-sm text-ink-dim">
                The AI will choose which components appear here based on your request.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
