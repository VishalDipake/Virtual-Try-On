/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{jsx,js}', './components/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors: {
        accent: '#7C3AED',
        background: '#0f0f0f',
        card: '#1a1a1a',
        foreground: '#f5f5f5',
        border: '#2a2a2a'
      }
    }
  },
  plugins: []
}


