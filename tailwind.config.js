/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16a34a', // 绿色主题色
        'primary-50': '#f0fdf4',
        'primary-100': '#dcfce7',
        'primary-200': '#bbf7d0',
        'primary-300': '#86efac',
        'primary-400': '#4ade80',
        'primary-500': '#22c55e',
        'primary-600': '#16a34a',
        'primary-700': '#15803d',
        'primary-800': '#166534',
        'primary-900': '#14532d',
        natural: {
          50: '#fefefe',
          100: '#fdfdfd',
          200: '#f8f8f8',
          300: '#f0f0f0',
          400: '#e0e0e0',
          500: '#c0c0c0',
          600: '#8a8a8a',
          700: '#5a5a5a',
          800: '#3a3a3a',
          900: '#1a1a1a',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 