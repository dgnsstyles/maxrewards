/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        secondary: '#22d3ee',
        accent: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif'],
      },
      borderRadius: {
        xl: '1.25rem',
      },
    },
  },
  plugins: [],
};