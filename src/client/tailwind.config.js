/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  important: true,
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        button: ["Bebas Neue", "cursive", "sans-serif"],
      },
      backgroundImage: {
        "login-background": "url('/src/assets/images/background_login.jpg')",
      },
    },
  },
  plugins: [theme()],
};

function theme() {
  return plugin(function ({ addComponents, theme }) {
    addComponents({
      ...app(theme),
      ...card(theme),
      ...navBar(theme),
      ...table(theme),
    });
  });
}

const app = (theme) => ({
  ".App": {
    paddingTop: "5rem",
  },
});

const navBar = (theme) => ({
  ".menu-nav": {
    width: "100%",
    backgroundColor: "rgba(0,0,0, 0.75)",
    color: "white",
    overflowY: "scroll",
    listStyle: "none",
    overflow: "hidden",
    maxWidth: "290px",
    zIndex: 9,
    display: "none",
    ".menu-item": {
      color: "white",
      width: "100%",
    },
    ".menu-item:hover": {
      color: "#CD0574",
    },
  },

  ".show-menu": {
    display: "block",
  },
});

const card = (theme) => ({
  ".card": {
    position: "relative",
    ".trash-icon": {
      position: "absolute",
      top: 15,
      left: 15,
      opacity: 0,
    },
  },
  ".card:hover": {
    ".trash-icon": {
      opacity: 1,
    },
  },
});

const table = (theme) => ({
  ".table": {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    thead: {
      th: {
        borderWidth: 2,
        borderColor: "black",
      },
    },
    tbody: {
      td: {
        borderWidth: 2,
        borderColor: "black",
      },
    },
  },
});
