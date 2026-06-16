import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xp: {
          blue: "#0058A8",
          titlebar: "#0A246A",
          titlebar2: "#A6CAF0",
          gray: "#ECE9D8",
          border: "#919B9C",
          green: "#3A6629",
          taskbar: "#245EDC",
          start: "#388239",
          startHover: "#49A34B",
          text: "#1F1F1F",
          highlight: "#316AC5",
          desktop: "#3A6EA5",
        },
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", "monospace"],
        tahoma: ["Tahoma", "Geneva", "sans-serif"],
        verdana: ["Verdana", "Geneva", "sans-serif"],
      },
      boxShadow: {
        xp: "inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #fff",
        "xp-button": "inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px gray, inset 2px 2px silver",
        "xp-inset": "inset 1px 1px #808080, inset -1px -1px #fff",
        "xp-window": "2px 2px 8px rgba(0,0,0,0.5), inset 0 0 0 1px #0A246A",
      },
    },
  },
  plugins: [],
};

export default config;