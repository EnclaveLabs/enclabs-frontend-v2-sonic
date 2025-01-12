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

export const sonicMainnet: Chain = {
  id: 146,
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

const getSupportedChains = (): [Chain, ...Chain[]] => {
  if (localConfig.network === 'testnet') {
    return [
      sonicMainnet
    ];
  }

  return [
    sonicMainnet
  ];
};

export const governanceChain = localConfig.network === 'testnet' ? bscTestnet : bscMainnet;

export const chains = getSupportedChains();

export const defaultChain = chains[0];
