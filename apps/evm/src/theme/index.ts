// src/theme/index.ts
const rainbowColors = {
  red: '#FF0000',
  orange: '#FF7F00',
  yellow: '#FFFF00',
  green: '#00FF00',
  blue: '#0000FF',
  indigo: '#4B0082',
  violet: '#8B00FF',
} as const;

const fontFamily = {
  sans: ['ProximaNova', 'Arial', 'sans-serif'],
};

const screens = { sm: '576px', md: '768px', lg: '992px', xl: '1280px', xxl: '1440px' };

const fontSize = {
  xs: ['0.75rem', { lineHeight: '1.5' }],
  sm: ['0.875rem', { lineHeight: '1.5' }],
  base: ['1rem', { lineHeight: '1.5' }],
  lg: ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
  xl: ['1.5rem', { lineHeight: '1.5', fontWeight: '700' }],
  '2xl': ['2rem', { lineHeight: '1.5', fontWeight: '600' }],
  '3xl': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
};

const spacing = new Array(200).fill(null).map((_, i) => `${i * 0.25}rem`);

export const theme = {
  fontFamily,
  screens,
  spacing,
  fontSize,
  extend: {
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',

      cards: 'rgb(var(--color-cards))',
      lightCards: 'rgb(var(--color-lightCards))',

      background: 'rgb(var(--color-background))',
      surface: 'rgb(var(--color-surface))',
      surfaceMuted: 'rgb(var(--color-surface-muted))',
      text: 'rgb(var(--color-text))',
      textMuted: 'rgb(var(--color-text-muted))',
      border: 'rgb(var(--color-border))',
      primary: 'rgb(var(--color-primary))',
      danger: 'rgb(var(--color-danger))',
      warning: 'rgb(var(--color-warning))',
      success: 'rgb(var(--color-success))',

     white: 'rgb(var(--color-white))',
     black: 'rgb(var(--color-black))',
     grey: 'rgb(var(--color-grey))',
     lightGrey: 'rgb(var(--color-lightGrey))',
     lightBlack: 'rgb(var(--color-lightBlack))',
      blue: '#004aad',
      mediumBlue: '#0074FF',
      darkBlue: '#1B4398',
      red: '#E93D66',
      orange: '#F57842',
      yellow: '#F5B242',
      green: '#00C38E',
       tagTextOrange: '#FF9800',
    tagBgOrange: 'rgba(255, 243, 229, 1)',
    hoverOrange: 'rgba(255, 152, 0, 0.4)',

    tagTextGreen: '#4CAF50',
    tagBgGreen: 'rgb(236, 246, 236)',
    hoverGreen: 'rgba(76, 175, 80, 0.4)',

    tagTextYellow: '#FFC107',
    tagBgYellow: 'rgba(255, 251, 241, 1)',
    hoverYellow: 'rgba(255, 193, 7, 0.4)',

    tagTextRed: '#F44336',
    tagBgRed: 'rgba(254, 235, 234, 1)',
    hoverRed: 'rgba(244, 67, 54, 0.4)',

    tagTextBlue: '#2196F3',
    tagBgBlue: 'rgba(232, 243, 254, 1)',
    hoverBlue: 'rgba(33, 150, 243, 0.4)',  

    tagTextGrey: '#D3D3D3',
    tagBgGrey: 'rgba(250, 250, 250, 1)',
    hoverGrey: 'rgba(211, 211, 211, 0.4)',
      rainbowColors,
    },
    backgroundImage: {
      'gradient-background': 'linear-gradient(to bottom right, #FCF9F1, #E2ECFA)',
      'rainbow-horizontal': `linear-gradient(to right, ${Object.values(rainbowColors).join(', ')})`,
      'rainbow-vertical': `linear-gradient(to top, ${Object.values(rainbowColors).join(', ')})`,
      'rainbow-diagonal': `linear-gradient(135deg, ${Object.values(rainbowColors).join(', ')})`,
    },
  },
};

export default theme;
