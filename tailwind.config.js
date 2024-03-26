/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        Black: "#1E2832",
        primaryBG: "#1e28320d",
      },
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: ["node", "flowbite/plugin"],
  rules: {
    // Các quy tắc của bạn
  },
};
