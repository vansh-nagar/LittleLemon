/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"'],
      },
      colors: {
        main1: '#495e57',
        main2: '#f4ce14',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
};
