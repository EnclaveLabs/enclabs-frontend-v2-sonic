import { css } from "@emotion/react";
import { theme } from "../../theme";

export const useStyles = () => {
  return {
    root: css`
      margin: 0 auto;
      max-width: 480px;
    `,
    container: css`
      margin-top: 12px;
    `,
    multicolorBorder: css`
      width: fit-content;
      --radius: 16px;
      --border: 1px;
      padding: 16px;
      border-radius: var(--radius);
      border: var(--border) solid transparent;
      background: /* fond intérieur (SOLIDE via gradient) */ linear-gradient(
            ${theme.extend.colors.cards},
            ${theme.extend.colors.cards}
          )
          padding-box,
        /* bordure dégradée */
          linear-gradient(90deg, #6e13d2, #380ae2, #64da49, #fdf652, #f3ad3d)
          border-box;
    `,
  };
};
