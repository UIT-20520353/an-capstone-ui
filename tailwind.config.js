/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": {
          1: "#c20000",
          2: "#e3051c",
        },
        "custom-green": {
          1: "#43a047",
        },
      },
    },
  },
  plugins: [],
};
