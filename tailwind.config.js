/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./js/**/*.js"
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        "navy-dark": "#111827",
        "navy-medium": "#1F2937",
        "accent-blue": "#3B82F6",
        "accent-orange": "#F97316",
        "text-light": "#D1D5DB",
        "text-white": "#FFFFFF"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};