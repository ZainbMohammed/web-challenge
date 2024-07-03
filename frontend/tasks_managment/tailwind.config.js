/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors in the project
      colors:{
        primary : "#2B85FF",
        secondary : "#EF863E"
      }
    },
  },
  plugins: [],
}

