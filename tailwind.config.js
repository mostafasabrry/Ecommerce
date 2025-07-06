/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F8F9FA',
          dark: '#21242a',
        },
        background: {
          DEFAULT: 'white',
          dark: '#272B34',
        },
        text1: {
          DEFAULT: '#1A5076',
          dark: '#7777bd',
        },
        text2: {
          DEFAULT: '#919395',
          dark: 'white',
        },
        btn: {
          DEFAULT: '#1C8ADB',
          dark: '#1C8ADB',
        },
        Hoverbtn: {
          DEFAULT: '#0D6EFD',
          dark: '#0D6EFD',
        },
        star: {
          DEFAULT: '#FDE047',
        },
        cartbg: {
          DEFAULT: colors.blue[100], // استخدام color من tailwind
        },
        border1: {
          DEFAULT: '#2671a3',
          dark: '#133c56',
        },
        borderhover: {
          DEFAULT: '#1C8ADB',
          dark: '#3b5465',
        },
        rating: {
          DEFAULT: '#BFDBFE',
          dark: '#BFDBFE',
        }
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
  darkMode: "selector"
};

