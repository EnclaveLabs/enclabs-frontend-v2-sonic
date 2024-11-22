const rainbowColors = {
  red: '#FF0000',
  orange: '#FF7F00',
  yellow: '#FFFF00',
  green: '#00FF00',
  blue: '#0000FF',
  indigo: '#4B0082',
  violet: '#8B00FF',
};

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
    // lightGrey: '#2D3549', // before not light grey it's blue
    lightGrey: '#D3D3D3', 
    green: '#00C38E',
    red: '#E93D66',
    lightBlack: '#1C1C1C',
    orange: '#F57842',
    yellow: '#F5B242',
    blue: '#004aad',
    // The next colors are not in the UI kit, but are used throughout the designs
    mediumBlue: '#0074FF',
    darkBlue: '#1B4398',

    // Use for tag and dynamical hover 
    tagTextOrange: '#FF9800',
    tagBgOrange: 'rgba(255, 152, 0, 0.1)',
    hoverOrange: 'rgba(255, 152, 0, 0.4)',

    tagTextGreen: '#4CAF50',
    tagBgGreen: 'rgba(76, 175, 80, 0.1)',
    hoverGreen: 'rgba(76, 175, 80, 0.4)',

    tagTextYellow: '#FFC107',
    tagBgYellow: 'rgba(255, 193, 7, 0.1)',
    hoverYellow: 'rgba(255, 193, 7, 0.4)',

    tagTextRed: '#F44336',
    tagBgRed: 'rgba(244, 67, 54, 0.1)',
    hoverRed: 'rgba(244, 67, 54, 0.4)',

    tagTextBlue: '#2196F3',
    tagBgBlue: 'rgba(33, 150, 243, 0.1)',
    hoverBlue: 'rgba(33, 150, 243, 0.4)',  

    tagTextGrey: '#D3D3D3',
    tagBgGrey: 'rgba(211, 211, 211, 0.1)',
    hoverGrey: 'rgba(211, 211, 211, 0.4)',

    // Rainbow color
    rainbowColors
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

  // We keep Tailwind's original sizing scale but make it more granular (with 0.25rem steps) and
  // extend it to bigger values
  spacing: new Array(200).fill(undefined).map((_, index) => `${index * 0.25}rem`),
  extend: {
    backgroundImage: {
      'gradient-background': 'linear-gradient(to bottom right, #FCF9F1, #E2ECFA)',
      'rainbow-horizontal': `linear-gradient(to right, ${Object.values(rainbowColors).join(', ')})`,
      'rainbow-vertical': `linear-gradient(to top, ${Object.values(rainbowColors).join(', ')})`,
      'rainbow-diagonal': `linear-gradient(135deg, ${Object.values(rainbowColors).join(', ')})`,
    },
  },
};
