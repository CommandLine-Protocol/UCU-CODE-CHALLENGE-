import { useState, useCallback } from 'react';

/**
 * Custom hook for managing modal state
 * @returns {Object} Modal state and control functions
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : 'unset';
      return newState;
    });
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle
  };
};

