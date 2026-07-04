import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from "recharts";
import GlassCard from "../ui/GlassCard";
import { severityCounts } from "../../utils/mockData";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs">
      <p className="text-ink font-medium">{item.payload.name}</p>
      <p className="text-ink-dim font-mono">{item.value} open</p>
    </div>
  );
}

export default function SeverityBarChart() {
  return (
    <GlassCard initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="p-4 h-full">
      <p className="text-xs font-mono uppercase tracking-wider text-ink-dim mb-2">Severity Counts</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={severityCounts} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#9096a5", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#9096a5", fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {severityCounts.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
