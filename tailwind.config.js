/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./presets/**/*.{js,vue,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin({
      datatables: true
    }),
    require('tailwindcss-primeui')
  ],
  darkMode: 'class',
}

