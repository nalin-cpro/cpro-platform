import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './sites/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Design system: Inter for headings, Rubik for body
        heading: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['var(--font-rubik)', 'Rubik', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-rubik)', 'Rubik', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ─── Ewebot Bento design system (new) ───
        header:           '#062B3E',
        body:             '#696687',
        surface:          '#F0F2F4',
        primary:          '#EE4D34',
        'primary-dark':   '#C93D26',
        'primary-light':  '#FF6B4A',
        secondary:        '#2B2B2B',
        'grad-start':     '#FF6B4A',
        'grad-end':       '#EE4D34',
        dark:             '#062B3E',
        muted:            '#696687',
        light:            '#F0F2F4',

        // ─── Legacy admin tokens (kept so /admin doesn't break) ───
        ink: {
          DEFAULT: '#2B2B2B',
          900: '#1a1a1a',
          800: '#2B2B2B',
          700: '#4a4a4a',
          600: '#727272',
          500: '#999999',
          400: '#bcbcbc',
          300: '#d6d6d6',
          200: '#ebebeb',
          100: '#f1f3f5',
        },
        brand: {
          50:  '#fef0ed',
          100: '#fcd9d2',
          200: '#fab5a8',
          300: '#f6917a',
          400: '#f26b51',
          500: '#EE4D34',
          600: '#d63920',
          700: '#a82a17',
          800: '#7e1f10',
          900: '#54140a',
        },
        sky2:  { 100: '#C3DBF1' },
        lime2: { 100: '#C2E74D' },
        sun2:  { 100: '#FFBC7D' },
      },
      borderRadius: {
        card: '30px',
        pill: '100px',
        chip: '100px',
        sm:   '10px',
        DEFAULT: '8px',
      },
      transitionTimingFunction: { standard: 'ease' },
      transitionDuration: { standard: '350ms', fast: '300ms', slow: '400ms' },
      backgroundImage: {
        'brand-gradient':    'linear-gradient(45deg, #FF6B4A 25.56%, #EE4D34 131.11%)',
        'brand-gradient-h':  'linear-gradient(124deg, #FF6B4A 21%, #EE4D34 95%)',
        'dark-gradient':     'linear-gradient(135deg, #062B3E 0%, #0a3d54 100%)',
      },
      boxShadow: {
        card:         '0 4px 24px rgba(6, 43, 62, 0.08)',
        'card-hover': '0 8px 40px rgba(6, 43, 62, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
