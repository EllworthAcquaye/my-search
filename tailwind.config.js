/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'cee-primary': '#21A8DE',
        'cee-secondary': '#4EB9E4',
      },
    },
    fontFamily: {
      inter: ['Inter'],
    },
  },
  plugins: [
    // ...
  ],
};
