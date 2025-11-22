import DrawerWrapper from '../UI/DrawerWrapper';
import Button from '../UI/Button';
import Card from '../UI/Card';

const availableModules = [
  { id: 'overview', title: 'Overview', description: 'Summary insights and key metrics' },
  { id: 'cram-heatmap', title: 'Cram Heatmap', description: 'Visualize subjects by urgency' },
  { id: 'brain-energy', title: 'Brain Energy Gauge', description: 'Monitor energy levels and burnout risk' },
  { id: 'stress-forecast', title: 'Stress Forecast', description: 'Predict daily stress levels' },
  { id: 'productivity-zones', title: 'Productivity Zones', description: 'Optimal study times by time of day' },
  { id: 'question-pattern', title: 'Question Pattern Emulator', description: 'Analyze question patterns' },
  { id: 'weak-spot', title: 'Weak-Spot Drill Engine', description: 'Focus on areas needing improvement' },
  { id: 'survival-probability', title: 'Exam Survival Probability', description: 'Calculate success probability' }
];

const AddModulesDrawer = ({ isOpen, onClose, activeModules = [], onToggleModule }) => {
  const isModuleActive = (moduleId) => {
    return activeModules.some(m => m.id === moduleId);
  };

  return (
    <DrawerWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Add Intelligence Modules"
      position="right"
    >
      <div className="space-y-4">
        <p className="text-soft-gray text-sm mb-6">
          Select additional intelligence modules to enhance your exam preparation dashboard.
        </p>

        {availableModules.map((module) => {
          const isActive = isModuleActive(module.id);
          
          return (
            <Card
              key={module.id}
              className={`cursor-pointer transition-all ${
                isActive ? 'border-neon-teal bg-neon-teal/10' : ''
              }`}
              onClick={() => onToggleModule && onToggleModule(module)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neon-teal mb-1">
                    {module.title}
                  </h3>
                  <p className="text-sm text-soft-gray/70">
                    {module.description}
                  </p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => {}}
                    className="w-5 h-5 rounded border-soft-gray/30 bg-graphite text-neon-teal focus:ring-neon-teal focus:ring-2"
                  />
                </div>
              </div>
            </Card>
          );
        })}

        <div className="pt-6 border-t border-soft-gray/10">
          <Button
            variant="primary"
            onClick={onClose}
            className="w-full"
          >
            Done
          </Button>
        </div>
      </div>
    </DrawerWrapper>
  );
};

export default AddModulesDrawer;

