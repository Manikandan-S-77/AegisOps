import { useState } from "react";
import { LuSearch, LuBell, LuChevronDown } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

export default function Topbar() {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/8 bg-[#0c0d11]/70 backdrop-blur-xl px-6 py-3.5">
      <div className="flex items-center gap-2 min-w-0">
        <h1 className="font-display text-sm font-semibold text-ink tracking-tight truncate">
          AegisOps
        </h1>
        <span className="text-ink-faint">/</span>
        <span className="text-sm text-ink-dim truncate">Enterprise Incident Response AI</span>
      </div>

      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />
          <input
            type="text"
            placeholder="Search incidents, runbooks, tickets…"
            className="w-full rounded-xl bg-white/5 border border-white/10 py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-[#5b8dff]/50 focus:bg-white/8 transition-colors"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden lg:inline-block rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-ink-faint">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ink-dim hover:text-ink hover:bg-white/8 transition-colors"
          >
            <LuBell className="h-[17px] w-[17px]" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#f5455c]" />
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="glass-strong absolute right-0 mt-2 w-72 rounded-xl p-3 z-50 shadow-2xl"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-ink-dim mb-2">Notifications</p>
                <div className="space-y-2 text-sm">
                  <div className="rounded-lg bg-white/5 p-2.5">
                    <p className="text-ink">INC-101 escalated to Critical</p>
                    <p className="text-ink-faint text-xs mt-0.5">2 min ago</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2.5">
                    <p className="text-ink">Runbook RB-22 updated</p>
                    <p className="text-ink-faint text-xs mt-0.5">1 hr ago</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-2.5 hover:bg-white/8 transition-colors">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#5b8dff] to-[#a78bfa] text-xs font-semibold text-white">
            TI
          </div>
          <span className="hidden sm:block text-sm text-ink">The imposters</span>
          <LuChevronDown className="h-3.5 w-3.5 text-ink-faint hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
