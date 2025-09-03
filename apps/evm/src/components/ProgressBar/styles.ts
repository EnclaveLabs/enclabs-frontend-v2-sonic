import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { getTokenType } from 'components/Tag';
import { tokenTypeInfo} from 'constants/tokenType';
import { theme } from 'theme';

const getBackgroundColor = (tokenAddress: string) : string => {

  if(tokenAddress){

    const tokenType = getTokenType(tokenAddress);
    const tokenTypeInfos = tokenTypeInfo[tokenType];
    return tokenTypeInfos.color;
  }
  else{

    return theme.extend.colors.lightGrey;
  }
}

export const useStyles = ({
  over,
  progressBarColor,
  tokenAddress,
}: {
  over: boolean;
  progressBarColor: string;
  tokenAddress?: string;
}) => {
  const usedTheme = useTheme();
  return {
    slider: css`
      z-index: 0;
      display: block;
      color: ${over ? usedTheme.palette.interactive.error50 : progressBarColor};
      background-color: ${usedTheme.palette.background.default};
      height: ${usedTheme.spacing(2)};
      padding: 0 !important;
      &.Mui-disabled {
        color: ${over ? usedTheme.palette.interactive.error50 : progressBarColor};
      }
      .MuiSlider-track {
        background-color: ${over ? usedTheme.palette.interactive.error50 : tokenAddress ? getBackgroundColor(tokenAddress) : progressBarColor};
        height: ${usedTheme.spacing(2)};
        border-radius: ${usedTheme.spacing(1)};
      }
      .MuiSlider-rail {
        height: ${usedTheme.spacing(2)};
        color: ${theme.extend.colors.lightGrey};
        opacity: 1;
      }
    `,
    trackWrapper: css`
      position: relative;
      z-index: 20;
    `,
    mark: css`
      position: absolute;
      border-radius: 1px;
      top: 50%;
      transform: translate(-1px, -50%);
      z-index: 30;
      background-color: currentcolor;

      /* theme styles */
      width: ${usedTheme.spacing(1)};
      height: ${usedTheme.spacing(2)};
      color: ${usedTheme.palette.interactive.error};
    `,
    hasTooltip: css`
      /* for tooltips working in disabled state */
      cursor: help;
      pointer-events: all;
    `,
    tooltipHelper: css`
      visibility: hidden;
    `,
  };
};

export default useStyles;
