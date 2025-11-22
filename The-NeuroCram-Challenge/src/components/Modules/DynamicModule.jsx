import Card from '../UI/Card';

/**
 * Template for user-added dynamic modules
 */
const DynamicModule = ({ data, moduleId, title = 'Dynamic Module' }) => {
  return (
    <Card className="border-neon-teal/30">
      <h2 className="text-2xl font-bold text-neon-teal mb-4">{title}</h2>
      <p className="text-soft-gray/70">
        This is a dynamic module template. Custom modules can be added here.
      </p>
      <p className="text-xs text-soft-gray/50 mt-2">
        Module ID: {moduleId}
      </p>
    </Card>
  );
};

export default DynamicModule;

