import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import marketingVideo from '../assets/marketing.mp4'

const Features = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Process complex AI operations in milliseconds with our optimized neural architecture.',
      color: 'from-aether-primary to-cyan-500',
    },
    {
      icon: '🔮',
      title: 'Predictive Intelligence',
      description: 'Anticipate needs and deliver insights before you even ask with advanced ML algorithms.',
      color: 'from-aether-secondary to-purple-500',
    },
    {
      icon: '🌌',
      title: 'Infinite Scalability',
      description: 'Grow without limits. Our infrastructure adapts to your needs, from startup to enterprise.',
      color: 'from-aether-accent to-pink-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  return (
    <section
      id="features"
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-aether-dark"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div>
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white">
                <span className="text-gradient">Powerful Features</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-xl">
                Built for the future, designed for today
              </p>
            </motion.div>

            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-aether-darker/50 glass border border-white/10 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:shadow-xl hover:border-white/20 transition-all duration-300"
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    <motion.div
                      className="text-4xl flex-shrink-0"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>

                    <div>
                      <h3 className="text-xl font-display font-semibold mb-2 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>

                    {/* Animated border */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 blur-xl`}
                      initial={false}
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Marketing Video */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src={marketingVideo} type="video/mp4" />
              </video>
              {/* Subtle overlay for better integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-aether-dark/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Features
