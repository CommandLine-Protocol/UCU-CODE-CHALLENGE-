import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useModuleNavigation } from '../hooks/useModuleNavigation';

const NavigationBar = ({ modules = [] }) => {
  const { activeModule, scrollToModule } = useModuleNavigation(modules);

  if (!modules || modules.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-20 z-40 bg-space-navy/90 backdrop-blur-md border-b border-neon-teal/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto">
          {modules.map((module) => {
            const isActive = activeModule === module.id;
            
            return (
              <motion.button
                key={module.id}
                onClick={() => scrollToModule(module.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-neon-teal text-space-navy'
                    : 'bg-transparent text-soft-gray hover:text-neon-teal hover:bg-neon-teal/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {module.title}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;

