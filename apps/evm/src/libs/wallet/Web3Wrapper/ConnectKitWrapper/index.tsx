import { ConnectKitProvider } from 'connectkit';
import { useChainId } from 'libs/wallet';
import { theme } from 'theme';
import { AuthHandler } from './AuthHandler';

export interface ConnectKitWrapperProps {
  children?: React.ReactNode;
}

export const ConnectKitWrapper: React.FC<ConnectKitWrapperProps> = ({ children }) => {
  const { chainId } = useChainId();

  return (
    <ConnectKitProvider
      options={{
        language: 'en-US',
        hideQuestionMarkCTA: true,
        hideRecentBadge: true,
        hideNoWalletCTA: true,
        hideTooltips: true,
        hideBalance: true,
        initialChainId: chainId,
      }}
      mode="dark"
      customTheme={{
        '--ck-font-family': '"Proxima Nova Rg", var(--font-fallback)',
        '--ck-border-radius': '0.75rem',
        '--ck-overlay-background': 'rgba(0, 0, 0, 0.5)',

        // Wallet buttons
        "--ck-body-background": theme.extend.colors.cards,
        '--ck-primary-button-box-shadow': '0px 8px 6px 0px rgba(0, 0, 0, 0.05)',
        '--ck-primary-button-border-radius': '0.5rem',
        '--ck-primary-button-hover-border-radius': '0.5rem',
        '--ck-primary-button-active-border-radius': '0.5rem',
        '--ck-primary-button-background': theme.extend.colors.cards,
        '--ck-primary-button-color': theme.extend.colors.primary,
        '--ck-primary-button-hover-color': theme.extend.colors.white,
        '--ck-primary-button-hover-background': theme.extend.colors.primary,
        '--ck-primary-button-active-background': theme.extend.colors.primary,

        // Copy to clipboard button
        '--ck-secondary-button-background': theme.extend.colors.primary,
        '--ck-secondary-button-hover-background': theme.extend.colors.mediumBlue,
        '--ck-secondary-button-hover-color': theme.extend.colors.white,
        '--ck-secondary-button-active-background': theme.extend.colors.white,
        '--ck-secondary-button-border-radius': '0.5rem',
        '--ck-secondary-button-hover-border-radius': '0.5rem',
        '--ck-secondary-button-active-border-radius': '0.5rem',

        // Return and close button
        '--ck-body-action-color': theme.extend.colors.lightBlack,
        '--ck-body-action-hover-color': theme.extend.colors.lightBlack,

        // Return and close button hover
        '--ck-body-background-secondary': theme.extend.colors.white,

        // More available tooltip
        '--ck-tooltip-background': theme.extend.colors.primary,
        '--ck-tooltip-color': theme.extend.colors.white,

        // Title + scrollbar
        '--ck-body-color-muted': theme.extend.colors.lightBlack,
        '--ck-body-divider': theme.extend.colors.lightBlack,

        // QR Code
        '--ck-qr-dot-color': theme.extend.colors.lightBlack,
        '--ck-qr-border-color': theme.extend.colors.lightBlack,
        '--ck-qr-border-radius': '0.5rem',
        

        '--ck-body-background-tertiary': theme.extend.colors.background,
      }}
    >
      <AuthHandler />

      {children}
    </ConnectKitProvider>
  );
};
