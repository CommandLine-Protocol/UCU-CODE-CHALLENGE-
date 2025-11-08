import { motion } from 'framer-motion'
import { useState } from 'react'

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true)

  const formVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  return (
    <motion.div
      className="w-full max-w-md"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="glass-strong rounded-2xl p-8 backdrop-blur-xl border border-white/20 shadow-2xl">
        {/* Form Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-white mb-2">
            Login / Signup
          </h2>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-aether-primary text-aether-darker'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-aether-primary text-aether-darker'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                       text-white placeholder-white/40 focus:outline-none focus:border-aether-primary 
                       focus:ring-2 focus:ring-aether-primary/50 transition-all backdrop-blur-sm"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                       text-white placeholder-white/40 focus:outline-none focus:border-aether-primary 
                       focus:ring-2 focus:ring-aether-primary/50 transition-all backdrop-blur-sm"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-white/80 text-sm mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-white/40 focus:outline-none focus:border-aether-primary 
                         focus:ring-2 focus:ring-aether-primary/50 transition-all backdrop-blur-sm"
              />
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-aether-primary 
                       focus:ring-aether-primary focus:ring-2"
            />
            <label htmlFor="remember" className="text-white/60 text-sm">
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
  )
}

export default LoginForm


