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
        // Paleta 1: Executivo Navy
        navy: {
          bg: '#060b19',
          card: '#0d152a',
          border: '#1a2a4a',
          accent: '#00d4ff',
          accentDim: '#00d4ff33',
          text: '#e8f0fe',
          textMuted: '#88a0c8',
        },
        // Paleta 2: Roxo Neon
        neon: {
          bg: '#0d071a',
          card: '#1a0d2e',
          border: '#2d1b4e',
          accent: '#bc6cff',
          accentDim: '#bc6cff33',
          text: '#f0e0ff',
          textMuted: '#b890d8',
        },
        // Paleta 3: Esmeralda BI
        emerald: {
          bg: '#041410',
          card: '#08241c',
          border: '#0f3d2e',
          accent: '#00ff88',
          accentDim: '#00ff8833',
          text: '#d0ffe8',
          textMuted: '#70c898',
        },
        // Paleta 4: Claro Corporativo
        light: {
          bg: '#f1f5f9',
          card: '#ffffff',
          border: '#e2e8f0',
          accent: '#4f46e5',
          accentDim: '#4f46e522',
          text: '#1e293b',
          textMuted: '#64748b',
        },
      },
      animation: {
        'count-up': 'countUp 1s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px -4px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.02)',
        'card-hover': '0 8px 30px -8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
        'glow': '0 0 20px currentColor',
      },
    },
  },
  plugins: [],
}