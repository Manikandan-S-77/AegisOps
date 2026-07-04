import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuLayoutDashboard,
  LuBotMessageSquare,
  LuSiren,
  LuBookOpenText,
  LuTicket,
  LuShieldAlert,
  LuChartColumn,
  LuSettings,
  LuShieldHalf,
} from "react-icons/lu";
import { sidebarNav } from "../../utils/mockData";

const ICONS = {
  dashboard: LuLayoutDashboard,
  assistant: LuBotMessageSquare,
  incidents: LuSiren,
  runbooks: LuBookOpenText,
  tickets: LuTicket,
  knowledge: LuShieldAlert,
  analytics: LuChartColumn,
  settings: LuSettings,
};

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/8 bg-[#0c0d11]/80 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/8">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#5b8dff] to-[#a78bfa] shadow-[0_0_20px_rgba(91,141,255,0.4)]">
          <LuShieldHalf className="h-5 w-5 text-white" />
        </div>
        <div className="leading-tight">
          <p className="font-display font-semibold text-[15px] text-ink tracking-tight">AegisOps</p>
          <p className="text-[11px] font-mono text-ink-dim tracking-wider uppercase">Incident Response AI</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
        {sidebarNav.map((item, idx) => {
          const Icon = ICONS[item.key];
          return (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-white bg-white/8"
                    : "text-[#9096a5] hover:text-white hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-[#5b8dff] shadow-[0_0_10px_rgba(91,141,255,0.8)]"
                    />
                  )}
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/8">
        <div className="glass rounded-xl px-3 py-3">
          <p className="text-[11px] font-mono uppercase tracking-wider text-ink-dim mb-1">System status</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-2 w-2 rounded-full bg-[#34d399] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34d399]" />
            </span>
            <span className="text-xs text-ink">All agents operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
