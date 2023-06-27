/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './stories/**/*.{js,jsx,stories.js,stories.jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
      },
      // animation: {
      //   fadeIn: 'fadeIn 1s ease-in-out infinite',
      //   fadeOut: 'fadeOut 1s ease-in-out infinite',
      // },
      // keyframes: {
      //   fadeIn: {
      //     '0%': { opacity: '0' },
      //     '25%': { opacity: '1' },
      //     '100%': { opacity: '1' },
      //   },
      //   fadeOut: {
      //     '0%': { opacity: '1' },
      //     '25%': { opacity: '0' },
      //     '100%': { opacity: '0' },
      //   },
      // },
    },
  },
  plugins: [],
}
