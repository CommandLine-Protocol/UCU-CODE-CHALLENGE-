import { memo } from 'react';
import { motion } from 'framer-motion';
import Card from '../UI/Card';
import SectionHeader from '../UI/SectionHeader';
import { FireIcon } from '@heroicons/react/24/outline';

const CramHeatMap = memo(({ data, title = 'Cram Heatmap' }) => {
  if (!data || !data.cramHeatMap || !data.cramHeatMap.exams || data.cramHeatMap.exams.length === 0) {
    return null;
  }

  const { exams } = data.cramHeatMap;

  const getColor = (urgencyScore) => {
    if (urgencyScore >= 80) return 'bg-infrared';
    if (urgencyScore >= 60) return 'bg-orange-500';
    if (urgencyScore >= 40) return 'bg-yellow-500';
    if (urgencyScore >= 20) return 'bg-green-500';
    return 'bg-neon-teal';
  };

  const getTextColor = (urgencyScore) => {
    if (urgencyScore >= 60) return 'text-white';
    return 'text-space-navy';
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
          subtitle="Subjects sorted by urgency score"
          icon={FireIcon}
        />

        <div className="space-y-3">
          {exams.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-soft-gray">
                    {exam.subject}
                  </h4>
                  <p className="text-sm text-soft-gray/70">
                    {exam.daysRemaining} days remaining • {exam.examDate}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <span className="text-2xl font-bold text-neon-teal">
                    {Math.round(exam.urgencyScore)}
                  </span>
                  <p className="text-xs text-soft-gray/70">Urgency</p>
                </div>
              </div>

              <div className="relative h-8 bg-graphite rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${exam.urgencyScore}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`h-full ${getColor(exam.urgencyScore)} ${getTextColor(exam.urgencyScore)} flex items-center justify-end pr-2 font-semibold`}
                >
                  {exam.urgencyScore >= 60 && (
                    <span className="text-xs">🔥</span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-soft-gray/70">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-neon-teal rounded"></div>
            <span>Low (0-20)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Medium (20-40)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>High (40-60)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Very High (60-80)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-infrared rounded"></div>
            <span>Critical (80+)</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

CramHeatMap.displayName = 'CramHeatMap';

export default CramHeatMap;

