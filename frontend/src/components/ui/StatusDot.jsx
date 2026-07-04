const COLORS = {
  critical: "#f5455c",
  high: "#fb923c",
  warning: "#fbbf24",
  low: "#34d399",
  success: "#34d399",
  info: "#5b8dff",
  idle: "#5a5f6d",
};

export default function StatusDot({ variant = "success", pulse = true, size = "sm" }) {
  const color = COLORS[variant] || COLORS.idle;
  const dimension = size === "lg" ? "h-3 w-3" : "h-2 w-2";

  return (
    <span className={`relative inline-flex ${dimension}`} style={{ color }}>
      {pulse && <span className={`pulse-ring absolute inline-flex ${dimension} rounded-full opacity-60`} />}
      <span className={`relative inline-flex ${dimension} rounded-full`} style={{ backgroundColor: color }} />
    </span>
  );
}
