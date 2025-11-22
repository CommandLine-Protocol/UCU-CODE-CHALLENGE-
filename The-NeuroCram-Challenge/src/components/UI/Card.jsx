import { motion } from 'framer-motion';

/**
 * Reusable Card component with glassmorphism
 */
const Card = ({
  children,
  title,
  subtitle,
  className = '',
  hover = true,
  ...props
}) => {
  return (
    <motion.div
      className={`card ${hover ? 'hover:border-neon-teal/50' : ''} ${className}`}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-bold text-neon-teal mb-1">{title}</h3>
          {subtitle && (
            <p className="text-sm text-soft-gray/70">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default Card;

