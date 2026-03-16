/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9', // medical-tech cyan
          foreground: '#ecfeff',
        },
        accent: {
          DEFAULT: '#22c55e', // success / confirmation
          foreground: '#f0fdf4',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#fef2f2',
        },
        muted: {
          DEFAULT: '#0f172a',
          foreground: '#9ca3af',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        'soft-elevated': '0 18px 45px rgba(15,23,42,0.35)',
        'soft-card': '0 10px 30px rgba(15,23,42,0.18)',
      },
    },
  },
  plugins: [],
};

