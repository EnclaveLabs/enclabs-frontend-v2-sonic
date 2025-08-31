import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { theme as cssTheme } from '../../theme';

export const useStyles = () => {
  const theme = useTheme();
  return css`
    .MuiTooltip-popper {
      .MuiTooltip-tooltip {
        box-shadow: 0 4px 4px rgba(0 0 0 25%);
        border-radius: ${theme.spacing(3)};
        background-color: ${theme.palette.secondary.light};
        font-size: ${theme.typography.small2.fontSize};
        font-weight: ${theme.typography.small2.fontWeight};
        padding: ${theme.spacing(3)};
        color: ${cssTheme.extend.colors.white};
      }
      .MuiTooltip-arrow {
        color: ${theme.palette.secondary.light};
      }
    }
  `;
};
