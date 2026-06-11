/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        ink: { DEFAULT: '#0C0E12', 2: '#3A3D45', 3: '#7A7F8E', 4: '#B0B5C3' },
        surface: { DEFAULT: '#F7F8FA', 2: '#ECEEF2' },
        brand: { DEFAULT: '#1A56FF', dark: '#1444DD', light: '#EEF2FF' },
        line: 'rgba(12,14,18,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.16,1,0.3,1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16,1,0.3,1)',
        'shimmer': 'shimmer 1.5s infinite',
        'pulse-dot': 'pulseDot 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-12px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.4' } },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(12,14,18,0.06), 0 1px 2px rgba(12,14,18,0.04)',
        'modal': '0 20px 60px rgba(12,14,18,0.15), 0 4px 16px rgba(12,14,18,0.08)',
        'focus': '0 0 0 3px rgba(26,86,255,0.15)',
      },
    },
  },
  plugins: [],
}
