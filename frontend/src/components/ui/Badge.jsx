const VARIANTS = {
  critical: "bg-[#f5455c]/15 text-[#f5455c] border-[#f5455c]/30",
  high: "bg-[#fb923c]/15 text-[#fb923c] border-[#fb923c]/30",
  warning: "bg-[#fbbf24]/15 text-[#fbbf24] border-[#fbbf24]/30",
  low: "bg-[#34d399]/15 text-[#34d399] border-[#34d399]/30",
  success: "bg-[#34d399]/15 text-[#34d399] border-[#34d399]/30",
  info: "bg-[#5b8dff]/15 text-[#5b8dff] border-[#5b8dff]/30",
  neutral: "bg-white/8 text-[#9096a5] border-white/15",
  violet: "bg-[#a78bfa]/15 text-[#a78bfa] border-[#a78bfa]/30",
};

export default function Badge({ variant = "neutral", children, className = "", dot = false }) {
  const styles = VARIANTS[variant] || VARIANTS.neutral;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium font-mono uppercase tracking-wide ${styles} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
