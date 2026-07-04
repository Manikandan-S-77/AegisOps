import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import PromptSuggestions from "./PromptSuggestions";
import { useIncident } from "../../context/IncidentContext";
import { LuBotMessageSquare } from "react-icons/lu";

export default function ChatWindow() {
  const { messages, isTyping, sendMessage } = useIncident();
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b border-white/8 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#5b8dff] to-[#a78bfa]">
          <LuBotMessageSquare className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-ink">Supervisor Agent</p>
          <p className="text-[11px] font-mono text-ink-dim uppercase tracking-wider">Hybrid RAG · Gemini</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full border border-[#34d399]/30 bg-[#34d399]/10 px-2.5 py-1 text-[11px] font-mono text-[#34d399]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" /> online
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <ChatBubble key={m.id} message={m} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#5b8dff] to-[#a78bfa]">
              <LuBotMessageSquare className="h-4 w-4 text-white" />
            </div>
            <div className="glass rounded-2xl rounded-tl-sm">
              <TypingIndicator />
            </div>
          </motion.div>
        )}
      </div>

      <div className="border-t border-white/8 px-5 py-4 space-y-3">
        <PromptSuggestions onSelect={sendMessage} />
        <ChatInput onSend={sendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
