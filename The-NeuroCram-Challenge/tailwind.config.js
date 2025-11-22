/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-navy': '#0B0F17',
        'neon-teal': '#29E6D2',
        'electric-blue': '#2B9DFF',
        'infrared': '#FF4A3D',
        'graphite': '#1E1E26',
        'soft-gray': '#B9B9C9',
      },
      fontFamily: {
        'sans': ['Orbitron', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
