import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#c6ff4a',     // lime neon — CTAs, destaques
        secondary: '#00FF7F',   // verde spring — estados ativos
        'bg-deep': '#070a07',   // fundo principal
        'bg-card': '#182418',   // cards
        'bg-mid': '#0c1410',
        'bg-page': '#0A0F1E',   // azul-noite (do app)
        'border-glow': 'rgba(198,255,74,0.25)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #0A0F1E 0%, #050805 100%)',
        'glow-tr': 'radial-gradient(circle at 100% 0%, rgba(198,255,74,0.18) 0%, transparent 65%)',
        'glow-bl': 'radial-gradient(circle at 0% 100%, rgba(46,204,113,0.12) 0%, transparent 65%)',
        'card-gradient': 'linear-gradient(135deg, #182418 0%, #0c1410 50%, #070a07 100%)',
      },
      boxShadow: {
        'glow-primary': '0 0 28px rgba(198,255,74,0.45)',
        'glow-card': '0 0 40px rgba(198,255,74,0.08)',
        'glow-phone': '0 40px 80px rgba(0,255,127,0.2)',
      },
      letterSpacing: {
        'tightest': '-0.03em',
        'wider-uppercase': '0.14em',
      },
      animation: {
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.04' },
          '50%': { opacity: '0.14' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
