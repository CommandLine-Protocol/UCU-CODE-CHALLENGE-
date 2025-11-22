import { motion } from 'framer-motion';
import { BookOpenIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const StudyPlan = () => {
  const studySessions = [
    { id: 1, topic: 'Introduction to React', duration: '45 min', type: 'video', completed: true },
    { id: 2, topic: 'State Management', duration: '60 min', type: 'reading', completed: false },
    { id: 3, topic: 'Hooks Deep Dive', duration: '30 min', type: 'practice', completed: false },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'reading':
        return <BookOpenIcon className="w-5 h-5 mr-2" />;
      case 'video':
        return <ClockIcon className="w-5 h-5 mr-2" />;
      case 'practice':
        return <AcademicCapIcon className="w-5 h-5 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-graphite rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-neon-teal mb-6">Your Study Plan</h2>
      <div className="space-y-4">
        {studySessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-lg ${
              session.completed ? 'bg-opacity-20 bg-neon-teal' : 'bg-space-navy'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-3 ${
                session.completed ? 'bg-neon-teal' : 'bg-soft-gray'
              }`}></div>
              <div className="flex items-center text-soft-gray">
                {getIcon(session.type)}
                <span className={session.completed ? 'line-through text-opacity-70' : ''}>
                  {session.topic}
                </span>
              </div>
            </div>
            <span className="text-sm text-soft-gray">{session.duration}</span>
          </motion.div>
        ))}
      </div>
      <button className="mt-6 w-full py-3 bg-gradient-to-r from-neon-teal to-electric-blue text-space-navy font-semibold rounded-lg hover:opacity-90 transition-opacity">
        Start Next Session
      </button>
    </div>
  );
};

export default StudyPlan;
