import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import Card from '../UI/Card';
import SectionHeader from '../UI/SectionHeader';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const OverviewModule = memo(({ data, title = 'Overview' }) => {
  if (!data || !data.overview) {
    return null;
  }

  const { overview } = data;

  // Memoize stats to prevent recalculation
  const stats = useMemo(() => [
    {
      label: 'Exams',
      value: overview.totalExams,
      icon: '📚'
    },
    {
      label: 'Days Remaining',
      value: overview.daysRemaining,
      icon: '⏰'
    },
    {
      label: 'Total Study Hours',
      value: Math.round(overview.totalStudyHours),
      icon: '📖'
    },
    {
      label: 'Projected Performance',
      value: `${Math.round(overview.projectedPerformance)}%`,
      icon: '🎯'
    }
  ], [overview]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-neon-teal/30">
        <SectionHeader
          title={title}
          subtitle="Summary insights and key metrics"
          icon={ChartBarIcon}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-graphite/50 rounded-lg p-4 border border-soft-gray/10"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-3xl font-bold text-neon-teal">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-soft-gray/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {overview.daysRemaining <= 7 && (
          <div className="mt-6 p-4 bg-infrared/10 border border-infrared/30 rounded-lg">
            <p className="text-infrared font-semibold">
              ⚠️ Less than a week remaining! Focus on high-urgency subjects.
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
});

OverviewModule.displayName = 'OverviewModule';

export default OverviewModule;

