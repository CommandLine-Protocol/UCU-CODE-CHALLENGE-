import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

function App() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate particles for wave-like background effect
    const particleCount = 100
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      bottom: -10 - Math.random() * 20,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-aether-darker">
      {/* Wave-like particle background */}
      <div className="particles-wave">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle-wave"
            style={{
              left: `${particle.left}%`,
              bottom: `${particle.bottom}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              '--duration': `${particle.duration}s`,
              '--delay': `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <Testimonials />
        <Footer />
      </div>
    </div>
  )
}

export default App

