interface RadarChartProps {
  labels: string[];
  datasets: {
    name: string;
    values: number[];
    color: string;
  }[];
  maxValue?: number;
}

export default function RadarChart({ labels, datasets, maxValue = 100 }: RadarChartProps) {
  const size = 300;
  const center = size / 2;
  const radius = 120;
  const levels = 5;
  const angleStep = (2 * Math.PI) / labels.length;

  const getPoint = (angle: number, value: number) => {
    const r = (value / maxValue) * radius;
    return {
      x: center + r * Math.sin(angle),
      y: center - r * Math.cos(angle),
    };
  };

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[300px]">
        {/* Grid levels */}
        {Array.from({ length: levels }, (_, i) => {
          const r = ((i + 1) / levels) * radius;
          const points = labels.map((_, j) => {
            const angle = j * angleStep;
            return `${center + r * Math.sin(angle)},${center - r * Math.cos(angle)}`;
          }).join(' ');
          return (
            <polygon
              key={i}
              points={points}
              fill="none"
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-700"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Axis lines */}
        {labels.map((_, i) => {
          const angle = i * angleStep;
          const end = getPoint(angle, maxValue);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-700"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Data polygons */}
        {datasets.map((dataset) => {
          const points = dataset.values.map((v, i) => {
            const p = getPoint(i * angleStep, v);
            return `${p.x},${p.y}`;
          }).join(' ');
          return (
            <g key={dataset.name}>
              <polygon
                points={points}
                fill={dataset.color}
                fillOpacity={0.15}
                stroke={dataset.color}
                strokeWidth="2"
              />
              {dataset.values.map((v, i) => {
                const p = getPoint(i * angleStep, v);
                return (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="3"
                    fill={dataset.color}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Labels */}
        {labels.map((label, i) => {
          const angle = i * angleStep;
          const p = getPoint(angle, maxValue + 18);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-600 dark:fill-gray-400 text-[10px]"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-3">
        {datasets.map((dataset) => (
          <div key={dataset.name} className="flex items-center gap-1.5 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dataset.color }} />
            <span className="text-gray-600 dark:text-gray-400">{dataset.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
