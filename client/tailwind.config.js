/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e3d8e4",
        secondary: "#e0ebea",
        tertiary: "#b0a3d4",
        title: "#7d80da",
      },
      fontFamily: {
        title: ['"Shantell Sans"', "cursive"],
      },
    },
  },
  plugins: [],
};
