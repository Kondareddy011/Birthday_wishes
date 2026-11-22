/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
        },
        festive: {
          purple: '#8B5CF6',
          pink: '#EC4899',
          rose: '#F43F5E',
          cyan: '#06B6D4',
          amber: '#F59E0B',
        }
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'confetti-fall': 'confettiFall 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(236, 72, 153, 0.5))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.8))' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'glow-pink': '0 0 25px -5px rgba(236, 72, 153, 0.5)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.5)',
        'glow-gold': '0 0 30px -5px rgba(234, 179, 8, 0.6)',
        '3d-card': '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.1) inset',
        '3d-gift': '0 30px 60px -12px rgba(0, 0, 0, 0.7), 0 0 35px 2px rgba(236, 72, 153, 0.35)',
      }
    },
  },
  plugins: [],
}

