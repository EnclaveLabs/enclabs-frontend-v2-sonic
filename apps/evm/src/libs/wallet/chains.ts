import {
  type Chain,
  arbitrum as arbitrumOne,
  arbitrumSepolia,
  bsc as bscMainnet,
  bscTestnet,
  mainnet as ethereum,
  opBNB as opBNBMainnet,
  opBNBTestnet,
  optimism as optimismMainnet,
  optimismSepolia,
  sepolia,
  zksync as zksyncMainnet,
  zksyncSepoliaTestnet,
} from 'wagmi/chains';

import localConfig from 'config';
import { ChainId } from 'types';

export const sonicMainnet: Chain = {
  id: ChainId.SONIC_MAINNET,
  name: 'Sonic Mainnet',
  nativeCurrency: {
    name: 'Sonic',
    symbol: 'S',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.soniclabs.com'],
    },
    public: {
      http: ['https://rpc.soniclabs.com'],
    },
  },
  blockExplorers: {
    default: { name: 'SonicScan', url: 'https://sonicscan.org' },
  },
};

export const plasmaMainnet: Chain = {
  id: ChainId.PLASMMA_MAINET,
  name: 'Plasma Mainnet',
  nativeCurrency: {
    name: 'Plasma',
    symbol: 'XPL',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.plasma.to'],
    },
    public: {
      http: ['https://rpc.plasma.to'],
    },
  },
  blockExplorers: {
    default: { name: 'PlasmaScan', url: 'https://plasmascan.to/' },
  },
};

const getSupportedChains = (): [Chain, ...Chain[]] => {
  if (localConfig.network === 'testnet') {
    return [
      sonicMainnet,
      plasmaMainnet
    ];
  }

  return [
    sonicMainnet,
    plasmaMainnet
  ];
};

export const governanceChain = localConfig.network === 'testnet' ? bscTestnet : bscMainnet;

export const chains = getSupportedChains();

export const defaultChain = chains[0];
