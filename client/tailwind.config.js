/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#BC7FCD',
        darkPurple: '#86469C',
        lightPink: '#FFCDEA',
        darkPink: '#FB9AD1',
      }
    },
  },
  plugins: [
        require('flowbite/plugin')
    ]
}