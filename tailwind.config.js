/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens: {
        phone: "325px",
        tablet: "640px",
        desktop: "1024px",
      },
    },
  },
  plugins: [],
}

