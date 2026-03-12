/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      indigo: {
        50: '#f0f2ff',
        100: '#e5e7ff',
        600: '#5c6aff',
        700: '#4c5ae8',
      },
      blue: {
        50: '#f0f7ff',
        100: '#e0efff',
        500: '#3b82f6',
        600: '#2563eb',
      },
      gray: {
        300: '#d1d5db',
        500: '#6b7280',
      },
      white: '#ffffff',
    },
  },
}
