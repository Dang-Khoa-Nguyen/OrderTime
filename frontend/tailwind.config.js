/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      keyframes: {
        speaking: {
        "0%, 100%": { color: "#ffffff" },
        "50%": { color: "#3b82f6" }
      }
    },
      animation: {
        speaking: "speaking 1s ease-in-out infinite"
      }
    },
  },
  plugins: [],
};