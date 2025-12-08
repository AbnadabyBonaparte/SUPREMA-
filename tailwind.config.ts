// tailwind.config.ts — OBSIDIAN DYNASTY 2026 (VENCEDOR GESPARK)
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          50: '#f5f5f6', 100: '#e6e6e7', 200: '#cfcfd1', 300: '#adaeb1',
          400: '#84858a', 500: '#696a6f', 600: '#5a5b5f', 700: '#4c4d50',
          800: '#434345', 900: '#1a1a1c', 950: '#0a0a0b',
        },
        'sovereign-gold': {
          50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
          400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
          800: '#92400e', 900: '#78350f', 950: '#451a03',
        },
        champagne: {
          50: '#fdfcfb', 100: '#faf8f5', 200: '#f5f0e8', 300: '#ede4d3',
          400: '#e0d0b5', 500: '#d4bc97', 600: '#c8a878', 700: '#b8945e',
          800: '#a07e4d', 900: '#8b6d42',
        },
        'rose-bronze': {
          50: '#fdf8f6', 100: '#f8ede8', 200: '#f0dbd1', 300: '#e5c3b0',
          400: '#d8a587', 500: '#c98563', 600: '#b86e4f', 700: '#9a5940',
          800: '#7f4a37', 900: '#6a3f30',
        },
        marble: {
          50: '#ffffff', 100: '#fefefe', 200: '#fafafa', 300: '#f5f5f5',
          400: '#f0f0f0', 500: '#e8e8e8',
        },
        'emerald-noir': { 500: '#064e3b', 600: '#065f46', 700: '#047857' },
        ruby: { 500: '#7f1d1d', 600: '#991b1b', 700: '#b91c1c' },
      },
      fontFamily: {
        display: ['Orpheus Pro', 'Canela', 'Tiempos Headline', 'serif'],
        heading: ['Reckless Neue', 'Sohne', 'GT Super Display', 'sans-serif'],
        body: ['GT America', 'Inter', 'system-ui', 'sans-serif'],
        accent: ['Silk Serif', 'Orpheus Pro', 'serif'],
      },
      backgroundImage: {
        'gold-radial': 'radial-gradient(circle at 50% 50%, rgba(181, 83, 9, 0.15), transparent 70%)',
        'liquid-gold': 'linear-gradient(135deg, #b45309 0%, #f59e0b 50%, #fbbf24 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(181, 83, 9, 0.4), 0 0 60px rgba(181, 83, 9, 0.2)',
        'obsidian-lift': '0 20px 60px -15px rgba(0,0,0,0.6), 0 10px 30px -10px rgba(0,0,0,0.4)',
      },
      animation: {
        'gold-pulse': 'goldPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(181, 83, 9, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(181, 83, 9, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
