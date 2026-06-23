/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          300: '#DFC16A',
          400: '#C9A84C', // Champagne Gold
          500: '#B8942E',
          600: '#9A7A1F',
        },
        secondary: {
          300: '#E8D9A0',
          400: '#D4C078',
          500: '#C9A84C', // Gold secondary
          600: '#A88B30',
        },
        accent: {
          400: '#F5E6B8',
          500: '#E8D5A0', // Warm ivory accent
          600: '#D4C088',
        },
        dark: {
          50: '#FAF8F5',  // Ivory
          100: '#F0ECE3',
          200: '#E0D8C8',
          300: '#C8BEA8',
          400: '#8A8078', // Muted text
          500: '#5A5248',
          600: '#3A3430',
          700: '#1E1C1A',
          800: '#151412',
          850: '#11100E',
          900: '#0D0D12', // Obsidian surface
          950: '#08080C', // Deep obsidian background
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        bounceDot: {
          '0%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
