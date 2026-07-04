import { motion } from "framer-motion";
import { LuSparkles } from "react-icons/lu";
import { promptSuggestions } from "../../utils/mockData";

export default function PromptSuggestions({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 px-1">
      {promptSuggestions.map((prompt, i) => (
        <motion.button
          key={prompt}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.03, borderColor: "rgba(91,141,255,0.5)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(prompt)}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-ink-dim hover:text-ink transition-colors"
        >
          <LuSparkles className="h-3 w-3 text-[#5b8dff]" />
          {prompt}
        </motion.button>
      ))}
    </div>
  );
}
