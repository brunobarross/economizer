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
    extend: {
       colors: {
        'primary-pure': '#44BBA4',
        'primary-dark': '#36A38D',
        'secondary': '#E7BB41',
        'tertiary': '#D3D0CB',
        'neutral-100' : '#393E41'
       },
       boxShadow:{
        'sm-custom': '0px 1px 2px rgba(0, 0, 0, 0.06)'
       }
    
    },
  },
  plugins: [],
}