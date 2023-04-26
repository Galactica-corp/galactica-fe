/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      ms: '320px',
      mm: '410px',
      ml: '600px',
      t: '768px',
      dxs: '1024px',
      ds: '1240px',
      dm: '1440px',
      dl: '1600px',
      dxl: '1900px',
    },
    colors: {
      // Use this service to name color
      // https://chir.ag/projects/name-that-color
      white: "#ffffff",
      mineShaft: "#2B2B2B",
      sandyBrown: "#F49756",
      grayNickel: "#C9C9C7",
      salmon: '#FF8A71',
      scarlet: '#F31C0E',
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
