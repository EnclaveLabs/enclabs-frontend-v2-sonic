import { getDefaultConfig } from 'connectkit';
import { http, createConfig } from 'wagmi';

import localConfig from 'config';
import type { ChainId } from 'types';
import type { Transport } from 'viem';
import { chains } from '../chains';
import { WALLET_CONNECT_PROJECT_ID } from '../constants';

const connectKitConfig = getDefaultConfig({
  chains,
  transports: chains.reduce((acc, chain) => {
    const url = localConfig.rpcUrls[chain.id as ChainId];

    return {
      ...acc,
      [chain.id]: http(url),
    };
  }, {}) as Record<ChainId, Transport>,
  walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,
  appName: 'Enclabs',
  appUrl: 'https://enclabs.finance',
  appDescription:
    'Enclabs is a decentralized finance (DeFi) algorithmic money market protocol on Sonic.',
  appIcon: 'https://enclabs.finance/favicon.ico',
});

const config = createConfig(connectKitConfig);

export default config;
