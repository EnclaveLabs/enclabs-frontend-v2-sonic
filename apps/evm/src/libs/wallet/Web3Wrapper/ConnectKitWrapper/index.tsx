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
        '--ck-primary-button-box-shadow': '0px 8px 6px 0px rgba(0, 0, 0, 0.05)',
        '--ck-primary-button-border-radius': '0.5rem',
        '--ck-primary-button-hover-border-radius': '0.5rem',
        '--ck-primary-button-active-border-radius': '0.5rem',
        '--ck-primary-button-background': theme.colors.cards,
        '--ck-primary-button-color': theme.colors.blue,
        '--ck-primary-button-hover-color': theme.colors.white,
        '--ck-primary-button-hover-background': theme.colors.blue,
        '--ck-primary-button-active-background': theme.colors.blue,

        // Copy to clipboard button
        '--ck-secondary-button-background': theme.colors.blue,
        '--ck-secondary-button-hover-background': theme.colors.mediumBlue,
        '--ck-secondary-button-hover-color': theme.colors.white,
        '--ck-secondary-button-active-background': theme.colors.white,
        '--ck-secondary-button-border-radius': '0.5rem',
        '--ck-secondary-button-hover-border-radius': '0.5rem',
        '--ck-secondary-button-active-border-radius': '0.5rem',

        // Return and close button
        '--ck-body-action-color': theme.colors.lightBlack,
        '--ck-body-action-hover-color': theme.colors.lightBlack,

        // Return and close button hover
        '--ck-body-background-secondary': theme.colors.white,

        // More available tooltip
        '--ck-tooltip-background': theme.colors.blue,
        '--ck-tooltip-color': theme.colors.white,

        // Title + scrollbar
        '--ck-body-color': theme.colors.lightBlack,
        '--ck-body-color-muted': theme.colors.lightBlack,
        '--ck-body-divider': theme.colors.lightBlack,

        // QR Code
        '--ck-qr-dot-color': theme.colors.lightBlack,
        '--ck-qr-border-color': theme.colors.lightBlack,
        '--ck-qr-border-radius': '0.5rem',
        

        '--ck-body-background-tertiary': theme.colors.blue,

        '--ck-body-background': theme.colors.background,
      }}
    >
      <AuthHandler />

      {children}
    </ConnectKitProvider>
  );
};
