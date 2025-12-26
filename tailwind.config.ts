// tailwind.config.ts — OBSIDIAN DYNASTY 2026 (VENCEDOR GESPARK)
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    // Classes críticas com variáveis CSS - nunca remover
    'bg-background',
    'bg-background-secondary',
    'bg-background-tertiary',
    'bg-surface',
    'bg-surface-elevated',
    'bg-surface-hover',
    'text-foreground',
    'text-foreground-secondary',
    'text-foreground-tertiary',
    'text-primary',
    'text-muted',
    'border-primary',
    'border-border',
    'shadow-gold-glow',
    'shadow-obsidian-lift',
    // Pattern para classes dinâmicas com variáveis
    { pattern: /bg-\[var\(--color-[a-z-]+\)\]/ },
    { pattern: /text-\[var\(--color-[a-z-]+\)\]/ },
    { pattern: /border-\[var\(--color-[a-z-]+\)\]/ },
  ],
  theme: {
    extend: {
      colors: {
        // CSS Variables (SSOT) - Primary colors
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        background: {
          DEFAULT: 'var(--color-background)',
          secondary: 'var(--color-background-secondary)',
          tertiary: 'var(--color-background-tertiary)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
          hover: 'var(--color-surface-hover)',
        },
        foreground: {
          DEFAULT: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        muted: {
          DEFAULT: 'var(--color-text-secondary)',
          foreground: 'var(--color-text-tertiary)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)',
          subtle: 'var(--color-border-subtle)',
          dark: 'var(--color-border-dark)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          light: 'var(--color-accent-light)',
        },
        // Legacy color tokens (mapped to CSS variables for compatibility)
        obsidian: {
          50: 'var(--color-obsidian-50)', 100: 'var(--color-obsidian-100)', 
          200: 'var(--color-obsidian-200)', 300: 'var(--color-obsidian-300)',
          400: 'var(--color-obsidian-400)', 500: 'var(--color-obsidian-500)', 
          600: 'var(--color-obsidian-600)', 700: 'var(--color-obsidian-700)',
          800: 'var(--color-obsidian-800)', 900: 'var(--color-obsidian-900)', 
          950: 'var(--color-obsidian-950)',
        },
        'sovereign-gold': {
          50: 'var(--color-gold-50)', 100: 'var(--color-gold-100)', 
          200: 'var(--color-gold-200)', 300: 'var(--color-gold-300)',
          400: 'var(--color-gold-400)', 500: 'var(--color-gold-500)', 
          600: 'var(--color-gold-600)', 700: 'var(--color-gold-700)',
          800: 'var(--color-gold-800)', 900: 'var(--color-gold-900)', 
          950: 'var(--color-gold-950)',
        },
        gold: {
          DEFAULT: 'var(--color-gold-legacy)',
          hover: 'var(--color-gold-legacy-hover)',
          50: 'var(--color-gold-50)', 100: 'var(--color-gold-100)', 
          200: 'var(--color-gold-200)', 300: 'var(--color-gold-300)',
          400: 'var(--color-gold-400)', 500: 'var(--color-gold-500)', 
          600: 'var(--color-gold-600)', 700: 'var(--color-gold-700)',
          800: 'var(--color-gold-800)', 900: 'var(--color-gold-900)', 
          950: 'var(--color-gold-950)',
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
          50: 'var(--color-marble-50)', 100: 'var(--color-marble-100)', 
          200: 'var(--color-marble-200)', 300: 'var(--color-marble-300)',
          400: 'var(--color-marble-400)', 500: 'var(--color-marble-500)',
        },
        'emerald-noir': { 
          500: 'var(--color-success)', 
          600: 'var(--color-success-light)', 
          700: 'var(--color-success-dark)' 
        },
        ruby: { 
          500: 'var(--color-error)', 
          600: 'var(--color-error-light)', 
          700: 'var(--color-error-dark)' 
        },
      },
      fontFamily: {
        display: ['Orpheus Pro', 'Canela', 'Tiempos Headline', 'serif'],
        heading: ['Reckless Neue', 'Sohne', 'GT Super Display', 'sans-serif'],
        body: ['GT America', 'Inter', 'system-ui', 'sans-serif'],
        accent: ['Silk Serif', 'Orpheus Pro', 'serif'],
      },
      backgroundImage: {
        'gold-radial': 'var(--gradient-gold-radial)',
        'liquid-gold': 'var(--gradient-gold)',
        'obsidian': 'var(--gradient-obsidian)',
      },
      boxShadow: {
        'gold-glow': 'var(--shadow-gold-glow)',
        'obsidian-lift': 'var(--shadow-obsidian-lift)',
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
