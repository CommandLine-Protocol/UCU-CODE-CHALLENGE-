import { motion } from 'framer-motion';
import Button from './UI/Button';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

/**
 * Hero section with animated background and main CTA
 */
const Hero = ({ onGeneratePlan }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(41,230,210,0.15)_0%,_rgba(0,0,0,0)_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(43,157,255,0.1)_0%,_rgba(0,0,0,0)_50%)]"></div>
        
        {/* Particle effect simulation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-teal rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-teal via-electric-blue to-neon-teal bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Exam Intelligence Console
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-soft-gray mb-12 max-w-3xl mx-auto italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Rewrite the science of last-minute studying.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              onClick={onGeneratePlan}
              variant="primary"
              className="px-8 py-4 text-lg group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <RocketLaunchIcon className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                Generate Plan
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neon-teal to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
