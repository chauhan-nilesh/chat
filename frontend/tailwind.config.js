/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orangePrimary: '#FF8C2E', // Orange for accents
        greenPrimary: '#4CD964',  // Light green
        darkText: '#1E1E1E',
        grayBackground: '#F9F9F9',
        lightPurple: '#E3DFF2',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Set Poppins as the default sans font
      },
    },
  },
  plugins: [
    daisyui,
  ],
}

