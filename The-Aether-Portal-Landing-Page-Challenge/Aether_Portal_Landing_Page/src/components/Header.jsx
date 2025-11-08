import { motion } from 'framer-motion'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-display font-bold text-white"
          >
            Aether
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              className="text-white/80 hover:text-white transition-colors"
            >
              Features
            </motion.a>
            <motion.a
              href="#testimonials"
              whileHover={{ scale: 1.05 }}
              className="text-white/80 hover:text-white transition-colors"
            >
              Testimonials
            </motion.a>
          </nav>

          {/* Status Indicator */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg glass">
              <div className="w-2 h-2 bg-aether-primary rounded-full animate-pulse" />
              <span className="text-white/80 text-sm">Active • 2024</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

