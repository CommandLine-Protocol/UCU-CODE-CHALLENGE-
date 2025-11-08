import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="relative bg-aether-darker border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left - Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gray-300 leading-relaxed"
          >
            <p className="text-lg">
              The leading global developer of proprietary AI systems. Aether AI is building the future of intelligence, 
              backed by a world-class team and fostering tech leadership from our centers in Africa to the world.
            </p>
          </motion.div>

          {/* Right - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start md:items-end gap-4"
          >
            <div>
              <p className="text-gray-400 text-sm mb-2">Find out how to contribute</p>
              <a
                href="mailto:contribute@aether.ai"
                className="text-aether-primary hover:text-aether-primary/80 transition-colors text-lg font-semibold flex items-center gap-2 group"
              >
                <span>contribute@aether.ai</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Aether AI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer


