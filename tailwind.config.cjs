/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    fontFamily:{
      'sans': ['Poppins', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}