/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/main.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      screens: {
        'sm': '476px',
        // => @media (min-width: 576px) { ... }
  
        'md': '760px',
        // => @media (min-width: 960px) { ... }
  
        'lg': '1440px',
        // => @media (min-width: 1440px) { ... }
      },

      colors: {
        primary: '#010010',
        red:'hsl(14, 86%, 42%)',
        green: 'hsl(159, 69%, 38%)',
        rose50: 'hsl(20, 50%, 98%)',
        rose100: 'hsl(13, 31%, 94%)',
        rose300: 'hsl(14, 25%, 72%)',
        rose400: 'hsl(7, 20%, 60%)',
        rose500: 'hsl(12, 20%, 44%)',
        rose900: 'hsl(14, 65%, 9%)',
      },

      fontFamily: {
        redhat: ['Red Hat Text']
      },
    },
  },
  plugins: [],
}

