/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4ade80',
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        secondary: {
          light: '#93c5fd',
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        background: {
          light: '#f9fafb',
          dark: '#111827',
        },
        surface: {
          light: '#ffffff',
          dark: '#1f2937',
        },
        text: {
          light: '#111827',
          dark: '#f9fafb',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
