import { NATIVE_TOKEN_ADDRESS } from 'constants/address';
import crvLogo from 'libs/tokens/img/crv.svg';
import crvUsdLogo from 'libs/tokens/img/crvUsd.svg';
import daiLogo from 'libs/tokens/img/dai.svg';
import eBtcLogo from 'libs/tokens/img/eBtc.png';
import eigenLogo from 'libs/tokens/img/eigen.svg';
import ethLogo from 'libs/tokens/img/eth.svg';
import ezEthLogo from 'libs/tokens/img/ezEth.png';
import fraxLogo from 'libs/tokens/img/frax.svg';
import ptWeethLogo from 'libs/tokens/img/ptWeeth.svg';
import pufEthLogo from 'libs/tokens/img/pufEth.svg';
import rsEthLogo from 'libs/tokens/img/rsEth.svg';
import sFraxLogo from 'libs/tokens/img/sFrax.svg';
import sfrxEthLogo from 'libs/tokens/img/sfrxEth.svg';
import tusdLogo from 'libs/tokens/img/tusd.svg';
import usdcLogo from 'libs/tokens/img/usdc.svg';
import usdtLogo from 'libs/tokens/img/usdt.svg';
import wbtcLogo from 'libs/tokens/img/wbtc.svg';
import weEthLogo from 'libs/tokens/img/weEth.svg';
import weEthsLogo from 'libs/tokens/img/weeths.svg';
import wethLogo from 'libs/tokens/img/weth.svg';
import wstEthLogo from 'libs/tokens/img/wstEth.svg';
import xvsLogo from 'libs/tokens/img/xvs.svg';
import type { Token } from 'types';

const ethToken: Token = {
  address: NATIVE_TOKEN_ADDRESS,
  decimals: 18,
  symbol: 'ETH',
  asset: ethLogo,
  isNative: true,
};

export const tokens: Token[] = [
  ethToken,
  {
    address: '0x66ebd019E86e0af5f228a0439EBB33f045CBe63E',
    decimals: 18,
    symbol: 'XVS',
    asset: xvsLogo,
  },
  {
    address: '0x92A2928f5634BEa89A195e7BeCF0f0FEEDAB885b',
    decimals: 8,
    symbol: 'WBTC',
    asset: wbtcLogo,
  },
  {
    address: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
    decimals: 18,
    symbol: 'WETH',
    asset: wethLogo,
    tokenWrapped: ethToken,
  },
  {
    address: '0x8d412FD0bc5d826615065B931171Eed10F5AF266',
    decimals: 6,
    symbol: 'USDT',
    asset: usdtLogo,
  },
  {
    address: '0x772d68929655ce7234C8C94256526ddA66Ef641E',
    decimals: 6,
    symbol: 'USDC',
    asset: usdcLogo,
  },
  {
    address: '0x2c78EF7eab67A6e0C9cAa6f2821929351bdDF3d3',
    decimals: 18,
    symbol: 'CRV',
    asset: crvLogo,
  },
  {
    address: '0x36421d873abCa3E2bE6BB3c819C0CF26374F63b6',
    decimals: 18,
    symbol: 'crvUSD',
    asset: crvUsdLogo,
  },
  {
    address: '0x9b87ea90fdb55e1a0f17fbeddcf7eb0ac4d50493',
    decimals: 18,
    symbol: 'wstETH',
    asset: wstEthLogo,
  },
  {
    address: '0x3b8b6E96e57f0d1cD366AaCf4CcC68413aF308D0',
    decimals: 18,
    symbol: 'weETH',
    asset: weEthLogo,
  },
  {
    address: '0x78b292069da1661b7C12B6E766cB506C220b987a',
    decimals: 18,
    symbol: 'TUSD',
    asset: tusdLogo,
  },
  {
    address: '0x75236711d42D0f7Ba91E03fdCe0C9377F5b76c07',
    decimals: 18,
    symbol: 'DAI',
    asset: daiLogo,
  },
  {
    address: '0x10630d59848547c9F59538E2d8963D63B912C075',
    decimals: 18,
    symbol: 'FRAX',
    asset: fraxLogo,
  },
  {
    address: '0xd85FfECdB4287587BC53c1934D548bF7480F11C4',
    decimals: 18,
    symbol: 'sFRAX',
    asset: sFraxLogo,
  },
  {
    address: '0x56107201d3e4b7Db92dEa0Edb9e0454346AEb8B5',
    decimals: 18,
    symbol: 'PT-weETH-DEC24',
    asset: ptWeethLogo,
  },
  {
    address: '0xfA0614E5C803E15070d31f7C38d2d430EBe68E47',
    decimals: 18,
    symbol: 'rsETH',
    asset: rsEthLogo,
  },
  {
    address: '0x14AECeEc177085fd09EA07348B4E1F7Fcc030fA1',
    decimals: 18,
    symbol: 'sfrxETH',
    asset: sfrxEthLogo,
  },
  {
    address: '0xB8eb706b85Ae7355c9FE4371a499F50f3484809c',
    decimals: 18,
    symbol: 'ezETH',
    asset: ezEthLogo,
  },
  {
    address: '0xE233527306c2fa1E159e251a2E5893334505A5E0',
    decimals: 18,
    symbol: 'weETHs',
    asset: weEthsLogo,
  },
  {
    address: '0x6D9f78b57AEeB0543a3c3B32Cc038bFB14a4bA68',
    decimals: 18,
    symbol: 'pufETH',
    asset: pufEthLogo,
  },
  {
    address: '0xf140594470Bff436aE82F2116ab8a438671C6e83',
    decimals: 18,
    symbol: 'EIGEN',
    asset: eigenLogo,
  },
  {
    address: '0xd48392CCf3fe028023D0783E570DFc71996859d7',
    decimals: 8,
    symbol: 'eBTC',
    asset: eBtcLogo,
  },
];
