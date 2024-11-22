import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    getContainer: ({ fullWidth }: { fullWidth: boolean }) => css`
      display: flex;
      align-items: center;

      ${
        fullWidth &&
        css`
        width: 100%;
      `
      }

      ${theme.breakpoints.down('sm')} {
        width: 100%;
      }
    `,
    getButton: ({
      active,
      last,
      fullWidth,
    }: {
      active: boolean;
      last: boolean;
      fullWidth: boolean;
    }) => css`
      span {
        font-size: ${theme.typography.small2.fontSize};
      }

      ${
        fullWidth &&
        css`
        flex: 1;
      `
      }

      ${
        !last &&
        css`
        margin-right: ${theme.spacing(2)};
      `
      };

      ${
        !active &&
        css`
        background-color: transparent;
        border-color: transparent;

      `
      };

      ${theme.breakpoints.down('sm')} {
        flex: 1;
      }
    `,
  };
};
