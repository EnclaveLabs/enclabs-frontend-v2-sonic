import { getToken } from 'libs/tokens/utilities/getToken';
import { ChainId, type ChainMetadata } from 'types';
import sonicLogo from 'libs/tokens/img/sonic.svg';
import plasmaLogo from 'libs/tokens/img/plasma.svg';

const PROPOSAL_EXECUTION_GRACE_PERIOD_MS = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds

export const CHAIN_METADATA: {
  [chainId in ChainId]: ChainMetadata;
} =
{
  [ChainId.SONIC_MAINNET]: {
    name: 'Sonic',
    logoSrc: sonicLogo,
    explorerUrl: 'https://sonicscan.org',
    layerZeroScanUrl: 'https://layerzeroscan.com',
    corePoolComptrollerContractAddress: '0xccAdFCFaa71407707fb3dC93D7d83950171aA2c9',
    lstPoolComptrollerContractAddress: '0xf27f74f5878bc0dA077FCc0933FAEe49216B5bBA',
    lstPoolVWstEthContractAddress: '0x9df6B5132135f14719696bBAe3C54BAb272fDb16',
    nativeToken: getToken({ chainId: ChainId.SONIC_MAINNET, symbol: 'S' })!,
    rpcUrl: 'https://sonic-rpc.publicnode.com:443',
    marketsSubgraphUrl:
      'https://api.studio.thegraph.com/query/101127/enclabs-isolated-sonic/version/latest',
  },
  [ChainId.PLASMMA_MAINET]: {
    name: 'Plasma',
    logoSrc: plasmaLogo,
    explorerUrl: 'https://plasmascan.to/',
    layerZeroScanUrl: 'https://layerzeroscan.com',
    corePoolComptrollerContractAddress: '0xA3F48548562A30A33257A752d396A20B4413E8E3',
    lstPoolComptrollerContractAddress: '0xf27f74f5878bc0dA077FCc0933FAEe49216B5bBA', // TODO plasma
    lstPoolVWstEthContractAddress: '0x9df6B5132135f14719696bBAe3C54BAb272fDb16', // TODO plasma
    nativeToken: getToken({ chainId: ChainId.PLASMMA_MAINET, symbol: 'XPL' })!,
    rpcUrl: 'https://rpc.plasma.to',
    marketsSubgraphUrl:
      'https://api.studio.thegraph.com/query/101127/enclabs-isolated-sonic/version/latest',
  }
};
