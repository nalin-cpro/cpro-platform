import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './sites/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body:     ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        label:    ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        sans:     ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ─── Kinetic / Material Design 3 semantic tokens ───
        primary:                  '#b72301',
        'primary-container':      '#ff5733',
        'on-primary':             '#ffffff',
        'on-primary-container':   '#580c00',
        'inverse-primary':        '#ffb4a4',
        secondary:                '#515f78',
        'secondary-container':    '#d2e0fe',
        'on-secondary':           '#ffffff',
        'on-secondary-container': '#55637d',
        tertiary:                 '#00677c',
        'tertiary-container':     '#009fbd',
        'on-tertiary':            '#ffffff',
        surface:                  '#f9f9ff',
        'surface-container-lowest':  '#ffffff',
        'surface-container-low':     '#f0f3ff',
        'surface-container':         '#e8eeff',
        'surface-container-high':    '#dfe8ff',
        'surface-container-highest': '#d6e3ff',
        'surface-dim':               '#ccdaf8',
        'on-background':             '#0d1c32',
        'on-surface':                '#0d1c32',
        'on-surface-variant':        '#5b403a',
        'outline':                   '#8f7069',
        'outline-variant':           '#e4beb6',
        'inverse-surface':           '#233148',
        'inverse-on-surface':        '#ecf0ff',
        error:                       '#ba1a1a',
        'error-container':           '#ffdad6',
        'on-error':                  '#ffffff',

        // ─── Legacy admin tokens (kept so /admin UI doesn't break) ───
        ink: {
          DEFAULT: '#2B2B2B', 900: '#1a1a1a', 800: '#2B2B2B', 700: '#4a4a4a',
          600: '#727272', 500: '#999999', 400: '#bcbcbc', 300: '#d6d6d6',
          200: '#ebebeb', 100: '#f1f3f5',
        },
        brand: {
          50: '#fef0ed', 100: '#fcd9d2', 200: '#fab5a8', 300: '#f6917a',
          400: '#f26b51', 500: '#EE4D34', 600: '#d63920', 700: '#a82a17',
          800: '#7e1f10', 900: '#54140a',
        },
      },
      backgroundImage: {
        'kinetic-gradient': 'linear-gradient(135deg, #b72301 0%, #ff5733 100%)',
      },
      boxShadow: {
        'card':      '0 1px 3px rgba(13, 28, 50, 0.08)',
        'card-hover': '0 8px 30px rgba(13, 28, 50, 0.12)',
      },
    },
  },
  plugins: [],
}

export default config
