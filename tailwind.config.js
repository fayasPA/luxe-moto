/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['Noto Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        josefin: ['Montserrat', 'sans-serif'],
        dmSand: ['DM Sand', 'sans-serif'],
        babylon: ['Babylon', 'sans-serif'],
      },
      colors: {
        red: "red",
        green: {
          DEFAULT: "#00693E",
          100: "#228B22",
          200: "#018749",
          300: "#50C878",
          400: "#778464",
          500: "#abd373",
          body: '#18392B',
          luxe: '#054e20',
        },
        white: {
          DEFAULT: "#FFFFFF",
          100: "#FAF9F6",
          200: "#F9F6EE",
        },
        borderColor: "#ffffff59",
        borderColor2: "#ffffffce",
        zinc: "#101010",
      },
    },
  },
  plugins: [],
}

