/** @type {import('tailwindcss').Config} */
import animatePlugin from 'tailwindcss-animate'

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a5f3f',
          dark: '#0f3d28',
          light: '#2d7a56',
        },
        accent: {
          DEFAULT: '#d97757',
          light: '#e89b7f',
        },
        cream: '#f5f1e8',
        charcoal: '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [animatePlugin],
}
