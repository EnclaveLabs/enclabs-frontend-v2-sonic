import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import type { ReferenceLine } from 'recharts';

import { SPACING } from 'theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
  const theme = useTheme();

  return {
    supplyChartColor: theme.palette.interactive.success,
    borrowChartColor: theme.palette.interactive.error,
    areaActiveDot: { r: SPACING * 2, strokeWidth: SPACING },
    container: css`
      width: 100%;
      height: ${theme.spacing(62)};
    `,
    referenceLineColor: theme.palette.interactive.primary,
    referenceLineLabel: {
      position: {
        y: -10,
        x: 48,
      },
      fill: theme.palette.text.primary,
      fontSize: theme.typography.small1.fontSize,
      fontWeight: theme.typography.small1.fontWeight,
    } as React.ComponentProps<typeof ReferenceLine>['label'],
    bubble: {
      backgroundFill: theme.palette.background.paper,
      borderStroke: theme.palette.interactive.primary,
      textFill: theme.palette.text.primary,
    },
  };
};
