/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ must include all src files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
