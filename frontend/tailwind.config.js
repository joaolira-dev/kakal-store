/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        kakal: {
          pink: '#ff3f6c',
          blush: '#ffe8ef',
          ink: '#111827',
          blue: '#0ea5c6',
          green: '#22c55e',
          yellow: '#ffd91a',
          lilac: '#f4efff',
          cream: '#fffaf3',
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 35px rgba(82, 47, 57, .08)',
      },
    },
  },
  plugins: [],
};
