import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Reusable Modal Wrapper with backdrop
 */
const ModalWrapper = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  className = ''
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
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

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`${sizes[size]} w-full bg-graphite/95 backdrop-blur-lg border border-neon-teal/30 rounded-xl shadow-2xl pointer-events-auto ${className}`}
            >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-soft-gray/10">
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
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;

