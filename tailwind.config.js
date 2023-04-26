/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      ms: "320px",
      mm: "410px",
      ml: "600px",
      t: "768px",
      dxs: "1024px",
      ds: "1240px",
      dm: "1440px",
      dl: "1600px",
      dxl: "1900px",
    },
    colors: {
      // Use this service to name color
      // https://chir.ag/projects/name-that-color
      white: "#ffffff",
      mineShaft: "#2B2B2B",
      sandyBrown: "#F49756",
      grayNickel: "#C9C9C7",
      salmon: "#FF8A71",
      scarlet: "#F31C0E",
      pampas: "#FCFBFA",
      naturalGray: "#91908E",
      transparent: "transparent",
    },
    fontFamily: {
      publicoTextMono: ["Publico Text Mono", "sans-serif"],
      antiqueLegacy: ["Antique Legacy", "sans-serif"],
    },
    extend: {
      boxShadow: {
        card: "0px 2px 0px #E3E2E1, 12px 12px 26px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
