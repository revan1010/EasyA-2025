/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E6007A', // Polkadot pink
          dark: '#B30062',
        },
        secondary: {
          DEFAULT: '#552BBF', // Polkadot purple
          dark: '#3D1F8C',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 