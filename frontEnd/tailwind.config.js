/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#0F18BF",
        secondary: "#141873",
        dark: "#010326",
        light: "#F2F2F2",
        grayCustom: "#3F403B",
      },
    },
  },

  plugins: [],
};