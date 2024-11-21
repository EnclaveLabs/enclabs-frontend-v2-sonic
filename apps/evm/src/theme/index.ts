export const theme = {
  fontFamily: {
    sans: ['ProximaNova', 'Arial', 'sans-serif'],
  },
  screens: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    xxl: '1440px',
  },
  colors: {
    inherit: 'inherit',
    transparent: 'transparent',
    // The next colors are taken from the UI kit in Figma
    background: '#FCF9F1',
    // cards: '#1E2431', // before
    cards: '#FFFFFF',
    lightCards: '#FFFFFF',
    grey: '#AAB3CA',
    black: '#0000000',
    white: '#FFFFFF',
    // lightGrey: '#2D3549', // before not light grey
    lightGrey: '#004aad',
    lightGrey2: '#D3D3D3',
    green: '#00C38E',
    red: '#E93D66',
    lightBlack: '#1C1C1C',
    orange: '#F57842',
    yellow: '#F5B242',
    blue: '#004aad',
    // The next colors are not in the UI kit, but are used throughout the designs
    mediumBlue: '#0074FF',
    darkBlue: '#1B4398',
    gradient: 'linear-gradient(to bottom right, #FCF9F1, #E2ECFA)',
  },
  fontSize: {
    xs: ['0.75rem', '1.5'],
    sm: ['0.875rem', '1.5'],
    base: ['1rem', '1.5'],
    lg: [
      '1.25rem',
      {
        lineHeight: '1.5',
        fontWeight: '600',
      },
    ],
    xl: [
      '1.5rem',
      {
        lineHeight: '1.5',
        fontWeight: '700',
      },
    ],
    '2xl': [
      '2rem',
      {
        lineHeight: '1.5',
        fontWeight: '600',
      },
    ],
    '3xl': [
      '2.5rem',
      {
        lineHeight: '1.2',
        fontWeight: '600',
      },
    ],
  },
  boxShadow: {
    DEFAULT: '0px 4px 15px 0px #0D1017',
  },
  // We keep Tailwind's original sizing scale but make it more granular (with 0.25rem steps) and
  // extend it to bigger values
  spacing: new Array(200).fill(undefined).map((_, index) => `${index * 0.25}rem`),
  extend: {
    backgroundImage: {
      'gradient-background': 'linear-gradient(to bottom right, #FCF9F1, #E2ECFA)',
      'rainbow-horizontal': 'linear-gradient(to right, #FF8080, #FFC080, #FFFF80, #80FF80, #80C0FF, #A080FF, #D080FF)',
      'rainbow-vertical': 'linear-gradient(to top, #FF8080, #FFC080, #FFFF80, #80FF80, #80C0FF, #A080FF, #D080FF)',
     },
  },
};
