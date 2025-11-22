import { memo } from 'react';
import { motion } from 'framer-motion';
import Card from '../UI/Card';
import SectionHeader from '../UI/SectionHeader';
import { BoltIcon } from '@heroicons/react/24/outline';

const BrainEnergyGauge = memo(({ data, title = 'Brain Energy Gauge' }) => {
  if (!data || !data.brainEnergy) {
    return null;
  }

  const { energyScore, burnoutRisk } = data.brainEnergy;

  // Calculate angle for semi-circle gauge (0-180 degrees)
  const angle = (energyScore / 100) * 180;

  const getEnergyColor = (score) => {
    if (score >= 70) return '#29E6D2'; // neon-teal
    if (score >= 40) return '#FFD700'; // yellow
    return '#FF4A3D'; // infrared
  };

  const getBurnoutColor = (risk) => {
    if (risk === 'High') return '#FF4A3D';
    if (risk === 'Medium') return '#FFA500';
    return '#29E6D2';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-neon-teal/30">
        <SectionHeader
          title={title}
          subtitle="Monitor your energy levels and burnout risk"
          icon={BoltIcon}
        />

        <div className="flex flex-col items-center justify-center py-8">
          {/* Semi-circular Gauge */}
          <div className="relative w-64 h-32 mb-8">
            {/* Background arc */}
            <svg className="w-full h-full" viewBox="0 0 200 100">
              <path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke="#1E1E26"
                strokeWidth="20"
                strokeLinecap="round"
              />
              
              {/* Energy arc */}
              <motion.path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke={getEnergyColor(energyScore)}
                strokeWidth="20"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: energyScore / 100 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>

            {/* Energy score display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-5xl font-bold"
                  style={{ color: getEnergyColor(energyScore) }}
                >
                  {Math.round(energyScore)}
                </motion.div>
                <p className="text-sm text-soft-gray/70 mt-1">Energy Score</p>
              </div>
            </div>
          </div>

          {/* Burnout Risk Indicator */}
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-soft-gray">Burnout Risk</span>
              <span
                className="text-lg font-bold"
                style={{ color: getBurnoutColor(burnoutRisk) }}
              >
                {burnoutRisk}
              </span>
            </div>
            <div className="h-3 bg-graphite rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(burnoutRisk === 'High' ? 100 : burnoutRisk === 'Medium' ? 60 : 30)}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full rounded-full"
                style={{ backgroundColor: getBurnoutColor(burnoutRisk) }}
              />
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-8 w-full max-w-md space-y-2">
            {energyScore < 40 && (
              <div className="p-3 bg-infrared/10 border border-infrared/30 rounded-lg">
                <p className="text-sm text-infrared">
                  ⚠️ Low energy detected. Consider reducing study hours or improving sleep.
                </p>
              </div>
            )}
            {energyScore >= 40 && energyScore < 70 && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-500">
                  💡 Moderate energy. Maintain current pace but monitor for burnout.
                </p>
              </div>
            )}
            {energyScore >= 70 && (
              <div className="p-3 bg-neon-teal/10 border border-neon-teal/30 rounded-lg">
                <p className="text-sm text-neon-teal">
                  ✅ High energy! You're in optimal condition for studying.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

BrainEnergyGauge.displayName = 'BrainEnergyGauge';

export default BrainEnergyGauge;

