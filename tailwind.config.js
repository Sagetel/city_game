/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        0.75: '0.1875rem', 
        1.25: '0.3125rem', 
        1.1: '1.0625rem', 
        13: '3.25rem',
      },
      screens: {
        'sm': '640px',
        'lg': '540px',
        'md': '400px',
      }
    },
  },
  plugins: [],
}
