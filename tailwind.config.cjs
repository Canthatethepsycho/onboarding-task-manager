module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646cff'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
