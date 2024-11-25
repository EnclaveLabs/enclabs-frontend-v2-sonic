import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      display: flex;
      justify-content: space-between;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

      ${theme.breakpoints.down('xl')} {
        display: block;
        padding: 0;
        background-color: transparent;
      }
    `,
    getNetApyColor: ({ netApyPercentage }: { netApyPercentage: number }) =>
      netApyPercentage > 0 ? theme.palette.interactive.success : theme.palette.interactive.error,
    cellGroup: css`
      padding: 0;

      ${theme.breakpoints.down('xl')} {
        margin-bottom: ${theme.spacing(2)};
      }
    `,
    accountHealth: css`
      ${theme.breakpoints.down('xl')} {
        padding: ${theme.spacing(4)};
        background-color: ${theme.palette.background.paper};
        border-radius: ${theme.spacing(3)};
      }
    `,
    accountHealthProgressBar: css`
      margin-bottom: ${theme.spacing(3)};
    `,
    accountHealthFooter: css`
      display: flex;
      justify-content: flex-end;
      align-items: center;
    `,
    tooltip: css`
      display: flex;
    `,
    infoIcon: css`
      cursor: help;
    `,
    inlineLabel: css`
      margin-right: ${theme.spacing(1)};
    `,
    progressBar: css`
      margin-bottom: ${theme.spacing(3)};
    `,
    shieldIcon: css`
      margin-right: ${theme.spacing(2)};
    `,
    safeLimit: css`
      margin-right: ${theme.spacing(2)};
    `,
  };
};
