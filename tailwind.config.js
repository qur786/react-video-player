/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "increase-width": "increase-width 1s ease-in",
        position: "position 1s linear",
      },
      keyframes: {
        "increase-width": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        position: {
          "0%": {
            top: -1000,
          },
          "100%": {
            top: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
