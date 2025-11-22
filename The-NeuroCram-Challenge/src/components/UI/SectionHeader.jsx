/**
 * Reusable Section Header component
 */
const SectionHeader = ({
  title,
  subtitle,
  icon: Icon,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className="w-6 h-6 text-neon-teal" />}
        <h2 className="text-2xl font-bold text-neon-teal">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-soft-gray/70 text-sm">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;

