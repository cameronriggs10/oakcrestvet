import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, caring veterinary brand colors
        primary: {
          50: '#f0f7f4',
          100: '#dcefe3',
          200: '#bae0c8',
          300: '#8ecaa7',
          400: '#5faf82',
          500: '#3d9368',
          600: '#2d7753',
          700: '#265f44',
          800: '#214c38',
          900: '#1c3f2f',
          950: '#0e231a',
        },
        accent: {
          50: '#fef6f0',
          100: '#fdeada',
          200: '#fad1b3',
          300: '#f6b183',
          400: '#f18852',
          500: '#ee6b2e',
          600: '#df5323',
          700: '#b93f1e',
          800: '#933420',
          900: '#772e1d',
          950: '#40150d',
        },
        warm: {
          50: '#fefcfb',
          100: '#fef7f2',
          200: '#fdedd9',
          300: '#fbdcb5',
          400: '#f8c287',
          500: '#f4a35a',
          600: '#f08a3a',
          700: '#e07228',
          800: '#b95b22',
          900: '#944b1f',
          950: '#4e250e',
        },
        cream: {
          50: '#fefcf8',
          100: '#fef7ed',
          200: '#fcedc8',
          300: '#f9dd9e',
          400: '#f5c86a',
          500: '#f1b33e',
          600: '#eb9c23',
          700: '#c77d1a',
          800: '#9e631c',
          900: '#7f511b',
          950: '#442a0b',
        },
        sage: {
          50: '#f6f7f4',
          100: '#e3e7dd',
          200: '#c7cfbb',
          300: '#a5b291',
          400: '#86996c',
          500: '#6b7d53',
          600: '#546340',
          700: '#434f34',
          800: '#38412c',
          900: '#303727',
          950: '#181d12',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
