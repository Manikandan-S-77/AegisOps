export default function CardSkeleton({ lines = 3 }) {
  return (
    <div className="glass rounded-2xl p-4 space-y-3 animate-pulse">
      <div className="h-3 w-1/3 rounded bg-white/10" />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-2.5 rounded bg-white/5" style={{ width: `${85 - i * 12}%` }} />
        ))}
      </div>
    </div>
  );
}
