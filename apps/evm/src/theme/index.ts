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

      blue: 'rgb(var(--color-blue) / 1)',
      mediumBlue: 'rgb(var(--color-mediumBlue) / 1)',
      darkBlue: 'rgb(var(--color-darkBlue) / 1)',
      red: 'rgb(var(--color-red) / 1)',
      orange: 'rgb(var(--color-orange) / 1)',
      yellow: 'rgb(var(--color-yellow) / 1)',
      green: 'rgb(var(--color-green) / 1)',

      tagTextOrange: 'rgb(var(--tag-orange-text) / 1)',
      tagBgOrange: 'rgb(var(--tag-orange-bg) / 1)',
      hoverOrange: 'rgb(var(--tag-orange-hover) / 0.4)',

      tagTextGreen: 'rgb(var(--tag-green-text) / 1)',
      tagBgGreen: 'rgb(var(--tag-green-bg) / 1)',
      hoverGreen: 'rgb(var(--tag-green-hover) / 0.4)',

      tagTextYellow: 'rgb(var(--tag-yellow-text) / 1)',
      tagBgYellow: 'rgb(var(--tag-yellow-bg) / 1)',
      hoverYellow: 'rgb(var(--tag-yellow-hover) / 0.4)',

      tagTextRed: 'rgb(var(--tag-red-text) / 1)',
      tagBgRed: 'rgb(var(--tag-red-bg) / 1)',
      hoverRed: 'rgb(var(--tag-red-hover) / 0.4)',

      tagTextBlue: 'rgb(var(--tag-blue-text) / 1)',
      tagBgBlue: 'rgb(var(--tag-blue-bg) / 1)',
      hoverBlue: 'rgb(var(--tag-blue-hover) / 0.4)',

      tagTextGrey: 'rgb(var(--tag-grey-text) / 1)',
      tagBgGrey: 'rgb(var(--tag-grey-bg) / 1)',
      hoverGrey: 'rgb(var(--tag-grey-hover) / 0.4)',


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
