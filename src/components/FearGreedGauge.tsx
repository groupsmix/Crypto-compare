import { useFearGreedIndex } from '@/hooks/useCryptoPrices';

export default function FearGreedGauge() {
  const { data, loading } = useFearGreedIndex();

  if (loading || !data) {
    return (
      <div className="glass-card p-6 text-center">
        <div className="animate-pulse h-32 bg-white/5 rounded-xl" />
      </div>
    );
  }

  const getColor = (value: number) => {
    if (value <= 25) return '#ef4444';
    if (value <= 40) return '#f59e0b';
    if (value <= 60) return '#a1a1aa';
    if (value <= 75) return '#22c55e';
    return '#10b981';
  };

  const color = getColor(data.value);
  const rotation = (data.value / 100) * 180 - 90;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-white mb-4 text-center">مؤشر الخوف والطمع</h3>
      <div className="relative w-48 h-24 mx-auto mb-4">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="25%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#a1a1aa" />
              <stop offset="75%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="90"
            x2="100"
            y2="30"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${rotation}, 100, 90)`}
          />
          <circle cx="100" cy="90" r="6" fill={color} />
        </svg>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold mb-1" style={{ color }}>{data.value}</div>
        <div className="text-lg font-semibold" style={{ color }}>{data.classification}</div>
        <div className="text-xs text-text-secondary mt-2">يُحدّث يومياً</div>
      </div>
    </div>
  );
}
