import { motion } from 'framer-motion';

/**
 * Reusable Button component with neon styling
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'px-6 py-3 font-bold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-neon-teal/50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-neon-teal text-space-navy hover:shadow-lg hover:shadow-neon-teal/20 hover:scale-105',
    secondary: 'bg-transparent border-2 border-neon-teal text-neon-teal hover:bg-neon-teal/10 hover:shadow-lg hover:shadow-neon-teal/10',
    danger: 'bg-infrared text-white hover:shadow-lg hover:shadow-infrared/20 hover:scale-105',
    ghost: 'bg-transparent text-soft-gray hover:text-neon-teal'
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

