import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

// Import testimonial images
import sarahChenImage from '../assets/testimonials/sarah-chen.png'
import marcusRodriguezImage from '../assets/testimonials/marcus-rodriguez.png'
import elenaVolkovImage from '../assets/testimonials/elena-valkov.png'

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'AI Research Director',
      company: 'TechCorp',
      quote: 'Aether has revolutionized how we approach AI development. The speed and accuracy are unmatched.',
      avatar: sarahChenImage,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      company: 'InnovateLabs',
      quote: 'The predictive capabilities of Aether have given us a competitive edge we never thought possible.',
      avatar: marcusRodriguezImage,
    },
    {
      name: 'Elena Volkov',
      role: 'Data Scientist',
      company: 'FutureSystems',
      quote: 'Working with Aether feels like having a supercomputer that understands context and nuance.',
      avatar: elenaVolkovImage,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-aether-dark"
    >
      {/* Asymmetric background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-aether-primary opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-aether-secondary opacity-5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white">
            <span className="text-gradient">Trusted by Leaders</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See what industry experts are saying about Aether
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-aether-darker/50 glass border border-white/10 rounded-2xl p-8 relative overflow-hidden group shadow-lg hover:shadow-xl hover:border-white/20 transition-all duration-300"
              style={{
                perspective: '1000px',
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-6xl text-aether-primary opacity-10">
                "
              </div>

              <div className="relative z-10">
                <p className="text-gray-200 text-lg mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-aether-primary/30 shadow-md group-hover:border-aether-primary/60 transition-all duration-300"
                      onError={(e) => {
                        // Fallback to gradient avatar if image fails to load
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = `
                          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-aether-primary to-aether-secondary flex items-center justify-center text-white font-bold text-xl shadow-md">
                            ${testimonial.name.charAt(0)}
                          </div>
                        `
                      }}
                    />
                    <div className="absolute inset-0 rounded-full bg-aether-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-aether-primary/10 to-aether-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action at bottom */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 217, 255, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-aether-primary to-aether-secondary 
                     text-white font-semibold rounded-lg text-lg hover:opacity-90 
                     transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Join the Revolution</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
              initial={false}
              whileHover={{ opacity: 0.2 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
