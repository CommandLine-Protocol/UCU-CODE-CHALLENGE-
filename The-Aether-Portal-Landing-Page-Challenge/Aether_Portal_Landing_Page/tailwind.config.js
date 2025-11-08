/** @type {import('tailwindcss').Config} */
// Tailwind CSS v4 uses CSS-first configuration via @theme in CSS files
// This config file is kept for compatibility but most configuration
// should be done in src/index.css using @theme directive
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}
