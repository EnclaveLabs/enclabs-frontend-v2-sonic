import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    
    gradientBorder: css`
      background: linear-gradient(135deg, 
        #FF0000, /* Rouge */
        #FF7F00, /* Orange */
        #FFFF00, /* Jaune */
        #00FF00, /* Vert */
        #0000FF, /* Bleu */
        #4B0082, /* Indigo */
        #8B00FF  /* Violet */
        );
      
    `,
  };
};
