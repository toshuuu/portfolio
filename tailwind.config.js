/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        light: {
          bg: '#F5F5F0',
          surface: '#EBEBE6',
          surfaceHover: '#E0E0DB',
          text: '#1A1A1A',
          textMuted: '#666666',
          border: '#D1D1CB',
        },
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          surfaceHover: '#2A2A2A',
          text: '#F5F5F0',
          textMuted: '#A3A3A3',
          border: '#333333',
        },
        accent: '#5E5E5E',
      },
      boxShadow: {
        'neumorphic-light-rest': '4px 4px 10px #d6d6d2, -4px -4px 10px #ffffff',
        'neumorphic-light-hover': '6px 6px 12px #c9c9c5, -6px -6px 12px #ffffff',
        'neumorphic-light-pressed': 'inset 4px 4px 8px #d6d6d2, inset -4px -4px 8px #ffffff',
        'neumorphic-dark-rest': '4px 4px 10px #0a0a0a, -4px -4px 10px #1a1a1a',
        'neumorphic-dark-hover': '6px 6px 12px #080808, -6px -6px 12px #1c1c1c',
        'neumorphic-dark-pressed': 'inset 4px 4px 8px #0a0a0a, inset -4px -4px 8px #1a1a1a',
      }
    },
  },
  plugins: [],
}
