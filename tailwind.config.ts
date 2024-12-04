import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%': { opacity: '1' },
          '10%': { opacity: '1' },
          '20%': { opacity: '1' },
          '30%': { opacity: '1' },
          '40%': { opacity: '1' },
          '45%': { opacity: '0.75' },
          '50%': { opacity: '0.5' },
          '55%': { opacity: '0.25' },
          '60%': { opacity: '0' },
          '70%': { opacity: '0' },
          '80%': { opacity: '0' },
          '90%': { opacity: '0.25' },
          '95%': { opacity: '0.75' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;