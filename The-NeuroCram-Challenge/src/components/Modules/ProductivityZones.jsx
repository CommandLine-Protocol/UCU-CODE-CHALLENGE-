import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import Card from '../UI/Card';
import SectionHeader from '../UI/SectionHeader';
import { ClockIcon } from '@heroicons/react/24/outline';

const ProductivityZones = memo(({ data, title = 'Productivity Zones' }) => {
  if (!data || !data.productivityZones) {
    return null;
  }

  const { zones, bestWindow } = data.productivityZones;

  // Memoize time slots
  const timeSlots = useMemo(() => [
    { label: '6-9 AM', key: '6-9' },
    { label: '9-12 PM', key: '9-12' },
    { label: '12-3 PM', key: '12-15' },
    { label: '3-6 PM', key: '15-18' },
    { label: '6-9 PM', key: '18-21' },
    { label: '9-12 AM', key: '21-24' }
  ], []);

  // Memoize color function
  const getProductivityColor = useMemo(() => (score) => {
    if (score >= 80) return '#29E6D2'; // neon-teal
    if (score >= 60) return '#2B9DFF'; // electric-blue
    if (score >= 40) return '#FFD700'; // yellow
    return '#B9B9C9'; // soft-gray
  }, []);

  const maxProductivity = useMemo(() => 
    Math.max(...Object.values(zones)),
    [zones]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-neon-teal/30">
        <SectionHeader
          title={title}
          subtitle="Optimal study times based on your profile"
          icon={ClockIcon}
        />

        <div className="space-y-4">
          {timeSlots.map((slot, index) => {
            const score = zones[slot.key] || 0;
            const percentage = (score / maxProductivity) * 100;
            const isBest = bestWindow.time === slot.key;
            const color = getProductivityColor(score);

            return (
              <motion.div
                key={slot.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  isBest
                    ? 'border-neon-teal bg-neon-teal/10'
                    : 'border-soft-gray/10 bg-graphite/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-soft-gray">
                      {slot.label}
                    </span>
                    {isBest && (
                      <span className="text-xs bg-neon-teal text-space-navy px-2 py-1 rounded font-semibold">
                        BEST
                      </span>
                    )}
                  </div>
                  <span
                    className="text-xl font-bold"
                    style={{ color }}
                  >
                    {Math.round(score)}
                  </span>
                </div>

                <div className="relative h-6 bg-graphite rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {bestWindow && (
          <div className="mt-6 p-4 bg-neon-teal/10 border border-neon-teal/30 rounded-lg">
            <p className="text-sm text-neon-teal font-semibold mb-1">
              ⭐ Optimal Study Window
            </p>
            <p className="text-xs text-soft-gray/70">
              Your peak productivity is during <strong>{bestWindow.time}</strong> hours
              with a score of <strong>{Math.round(bestWindow.score)}</strong>.
              Schedule your most challenging study sessions during this time.
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
});

ProductivityZones.displayName = 'ProductivityZones';

export default ProductivityZones;

