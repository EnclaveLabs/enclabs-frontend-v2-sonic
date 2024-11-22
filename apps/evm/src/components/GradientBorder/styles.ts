import { css } from '@emotion/react';
import { theme } from 'theme';

export const useStyles = () => {

  return {
    
    gradientBorder: css`
      background: ${theme.extend.backgroundImage['rainbow-diagonal']};
    `,
  };
};
