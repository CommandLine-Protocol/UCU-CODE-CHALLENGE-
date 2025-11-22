import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Reusable Drawer/Sidebar component
 */
const DrawerWrapper = ({
  isOpen,
  onClose,
  children,
  title,
  position = 'right',
  className = ''
}) => {
  const positions = {
    right: 'right-0',
    left: 'left-0',
    top: 'top-0',
    bottom: 'bottom-0'
  };

  const animations = {
    right: { x: '100%' },
    left: { x: '-100%' },
    top: { y: '-100%' },
    bottom: { y: '100%' }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={animations[position]}
            animate={{ x: 0, y: 0 }}
            exit={animations[position]}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed ${positions[position]} top-0 bottom-0 w-full max-w-md bg-graphite/95 backdrop-blur-lg border-l border-neon-teal/30 shadow-2xl z-50 overflow-y-auto ${className}`}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-soft-gray/10 sticky top-0 bg-graphite/95">
                <h2 className="text-2xl font-bold text-neon-teal">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-soft-gray hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerWrapper;

