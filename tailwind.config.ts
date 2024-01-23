import type { Config } from 'tailwindcss'

const FONT_REGULAR = '400'
const FONT_SEMI_BOLD = '600'
const FONT_BOLD = '700'

const config: Config = {
  plugins: [require('@tailwindcss/forms')],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2BD17E',
        error: '#EB5757',
        input: '#224957',
        card: '#092C39',
        background: '#093545',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      // Base font size is 16px
      fontSize: {
        h1: [
          '4rem',
          {
            lineHeight: '5rem',
            letterSpacing: '0em',
            fontWeight: FONT_SEMI_BOLD,
          },
        ],
        h2: [
          '3rem',
          {
            lineHeight: '3.5rem',
            letterSpacing: '0em',
            fontWeight: FONT_SEMI_BOLD,
          },
        ],
        h3: [
          '2rem',
          {
            lineHeight: '2.5rem',
            letterSpacing: '0em',
            fontWeight: FONT_SEMI_BOLD,
          },
        ],
        h4: [
          '1.5rem',
          {
            lineHeight: '2rem',
            letterSpacing: '0em',
            fontWeight: FONT_BOLD,
          },
        ],
        h5: [
          '1.25rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0em',
            fontWeight: FONT_BOLD,
          },
        ],
        h6: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0em',
            fontWeight: FONT_BOLD,
          },
        ],
        'base-l': [
          '1.25rem',
          {
            lineHeight: '2rem',
            letterSpacing: '0em',
            fontWeight: FONT_REGULAR,
          },
        ],
        base: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0em',
            fontWeight: FONT_REGULAR,
          },
        ],
        'base-s': [
          '0.875rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0em',
            fontWeight: FONT_REGULAR,
          },
        ],
        'base-xs': [
          '0.75rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0em',
            fontWeight: FONT_REGULAR,
          },
        ],
        caption: [
          '0.875rem',
          {
            lineHeight: '1rem',
            letterSpacing: '0em',
            fontWeight: FONT_REGULAR,
          },
        ],
      },
    },
  },
}
export default config
