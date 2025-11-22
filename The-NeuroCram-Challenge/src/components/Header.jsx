import { motion } from 'framer-motion';
import Button from './UI/Button';

/**
 * Header component - Transparent overlay with logo and login button
 */
const Header = ({ isAuthenticated, onLoginClick, onLogoutClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-neon-teal to-electric-blue bg-clip-text text-transparent">
              NeuroCram
            </span>
          </motion.div>

          {/* Login Button */}
          {isAuthenticated ? (
            <Button 
              onClick={onLogoutClick}
              variant="secondary"
            >
              Logout
            </Button>
          ) : (
            <Button 
              onClick={onLoginClick}
              variant="primary"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
