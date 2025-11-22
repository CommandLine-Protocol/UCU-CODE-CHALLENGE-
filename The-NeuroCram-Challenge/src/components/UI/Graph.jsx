import { useMemo } from 'react';

/**
 * Reusable Graph component for line charts
 */
const Graph = ({
  data = [],
  width = '100%',
  height = 200,
  color = '#29E6D2',
  showGrid = true,
  showArea = false,
  className = ''
}) => {
  const { pathData, areaPathData, maxValue, minValue } = useMemo(() => {
    if (!data || data.length === 0) {
      return { pathData: '', areaPathData: '', maxValue: 100, minValue: 0 };
    }

    const values = data.map(d => typeof d === 'number' ? d : d.value);
    const maxValue = Math.max(...values, 100);
    const minValue = Math.min(...values, 0);
    const range = maxValue - minValue || 1;

    const points = data.map((d, index) => {
      const value = typeof d === 'number' ? d : d.value;
      const x = (index / (data.length - 1 || 1)) * 100;
      const y = 100 - ((value - minValue) / range) * 100;
      return `${x},${y}`;
    });

    const pathData = `M ${points.join(' L ')}`;
    const areaPathData = `${pathData} L 100,100 L 0,100 Z`;

    return { pathData, areaPathData, maxValue, minValue };
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div 
        className={`flex items-center justify-center bg-graphite/30 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <p className="text-soft-gray/50">No data available</p>
      </div>
    );
  }

  return (
    <div className={className} style={{ width }}>
      <svg width="100%" height={height} className="overflow-visible">
        {/* Grid lines */}
        {showGrid && (
          <g stroke="#B9B9C9" strokeWidth="0.5" opacity="0.2">
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={`${y}%`}
                x2="100%"
                y2={`${y}%`}
              />
            ))}
          </g>
        )}

        {/* Area fill */}
        {showArea && (
          <path
            d={areaPathData}
            fill={color}
            opacity="0.2"
          />
        )}

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((d, index) => {
          const value = typeof d === 'number' ? d : d.value;
          const x = (index / (data.length - 1 || 1)) * 100;
          const normalizedValue = ((value - minValue) / (maxValue - minValue || 1)) * 100;
          const y = 100 - normalizedValue;

          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={`${y}%`}
              r="4"
              fill={color}
              className="drop-shadow-lg"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Graph;

