import { motion } from "framer-motion";
import { LuShieldHalf, LuUser } from "react-icons/lu";
import { markdownToHtml } from "../../utils/parseAIResponse";

export default function ChatBubble({ message }) {
  const isUser = message.role === "user";
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          isUser
            ? "bg-white/8 text-ink-dim"
            : "bg-gradient-to-br from-[#5b8dff] to-[#a78bfa] text-white shadow-[0_0_16px_rgba(91,141,255,0.35)]"
        }`}
      >
        {isUser ? <LuUser className="h-4 w-4" /> : <LuShieldHalf className="h-4 w-4" />}
      </div>

      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "bg-[#5b8dff] text-white rounded-tr-sm"
              : message.isError
              ? "glass border-[#f5455c]/30 text-[#f5455c] rounded-tl-sm"
              : "glass text-ink rounded-tl-sm"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.text}</p>
          ) : (
            <div
              className="prose-ai"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(message.text) }}
            />
          )}
        </div>
        <span className="mt-1 px-1 text-[11px] font-mono text-ink-faint">{time}</span>
      </div>
    </motion.div>
  );
}
