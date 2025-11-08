import { motion } from 'framer-motion'
import { useState } from 'react'
import Lottie from 'lottie-react'
import heroAnimation from '../assets/hero-animation.json'

const Hero = () => {
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Neural network background pattern */}
      <div className="absolute inset-0 neural-network z-[1]" />

      {/* Wave-like particle background */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        <div className="absolute inset-0 particle-waves" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-aether-darker/90 via-aether-dark/80 to-aether-darker/90 z-[1]" />

      {/* Geometric glowing shapes */}
      <div className="absolute bottom-0 right-0 w-96 h-96 geometric-shape opacity-30 z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Pre-heading */}
            <motion.p
              className="text-aether-primary text-sm uppercase tracking-wider font-semibold"
              variants={itemVariants}
            >
              Next-Generation AI System
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight"
              variants={itemVariants}
            >
              Experience the Future of{' '}
              <span className="text-gradient">Artificial Intelligence</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl"
              variants={itemVariants}
            >
              Unlock unlimited potential with cutting-edge technology designed for tomorrow. 
              Join thousands of innovators transforming their workflows with Aether's 
              advanced AI capabilities.
            </motion.p>

            {/* Prominent Opaque CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => {
                  setIsLogin(true)
                  setShowLoginForm(true)
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 217, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-aether-darker font-bold rounded-lg 
                         text-lg hover:bg-gray-100 transition-all duration-300
                         relative overflow-hidden group shadow-2xl"
              >
                <span className="relative z-10">Login</span>
                <motion.div
                  className="absolute inset-0 bg-aether-primary opacity-0 group-hover:opacity-10"
                  initial={false}
                  whileHover={{ opacity: 0.1 }}
                />
              </motion.button>

              <motion.button
                onClick={() => {
                  setIsLogin(false)
                  setShowLoginForm(true)
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 217, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-aether-primary text-aether-darker font-bold rounded-lg 
                         text-lg hover:bg-aether-primary/90 transition-all duration-300
                         relative overflow-hidden group shadow-2xl"
              >
                <span className="relative z-10">Sign Up</span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                  initial={false}
                  whileHover={{ opacity: 0.2 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Lottie Animation */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] relative">
              <Lottie
                animationData={heroAnimation}
                loop={true}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-aether-primary rounded-full opacity-20 blur-3xl animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Login Form Modal */}
      {showLoginForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowLoginForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-2xl">
                {/* Form Title */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-display font-bold text-aether-darker">
                    {isLogin ? 'Login' : 'Sign Up'}
                  </h2>
                  <button
                    onClick={() => setShowLoginForm(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isLogin
                        ? 'bg-aether-primary text-aether-darker'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      !isLogin
                        ? 'bg-aether-primary text-aether-darker'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form Fields */}
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg 
                               text-gray-900 placeholder-gray-400 focus:outline-none focus:border-aether-primary 
                               focus:ring-2 focus:ring-aether-primary/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-2 font-medium">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg 
                               text-gray-900 placeholder-gray-400 focus:outline-none focus:border-aether-primary 
                               focus:ring-2 focus:ring-aether-primary/50 transition-all"
                    />
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-gray-700 text-sm mb-2 font-medium">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg 
                                 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-aether-primary 
                                 focus:ring-2 focus:ring-aether-primary/50 transition-all"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 rounded border-gray-300 bg-gray-50 text-aether-primary 
                               focus:ring-aether-primary focus:ring-2"
                    />
                    <label htmlFor="remember" className="text-gray-600 text-sm">
                      Remember me
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 217, 255, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-aether-primary text-aether-darker font-semibold rounded-lg 
                             hover:bg-aether-primary/90 transition-all duration-300 mt-4"
                  >
                    {isLogin ? 'Login' : 'Sign Up'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
    </section>
  )
}

export default Hero
