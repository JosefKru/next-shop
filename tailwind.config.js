/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 5s forwards infinite',
        fadeOut: 'fadeOut 5s forwards infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '25%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '25%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
