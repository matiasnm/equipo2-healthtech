/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        sans: ['Poppins', 'Montserrat', 'sans-serif'],
      },
    },
  },
  safelist: [
  "bg-gradient-cardiología",
  "bg-gradient-neurología",
  "bg-gradient-gastroenterología",
  "bg-gradient-dermatología",
  "bg-gradient-psiquiatría",
  "bg-gradient-nefrología",
  "bg-gradient-pediatría",
  "bg-gradient-ginecología",
  "bg-gradient-traumatología",
  "bg-gradient-oftalmología",
  "bg-gradient-endocrinología"
],
  plugins: [],
};
