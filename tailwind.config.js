/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // Use this service to name color
      // https://chir.ag/projects/name-that-color
      white: "#ffffff",
      mineShaft: "#2B2B2B",
      sandyBrown: "#F49756",
      grayNickel: "#C9C9C7",
      transparent: "transparent",
    },
    fontFamily: {
      publicoTextMono: ["Publico Text Mono", "sans-serif"],
      antiqueLegacy: ["Antique Legacy", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
