import { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import LoginModal from './components/Modals/LoginModal';
import SignupModal from './components/Modals/SignupModal';
import GeneratePlanModal from './components/Modals/GeneratePlanModal';
import AddModulesDrawer from './components/Modals/AddModulesDrawer';
import ModuleContainer from './components/Modules/ModuleContainer';
import { useLaunchSequence } from './hooks/useLaunchSequence';
import { useIntelligenceEngine } from './hooks/useIntelligenceEngine';
import Button from './components/UI/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { testPlanData, isAdminUser } from './data/testData';
import { hardcodedIntelligenceData } from './data/hardcodedIntelligence';

// Default modules - memoized to prevent recreation
const DEFAULT_MODULES = [
  { id: 'overview', title: 'Overview' },
  { id: 'cram-heatmap', title: 'Cram Heatmap' },
  { id: 'brain-energy', title: 'Brain Energy' },
  { id: 'stress-forecast', title: 'Stress Forecast' },
  { id: 'productivity-zones', title: 'Productivity Zones' }
];

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isAddModulesOpen, setIsAddModulesOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [modules, setModules] = useState([]);
  const [planData, setPlanData] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Use hardcoded data for admin (instant), computed data for regular users
  const computedIntelligenceData = useIntelligenceEngine(planData);
  const intelligenceData = isAdminMode ? hardcodedIntelligenceData : computedIntelligenceData;

  // Launch sequence hook
  const { isLaunching, phaseName, modulesVisible, startSequence } = useLaunchSequence();

  // Memoized callbacks to prevent recreation
  const toggleAuth = useCallback(() => {
    setIsAuthenticated(prev => {
      const newAuth = !prev;
      // Reset admin mode and clear data on logout
      if (!newAuth) {
        setIsAdminMode(false);
        setCurrentUserEmail(null);
        setPlanData(null);
        setModules([]);
      }
      return newAuth;
    });
  }, []);

  const handlePlanGenerated = useCallback((data, skipCalculations = false) => {
    if (!skipCalculations) {
      setPlanData(data);
    }
    setModules(DEFAULT_MODULES);
    setIsPlanModalOpen(false);
    
    // For admin (skipCalculations), show modules instantly or with minimal delay
    if (skipCalculations) {
      // Skip launch sequence for instant display
      // Modules appear immediately
    } else {
      // Start launch sequence for regular users
      setTimeout(() => {
        startSequence();
      }, 100);
    }
  }, [startSequence]);

  const handleToggleModule = useCallback((module) => {
    setModules(prev => {
      const exists = prev.some(m => m.id === module.id);
      if (exists) {
        return prev.filter(m => m.id !== module.id);
      } else {
        return [...prev, { id: module.id, title: module.title }];
      }
    });
  }, []);

  // Memoized modal handlers
  const openLogin = useCallback(() => setIsLoginOpen(true), []);
  const closeLogin = useCallback(() => setIsLoginOpen(false), []);
  const openSignup = useCallback(() => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  }, []);
  const closeSignup = useCallback(() => setIsSignupOpen(false), []);
  const openPlanModal = useCallback(() => {
    // If admin user, auto-generate plan with hardcoded data (skip calculations)
    if (isAuthenticated && isAdminUser(currentUserEmail)) {
      setIsAdminMode(true);
      handlePlanGenerated(null, true); // Skip calculations, use hardcoded data
    } else {
      // Normal flow - show modal
      setIsAdminMode(false);
      setIsPlanModalOpen(true);
    }
  }, [isAuthenticated, currentUserEmail, handlePlanGenerated]);
  const closePlanModal = useCallback(() => setIsPlanModalOpen(false), []);
  const openAddModules = useCallback(() => setIsAddModulesOpen(true), []);
  const closeAddModules = useCallback(() => setIsAddModulesOpen(false), []);
  
  const handleLoginSuccess = useCallback((email, isAdmin = false) => {
    setIsLoginOpen(false);
    setCurrentUserEmail(email);
    setIsAdminMode(isAdmin);
    toggleAuth();
    
    // If admin, show a brief notification (optional)
    if (isAdmin) {
      console.log('Admin user logged in - Generate Plan will skip calculations and show instant results');
    }
  }, [toggleAuth]);

  const handleSignupSuccess = useCallback(() => {
    setIsSignupOpen(false);
    toggleAuth();
  }, [toggleAuth]);

  const switchToLogin = useCallback(() => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  }, []);

  // Launch sequence animation overlay
  useEffect(() => {
    if (isLaunching) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLaunching]);

  return (
    <div className="min-h-screen flex flex-col bg-space-navy">
      <Header 
        isAuthenticated={isAuthenticated} 
        onLoginClick={openLogin}
        onLogoutClick={toggleAuth}
      />
      
      <main className="flex-grow relative">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Hero onGeneratePlan={openPlanModal} />
                
                {modules.length > 0 && (
                  <>
                    <NavigationBar modules={modules} />
                    <ModuleContainer 
                      modules={modules} 
                      intelligenceData={intelligenceData}
                    />
                  </>
                )}

                {/* Add Modules Button */}
                {modules.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="fixed bottom-8 right-8 z-30"
                  >
                    <Button
                      onClick={openAddModules}
                      variant="primary"
                      className="rounded-full p-4 shadow-lg"
                    >
                      <PlusIcon className="w-6 h-6" />
                    </Button>
                  </motion.div>
                )}
              </>
            } 
          />
        </Routes>

        {/* Launch Sequence Overlay */}
        <AnimatePresence>
          {isLaunching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-space-navy/95 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="mb-8"
                >
                  <h2 className="text-4xl font-bold text-neon-teal mb-4">
                    System {phaseName.charAt(0).toUpperCase() + phaseName.slice(1)}...
                  </h2>
                  <div className="flex items-center justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-neon-teal rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-soft-gray/70 text-sm space-y-2"
                >
                  {phaseName === 'initializing' && <p>Initializing Exam Intelligence Console...</p>}
                  {phaseName === 'analyzing' && <p>Analyzing Exam Parameters...</p>}
                  {phaseName === 'generating' && <p>Generating Priority Indices...</p>}
                  {phaseName === 'ready' && <p>System Ready</p>}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={closeLogin} 
        onSignupClick={openSignup}
        onLoginSuccess={handleLoginSuccess}
      />

      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={closeSignup}
        onLoginClick={switchToLogin}
        onSignupSuccess={handleSignupSuccess}
      />

      <GeneratePlanModal 
        isOpen={isPlanModalOpen}
        onClose={closePlanModal}
        onGenerate={handlePlanGenerated}
      />

      <AddModulesDrawer
        isOpen={isAddModulesOpen}
        onClose={closeAddModules}
        activeModules={modules}
        onToggleModule={handleToggleModule}
      />
    </div>
  );
}

export default App;
