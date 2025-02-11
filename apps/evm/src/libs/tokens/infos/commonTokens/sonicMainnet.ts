import { NATIVE_TOKEN_ADDRESS } from 'constants/address';
import arbLogo from 'libs/tokens/img/arb.svg';
import sonicLogo from 'libs/tokens/img/sonic.svg';
import sonicTokenLogo from 'libs/tokens/img/sonic-token.svg';
import ethLogo from 'libs/tokens/img/eth.svg';
import usdcLogo from 'libs/tokens/img/usdc.svg';
import usdtLogo from 'libs/tokens/img/usdt.svg';
import wbtcLogo from 'libs/tokens/img/wbtc.svg';
import weEthLogo from 'libs/tokens/img/weEth.svg';
import wethLogo from 'libs/tokens/img/weth.svg';
import stSLogo from 'libs/tokens/img/stS.svg';
import wOSLogo from 'libs/tokens/img/wos.svg';
import scUSDLogo from 'libs/tokens/img/scusd.svg';
import spectraPTscUSDLogo from 'libs/tokens/img/spectraPTscUSDlogo.svg';
import wstEthLogo from 'libs/tokens/img/wstEth.svg';
import PTweETH26JUN2025Logo from 'libs/tokens/img/PTweETH26JUN2025Logo.svg';
import xvsLogo from 'libs/tokens/img/xvs.svg';
import type { Token } from 'types';

const ethToken: Token = {
  address: NATIVE_TOKEN_ADDRESS,
  decimals: 18,
  symbol: 'S',
  asset: sonicLogo,
  isNative: true,
};

export const tokens: Token[] = [
  ethToken,
  {
    address: '0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38',
    decimals: 18,
    symbol: 'wS',
    asset: sonicTokenLogo,
    tokenWrapped: ethToken,
  },
  {
    address: '0xE5DA20F15420aD15DE0fa650600aFc998bbE3955',
    decimals: 18,
    symbol: 'stS',
    asset: stSLogo,
  },
  {
    address: '0x3bce5cb273f0f148010bbea2470e7b5df84c7812',
    decimals: 18,
    symbol: 'scETH',
    asset: sonicLogo,
  },
  {
    address: '0xd3dce716f3ef535c5ff8d041c1a41c3bd89b97ae',
    decimals: 6,
    symbol: 'scUSD',
    asset: scUSDLogo,
  },
  {
    address: '0x7002383d2305b8f3b2b7786f50c13d132a22076d',
    decimals: 6,
    symbol: 'PT-sw-wstkscUSD-1751241607',
    asset: spectraPTscUSDLogo,
  },
  {
    address: '0x9F0dF7799f6FDAd409300080cfF680f5A23df4b1',
    decimals: 18,
    symbol: 'wOS',
    asset: wOSLogo,
  },
  // {
  //   address: '0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38',
  //   decimals: 8,
  //   symbol: 'WBTC',
  //   asset: wbtcLogo,
  // },
  {
    address: '0x50c42deacd8fc9773493ed674b675be577f2634b',
    decimals: 18,
    symbol: 'WETH',
    asset: wethLogo,
    
  },
  {
    address: '0x29219dd400f2bf60e5a23d13be72b486d4038894',
    decimals: 6,
    symbol: 'USDC.e',
    asset: usdcLogo,
  },
  // {
  //   address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
  //   decimals: 6,
  //   symbol: 'USDT',
  //   asset: usdtLogo,
  // },
  {
    address: '0xc1Eb7689147C81aC840d4FF0D298489fc7986d52',
    decimals: 18,
    symbol: 'XVS',
    asset: xvsLogo,
  },
  // {
  //   address: '0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe',
  //   decimals: 18,
  //   symbol: 'weETH',
  //   asset: weEthLogo,
  // },
  // {
  //   address: '0x5979D7b546E38E414F7E9822514be443A4800529',
  //   decimals: 18,
  //   symbol: 'wstETH',
  //   asset: wstEthLogo,
  // },
  // {
  //   address: '0xb33808ea0e883138680ba29311a220a7377cdb92',
  //   decimals: 18,
  //   symbol: 'PT-weETH-26JUN2025',
  //   asset: PTweETH26JUN2025Logo,
  // },
];
