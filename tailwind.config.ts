import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F5F0E8",
        "parchment-dark": "#E8E0D0",
        wire: "#8B7355",
        "ink-dark": "#2C1810",
        ink: "#4A3728",
        "ink-light": "#7A6555",
        bereshit: "#C4956A",
        shemot: "#7A9E7E",
        vayikra: "#8B7355",
        bamidbar: "#B8860B",
        devarim: "#6B8CAE",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
