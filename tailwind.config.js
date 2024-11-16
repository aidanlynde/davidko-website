/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Scan files in the `app` directory
    "./src/components/**/*.{js,ts,jsx,tsx}", // Scan files in the `components` directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
