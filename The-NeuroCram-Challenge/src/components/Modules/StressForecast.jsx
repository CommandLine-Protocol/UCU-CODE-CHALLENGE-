import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import Card from '../UI/Card';
import SectionHeader from '../UI/SectionHeader';
import Graph from '../UI/Graph';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const StressForecast = memo(({ data, title = 'Stress Forecast' }) => {
  if (!data || !data.stressForecast) {
    return null;
  }

  const { currentStress, forecast, peakStressDay } = data.stressForecast;

  // Prepare graph data
  const graphData = forecast.map(day => ({
    value: day.stressScore,
    date: day.date
  }));

  const getStressLevel = (score) => {
    if (score >= 70) return { label: 'Critical', color: '#FF4A3D' };
    if (score >= 50) return { label: 'High', color: '#FFA500' };
    if (score >= 30) return { label: 'Medium', color: '#FFD700' };
    return { label: 'Low', color: '#29E6D2' };
  };

  const currentStressLevel = getStressLevel(currentStress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-neon-teal/30">
        <SectionHeader
          title={title}
          subtitle="Predict daily stress levels during exam period"
          icon={ExclamationTriangleIcon}
        />

        {/* Current Stress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-soft-gray">Current Stress Level</span>
            <span
              className="text-2xl font-bold"
              style={{ color: currentStressLevel.color }}
            >
              {Math.round(currentStress)} / 100
            </span>
          </div>
          <div className="h-4 bg-graphite rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentStress}%` }}
              transition={{ duration: 1 }}
              className="h-full rounded-full"
              style={{ backgroundColor: currentStressLevel.color }}
            />
          </div>
          <p className="text-sm mt-2" style={{ color: currentStressLevel.color }}>
            {currentStressLevel.label}
          </p>
        </div>

        {/* Forecast Graph */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-soft-gray mb-4">
            30-Day Forecast
          </h3>
          <div className="bg-graphite/50 rounded-lg p-4">
            <Graph
              data={graphData}
              height={200}
              color={currentStressLevel.color}
              showGrid={true}
              showArea={true}
            />
          </div>
        </div>

        {/* Peak Stress Day */}
        {peakStressDay && (
          <div className="p-4 bg-infrared/10 border border-infrared/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-infrared mb-1">
                  Peak Stress Day
                </p>
                <p className="text-xs text-soft-gray/70">
                  {new Date(peakStressDay.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-infrared">
                  {Math.round(peakStressDay.stressScore)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {currentStress >= 50 && (
          <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <p className="text-sm text-orange-500">
              💡 High stress detected. Consider:
            </p>
            <ul className="text-xs text-soft-gray/70 mt-2 list-disc list-inside space-y-1">
              <li>Taking regular breaks</li>
              <li>Practicing relaxation techniques</li>
              <li>Adjusting study schedule to reduce workload</li>
            </ul>
          </div>
        )}
      </Card>
    </motion.div>
  );
});

StressForecast.displayName = 'StressForecast';

export default StressForecast;

