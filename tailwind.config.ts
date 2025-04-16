import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          100: '#E3F2FD',
          200: '#BBDEFB',
          300: '#90CAF9',
          400: '#64B5F6',
          500: '#357EA5',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
        secondary: {
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212529',
        },
        accent: {
          100: '#E8F5E9',
          200: '#C8E6C9',
          300: '#A5D6A7',
          400: '#81C784',
          500: '#66BB6A',
          600: '#4CAF50',
          700: '#43A047',
          800: '#388E3C',
          900: '#2E7D32',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
