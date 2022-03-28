module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  theme: {
      extend: {
        screens: {
          'xs': '500px',
        },
      }
  },
  plugins: [
  ],
}
