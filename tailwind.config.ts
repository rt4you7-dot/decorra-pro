import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        heebo: ["var(--font-heebo)", "Heebo", "Arial", "sans-serif"],
      },
      colors: {
        brand: {
          plum: "#6B1A47",
          plumDark: "#4E1235",
          plumDeep: "#3A0E2A",
          pink: "#F9D0CF",
          cream: "#FAF6F0",
          text: "#1A1218",
          textSoft: "#5A3F50",
          border: "#E8DDD0",
        },
      },
    },
  },
  plugins: [],
};

export default config;
