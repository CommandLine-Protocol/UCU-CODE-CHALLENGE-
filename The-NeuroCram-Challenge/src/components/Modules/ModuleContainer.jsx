import { useRef, useEffect, useMemo, useCallback } from 'react';
import { useModuleNavigation } from '../../hooks/useModuleNavigation';
import OverviewModule from './OverviewModule';
import CramHeatMap from './CramHeatMap';
import BrainEnergyGauge from './BrainEnergyGauge';
import StressForecast from './StressForecast';
import ProductivityZones from './ProductivityZones';
import DynamicModule from './DynamicModule';

// Module components map - defined outside component to prevent recreation
const moduleComponents = {
  'overview': OverviewModule,
  'cram-heatmap': CramHeatMap,
  'brain-energy': BrainEnergyGauge,
  'stress-forecast': StressForecast,
  'productivity-zones': ProductivityZones
};

const ModuleContainer = ({ modules = [], intelligenceData }) => {
  const { registerModule } = useModuleNavigation(modules);
  const moduleRefs = useRef({});

  if (!modules || modules.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {modules.map((module) => {
        const ModuleComponent = moduleComponents[module.id] || DynamicModule;

        return (
          <div
            key={module.id}
            id={module.id}
            ref={(el) => {
              if (el) {
                // Store the DOM element directly
                moduleRefs.current[module.id] = el;
                // Register with the navigation hook - it expects { current: element }
                registerModule(module.id, { current: el });
              } else {
                // Clean up when element is removed
                delete moduleRefs.current[module.id];
              }
            }}
            className="scroll-mt-24"
          >
            <ModuleComponent
              data={intelligenceData}
              moduleId={module.id}
              title={module.title}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ModuleContainer;

