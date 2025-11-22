import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for managing module navigation and scroll anchors
 * @param {Array} modules - Array of module objects with id and title
 * @returns {Object} Navigation state and handlers
 */
export const useModuleNavigation = (modules = []) => {
  const [activeModule, setActiveModule] = useState(null);
  const moduleRefs = useRef({});

  /**
   * Register a module ref
   */
  const registerModule = useCallback((id, ref) => {
    moduleRefs.current[id] = ref;
  }, []);

  /**
   * Scroll to a specific module
   * Uses getElementById to ensure it works across different hook instances
   */
  const scrollToModule = useCallback((moduleId) => {
    // Use getElementById as primary method since IDs are set on divs
    // This works regardless of which hook instance is used
    const element = document.getElementById(moduleId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setActiveModule(moduleId);
    }
  }, []);

  /**
   * Handle scroll to update active module
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header

      // Find which module is currently in view
      for (const module of modules) {
        // Try ref first, then fallback to getElementById
        const ref = moduleRefs.current[module.id];
        let element = null;
        
        if (ref && ref.current) {
          element = ref.current;
        } else {
          element = document.getElementById(module.id);
        }
        
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveModule(module.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [modules]);

  return {
    activeModule,
    scrollToModule,
    registerModule,
    moduleRefs
  };
};

