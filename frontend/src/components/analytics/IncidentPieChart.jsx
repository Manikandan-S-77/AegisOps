import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import GlassCard from "../ui/GlassCard";
import { incidentDistribution } from "../../utils/mockData";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs">
      <p className="text-ink font-medium">{item.name}</p>
      <p className="text-ink-dim font-mono">{item.value} incidents</p>
    </div>
  );
}

export default function IncidentPieChart() {
  return (
    <GlassCard initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-4 h-full">
      <p className="text-xs font-mono uppercase tracking-wider text-ink-dim mb-2">Incident Distribution</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={incidentDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              stroke="none"
            >
              {incidentDistribution.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span className="text-ink-dim text-xs">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
