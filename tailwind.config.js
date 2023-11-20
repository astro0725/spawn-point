/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/partials/*.handlebars', './views/*.handlebars'],
  theme: {
    extend: {
      fontFamily: {
        'press-start':['"Press Start 2P"']
      },
      colors: {
        "bg-dark": "#21262a",
        "light-blue": "#a5dbff",
        purple: "#7d1399",
        "neon-pink": "#eb7dff",
        pink: "#ffa7bb",
        yellow: "#ffe400",
        cream: "#fde8da",
      }
    },
  },
  plugins: [],
}

