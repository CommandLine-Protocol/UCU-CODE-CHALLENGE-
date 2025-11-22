import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing the launch/boot-up sequence animation
 * @param {boolean} shouldStart - Whether to start the sequence
 * @returns {Object} Launch sequence state and controls
 */
export const useLaunchSequence = (shouldStart = false) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [modulesVisible, setModulesVisible] = useState([]);

  const phases = [
    'initializing',
    'analyzing',
    'generating',
    'ready'
  ];

  const moduleIds = [
    'overview',
    'cram-heatmap',
    'brain-energy',
    'stress-forecast',
    'productivity-zones'
  ];

  /**
   * Start the launch sequence
   */
  const startSequence = useCallback(() => {
    setIsLaunching(true);
    setCurrentPhase(0);
    setModulesVisible([]);
  }, []);

  /**
   * Reset the sequence
   */
  const resetSequence = useCallback(() => {
    setIsLaunching(false);
    setCurrentPhase(0);
    setModulesVisible([]);
  }, []);

  useEffect(() => {
    if (!shouldStart || !isLaunching) return;

    // Phase transitions
    const phaseTimers = phases.map((_, index) => {
      return setTimeout(() => {
        setCurrentPhase(index);
      }, index * 800); // 800ms between phases
    });

    // Module appearance (staggered)
    const moduleTimers = moduleIds.map((moduleId, index) => {
      return setTimeout(() => {
        setModulesVisible(prev => [...prev, moduleId]);
      }, 2000 + (index * 300)); // Start after 2s, then 300ms between modules
    });

    // Complete sequence after all modules are visible
    const completeTimer = setTimeout(() => {
      setIsLaunching(false);
    }, 2000 + (moduleIds.length * 300) + 500);

    return () => {
      phaseTimers.forEach(timer => clearTimeout(timer));
      moduleTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(completeTimer);
    };
  }, [shouldStart, isLaunching]);

  return {
    isLaunching,
    currentPhase,
    phaseName: phases[currentPhase],
    modulesVisible,
    startSequence,
    resetSequence
  };
};

