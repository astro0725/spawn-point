/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/partials/*.handlebars", "./views/*.handlebars"],
  theme: {
    extend: {
      spacing: {
        '7.5': '30px',
      },
      width: {
        '260': '260px',
      },
      fontFamily: {
        "press-start": ['"Press Start 2P"'],
        "dm-sans": ['"DM Sans"', 'sans-serif'],
        "source-sans": ['"Source Sans Pro"', 'sans-serif'],
      },
      colors: {
        acf: "#9c9cab",
        side: "#5c5e6e",
        bcc: "#272a3a",
        dark: "#21262a",
        "dark-purple": "#512a8e",
        "light-blue": "#a5dbff",
        purple: "#7d1399",
        "neon-pink": "#eb7dff",
        pink: "#ffa7bb",
        yellow: "#ffe400",
        cream: "#fde8da",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
