/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf4e6',
          200: '#bce9d0',
          300: '#88d8b1',
          400: '#4dc390',
          500: '#25a971',
          600: '#1a8a5c',
          700: '#176e4c',
          800: '#15583e',
          900: '#134935',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}