import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { getTokenType } from 'components/Tag';
import { tokenTypeInfo } from 'constants/tokenType';
import { theme } from 'theme';

import type { BREAKPOINTS } from 'theme/MuiThemeProvider/muiTheme';

const getHoverBackgroundColor = (tokenAddress: string): string => {

  if (tokenAddress) {

    const tokenType = getTokenType(tokenAddress);
    const tokenTypeInfos = tokenTypeInfo[tokenType];
    return tokenTypeInfos.hoverColor;
  }

  return theme.extend.colors.lightGrey;
}

export const useStyles = () => {
  const usedTheme = useTheme();

  return {
    getRoot: ({ breakpoint }: { breakpoint?: keyof (typeof BREAKPOINTS)['values'] }) => css`
      padding-left: 0;
      padding-right: 0;
      margin-top: 1px;
      margin-bottom: 1px;

      ${breakpoint && usedTheme.breakpoints.down(breakpoint)} {
        background-color: transparent;
        padding-top: 0;
        padding-bottom: 0;
      }
    `,
    getTitle: ({ breakpoint }: { breakpoint?: keyof (typeof BREAKPOINTS)['values'] }) => css`
      margin-bottom: ${usedTheme.spacing(4)};
      padding: ${usedTheme.spacing(0, 6)};

      ${breakpoint && usedTheme.breakpoints.down(breakpoint)} {
        padding: 0;
      }
    `,
    getTableContainer: ({
      breakpoint,
    }: {
      breakpoint?: keyof (typeof BREAKPOINTS)['values'];
    }) => css`
      ${breakpoint && usedTheme.breakpoints.down(breakpoint)} {
        display: none;
      }
    `,
    getCardsContainer: ({
      breakpoint,
    }: {
      breakpoint?: keyof (typeof BREAKPOINTS)['values'];
    }) => css`
      display: none;
      box-shadow: 0 0 0 0 rgb(0 0 0 / 0.1), 0 0 0 0 rgb(0 0 0 / 0.1);

      ${breakpoint && usedTheme.breakpoints.down(breakpoint)} {
        display: block;
      }
    `,
    cardsSelect: css`
      width: ${usedTheme.spacing(56)};
      margin-bottom: ${usedTheme.spacing(4)};
    `,
    link: css`
      color: ${usedTheme.palette.text.primary};

      :hover {
        text-decoration: none;
      }
    `,
    tableWrapperMobile: ({ clickable, tokenAddress }: { clickable: boolean, tokenAddress: string }) => css`
      &:not(:last-of-type) {
        margin-bottom: ${usedTheme.spacing(4)};
      }

      padding: ${usedTheme.spacing(4, 0)};

      ${clickable &&
      css`
        cursor: pointer;

        :hover {
          background-color: ${getHoverBackgroundColor(tokenAddress)};
        }
      `
      }
    `,
    rowTitleMobile: css`
      padding-left: ${usedTheme.spacing(4)};
      padding-right: ${usedTheme.spacing(4)};
    `,
    delimiterMobile: css`
      margin: ${usedTheme.spacing(4)};
    `,
    getTableRow: ({ clickable, tokenAddress }: { clickable: boolean, tokenAddress: string }) => css`
      height: ${usedTheme.spacing(16)};

      :hover {
        background-color: ${getHoverBackgroundColor(tokenAddress)} !important;
      }

      ${clickable &&
      css`
        cursor: pointer;
      `
      }
    `,
    rowWrapperMobile: css`
      display: grid;
      grid-template-rows: 1fr;
    `,
    cellMobile: css`
      display: flex;
      flex-direction: column;
      padding-left: ${usedTheme.spacing(4)};
      padding-right: ${usedTheme.spacing(4)};
    `,
    cellTitleMobile: css`
      color: ${usedTheme.palette.text.secondary};
    `,
    cellValueMobile: css`
      padding-top: ${usedTheme.spacing(2)};
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${usedTheme.palette.text.primary};
    `,
    loader: css`
      margin-bottom: ${usedTheme.spacing(5)};
    `,
    table: ({ minWidth }: { minWidth: string }) => css`
      min-width: ${minWidth};
      table-layout: fixed;

      .MuiTableRow-root:first-of-type,
      .MuiTableRow-root:not(:last-child) {
        border-bottom: 2px solid rgb(var(--color-background));
      }

      .MuiTableCell-root {
        border-width: 0;
        font-weight: ${usedTheme.typography.body1.fontWeight};
        flex-direction: row;
        font-size: ${usedTheme.spacing(3.5)};
        text-transform: none;
      }

      .MuiTableCell-root:first-of-type {
        padding-left: ${usedTheme.spacing(6)};
      }

      .MuiTableCell-root:last-child {
        padding-right: ${usedTheme.spacing(6)};
      }
    `,
    tableSortLabel: ({ orderable }: { orderable: boolean }) => css`
      cursor: ${orderable ? 'pointer' : 'auto'};

      &.MuiTableSortLabel-root {
        span {
          color: ${theme.extend.colors.blue};
        }
      }

      span.MuiTableSortLabel-icon {
        display: none;
      }

      .MuiSvgIcon-root {
        display: block;
        margin-left: ${usedTheme.spacing(2)};
        transform: rotate(0deg);
      }

      .MuiTableSortLabel-iconDirectionDesc {
        transform: rotate(180deg);
      }

      &.MuiTableSortLabel-root.Mui-active:hover {
        color: ${usedTheme.palette.text.secondary};

        .MuiTableSortLabel-iconDirectionDesc {
          opacity: 0.5;
        }

        .MuiTableSortLabel-iconDirectionAsc {
          opacity: 0.5;
        }
      }
    `,
    tableSortLabelIconsContainer: css`
      margin-top: -2px;
    `,
    tableSortLabelIcon: ({ active }: { active: boolean }) => css`
      &.MuiTableSortLabel-icon {
        fill: ${usedTheme.palette.text.primary};
      }
      .Mui-active &.MuiTableSortLabel-icon {
        fill: ${active ? usedTheme.palette.interactive.success : usedTheme.palette.text.primary};
        color: ${active ? usedTheme.palette.interactive.success : usedTheme.palette.text.primary};
      }
    `,
    cellWrapper: css`
      height: 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: ${usedTheme.spacing(0, 4)};

      :first-of-type > a {
        padding-left: 0;
      }

      :last-of-type > a {
        padding-right: 0;
      }
    `,
  };
};