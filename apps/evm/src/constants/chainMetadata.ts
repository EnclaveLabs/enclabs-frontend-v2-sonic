import { getToken } from 'libs/tokens/utilities/getToken';
import arbitrumLogo from 'libs/wallet/img/chains/arbitrum.svg';
import { ChainId, type ChainMetadata } from 'types';

const PROPOSAL_EXECUTION_GRACE_PERIOD_MS = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds

export const CHAIN_METADATA: {
  [chainId in ChainId]: ChainMetadata;
} = 
{
  [ChainId.SONIC_MAINNET]: {
    name: 'Sonic',
    logoSrc: arbitrumLogo,
    explorerUrl: 'https://sonicscan.org',
    layerZeroScanUrl: 'https://layerzeroscan.com',
    corePoolComptrollerContractAddress: '0xccAdFCFaa71407707fb3dC93D7d83950171aA2c9',
    lstPoolComptrollerContractAddress: '0xf27f74f5878bc0dA077FCc0933FAEe49216B5bBA',
    lstPoolVWstEthContractAddress: '0x9df6B5132135f14719696bBAe3C54BAb272fDb16',
    nativeToken: getToken({ chainId: ChainId.SONIC_MAINNET, symbol: 'S' })!,
    rpcUrl: 'https://rpc.soniclabs.com',
    marketsSubgraphUrl:
       //'https://gateway-arbitrum.network.thegraph.com/api/43fa98f50f96a8e1b63423e8ead8c6dc/deployments/id/QmQByQzsGpuVqaZcfraxQduUwMX4JpnAnFd1s1JTkSUREj',
      'https://api.studio.thegraph.com/query/91097/enclabs-arb-test/version/latest',
  }

};
