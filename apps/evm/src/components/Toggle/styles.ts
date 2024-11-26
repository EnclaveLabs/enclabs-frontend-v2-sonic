import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { getTokenType } from 'components/Tag';
import { tokenTypeInfo} from 'constants/tokenType';
import { theme } from 'theme';

const getHoverBackgroundColor = (tokenAddress: string | undefined) : any => {

  let tokenTypeInfos = {
    color: theme.colors.blue,
    hoverColor: theme.colors.hoverBlue,
  };
  if(tokenAddress){

    const tokenType = getTokenType(tokenAddress!);
    tokenTypeInfos = tokenTypeInfo[tokenType];
  }
  return tokenTypeInfos;
}

export const useStyles = () => {
  const usedTheme = useTheme();
  const thumbSize = usedTheme.spacing(5.5);

  return {
    container: css`
      display: inline-flex;
      align-items: center;
    `,
    label: css`
      margin-right: ${usedTheme.spacing(2)};
    `,
    infoIcon: css`
      margin-right: ${usedTheme.spacing(2)};
    `,
    getSwitch: ({ isLight, tokenAddress }: { isLight: boolean, tokenAddress: string | undefined }) => css`
      flex-shrink: 0;
      width: calc(${thumbSize} * 2);
      height: ${thumbSize};
      padding: 0;

      & .MuiSwitch-switchBase {
        padding: 0;
        margin: 0;
        transition-duration: 300ms;
        color: ${usedTheme.palette.background.default};

        &.Mui-checked {
          color: ${usedTheme.palette.background.default};
          transform: translateX(${thumbSize});

          .MuiSwitch-thumb {
            background-color: ${getHoverBackgroundColor(tokenAddress).color};
          }

          & + .MuiSwitch-track {
            background-color: ${
              isLight ? getHoverBackgroundColor(tokenAddress).hoverColor  : getHoverBackgroundColor(tokenAddress).hoverColor
            };
          }
        }

        &.Mui-disabled + .MuiSwitch-track {
          opacity: 0.5;
        }
      }

      .MuiSwitch-thumb {
        background-color: ${isLight ? getHoverBackgroundColor(tokenAddress).color : getHoverBackgroundColor(tokenAddress).color};
        box-shadow: none;
        box-sizing: border-box;
        width: ${thumbSize};
        height: ${thumbSize};
      }

      .MuiSwitch-track {
        border-radius: ${thumbSize};
      }

      .MuiSwitch-track,
      .Mui-checked + .MuiSwitch-track {
        background-color: ${
          isLight ? usedTheme.palette.grey[100]  : usedTheme.palette.grey[100]
        };
        opacity: 1;
      }
    `,
  };
};
