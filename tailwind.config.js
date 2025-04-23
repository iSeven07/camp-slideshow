/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'html': {
          height: '100%',
        },
        'body': {
          height: '100%',
        },
      })
    }
  ],
}

