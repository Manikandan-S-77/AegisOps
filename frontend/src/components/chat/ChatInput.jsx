import { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { motion } from "framer-motion";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-1 glass rounded-2xl px-4 py-3 focus-within:border-[#5b8dff]/50 transition-colors">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          rows={1}
          placeholder="Ask the supervisor agent to investigate, remediate, or summarize…"
          className="w-full resize-none bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none max-h-32"
        />
      </div>
      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl bg-[#5b8dff] text-white shadow-[0_0_20px_rgba(91,141,255,0.35)] disabled:opacity-30 disabled:shadow-none transition-opacity"
      >
        <LuSendHorizontal className="h-[18px] w-[18px]" />
      </motion.button>
    </form>
  );
}
