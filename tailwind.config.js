/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        redHat: ['RedHat', 'sans-serif'],
        redHatItalic: ['RedHat-Italic', 'sans-serif'],
        redHatBold: ['RedHat-bold', 'sans-serif'],
      },
      screens: {
        xs: '448px', // Custom xs breakpoint
      },
    },
  },
  plugins: [],
}