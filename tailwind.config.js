/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'vennd': {
          primary: '#0F4C81',
          secondary: '#1A73E8',
          accent: '#00A3FF',
          light: '#E8F0FE',
          dark: '#1E3A8A'
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out'
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        slideUp: {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      }
    }
  },
  plugins: [],
};