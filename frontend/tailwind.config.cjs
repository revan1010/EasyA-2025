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
          DEFAULT: '#FF3B9A', // Vibrant neon pink
          dark: '#D11277',
          light: '#FF71B6',
        },
        secondary: {
          DEFAULT: '#7B3FE4', // Electric purple
          dark: '#5C2DB3',
          light: '#9E6FFF',
        },
        background: {
          DEFAULT: '#0A0B0D', // Dark base
          light: '#13151A', // Slightly lighter dark
          card: '#1C1E24', // Card background
          gradient: {
            from: '#1A1C23',
            to: '#0F1115',
          }
        },
        accent: {
          blue: '#2D9CDB', // Electric blue
          'blue-dark': '#1A7DB4',
          'blue-light': '#5BB8ED',
          green: '#00FFA3', // Neon green
          'green-dark': '#00CC82',
          'green-light': '#33FFB8',
          yellow: '#FFB800', // Bright yellow
          'yellow-dark': '#CC9300',
          'yellow-light': '#FFCC40',
          red: '#FF4B4B', // Bright red
          'red-dark': '#CC3C3C',
          'red-light': '#FF7373',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          muted: '#71717A',
        },
        border: {
          DEFAULT: '#27272A',
          light: '#3F3F46',
          glow: {
            primary: 'rgba(255, 59, 154, 0.2)',
            secondary: 'rgba(123, 63, 228, 0.2)',
            green: 'rgba(0, 255, 163, 0.2)',
            red: 'rgba(255, 75, 75, 0.2)',
            yellow: 'rgba(255, 184, 0, 0.2)',
          }
        },
      },
      backgroundImage: {
        'gradient-card': 'linear-gradient(180deg, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)',
        'gradient-card-hover': 'linear-gradient(180deg, var(--tw-gradient-from) -20%, var(--tw-gradient-to) 120%)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 