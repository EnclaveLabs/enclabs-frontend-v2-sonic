import { NATIVE_TOKEN_ADDRESS } from "constants/address";
import sonicLogo from "libs/tokens/img/sonic.svg";
import sonicTokenLogo from "libs/tokens/img/sonic-token.svg";
import usdcLogo from "libs/tokens/img/usdc.svg";
import wethLogo from "libs/tokens/img/weth.svg";
import stSLogo from "libs/tokens/img/stS.svg";
import wOSLogo from "libs/tokens/img/wos.svg";
import veUSDLogo from "libs/tokens/img/veusd.svg";
import scETHLogo from "libs/tokens/img/sceth.svg";
import scUSDLogo from "libs/tokens/img/scusd.svg";
import stkscUSD from "libs/tokens/img/stkscUSD.svg";
import spectraPTscUSDLogo from "libs/tokens/img/spectraPTscUSDicon.svg";
import pendlePTscUSDLogo from "libs/tokens/img/PendlePTscUSD.svg";
import spectraPTscETHLogo from "libs/tokens/img/spectraPTscETH.svg";
import xUSDLogo from "libs/tokens/img/xusd.svg";
import xvsLogo from "libs/tokens/img/xvs.svg";
import scusdstablejackytLogo from "libs/tokens/img/jack-yt-scusd.svg";
import EURClogo from "libs/tokens/img/EURC.svg";
import wmetaUSDlogo from "libs/tokens/img/wmetaUSD.svg";
import enclabsVeUSDLogo from "libs/tokens/img/veEnclabs-scUSD.svg";
import type { Token } from "types";

const ethToken: Token = {
  address: NATIVE_TOKEN_ADDRESS,
  decimals: 18,
  symbol: "S",
  asset: sonicLogo,
  isNative: true,
};

export const tokens: Token[] = [
  ethToken,
  {
    address: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
    decimals: 18,
    symbol: "wS",
    asset: sonicTokenLogo,
    tokenWrapped: ethToken,
  },
  {
    address: "0xd2901D474b351bC6eE7b119f9c920863B0F781b2",
    decimals: 18,
    symbol: "StableJack scUSD YieldToken",
    asset: scusdstablejackytLogo,
  },
  {
    address: "0xE5DA20F15420aD15DE0fa650600aFc998bbE3955",
    decimals: 18,
    symbol: "stS",
    asset: stSLogo,
  },
  {
    address: "0x3bce5cb273f0f148010bbea2470e7b5df84c7812",
    decimals: 18,
    symbol: "scETH",
    asset: scETHLogo,
  },
  {
    address: "0x0966cae7338518961c2d35493d3eb481a75bb86b",
    decimals: 0,
    symbol: "veUSD",
    asset: veUSDLogo,
  },
  {
    address: "0xd3dce716f3ef535c5ff8d041c1a41c3bd89b97ae",
    decimals: 6,
    symbol: "scUSD",
    asset: scUSDLogo,
  },
  {
    address: "0x4d85ba8c3918359c78ed09581e5bc7578ba932ba",
    decimals: 6,
    symbol: "stkscUSD",
    asset: stkscUSD,
  },
  {
    address: "0xd02962DC00A058a00Fc07A8AA9F760ab6D9Bd163",
    decimals: 6,
    symbol: "Enclabs Trevee veUSD",
    asset: enclabsVeUSDLogo,
  },
  {
    address: "0x7002383d2305b8f3b2b7786f50c13d132a22076d",
    decimals: 6,
    symbol: "Spectra PT wstkscUSD",
    asset: spectraPTscUSDLogo,
  },
  {
    address: "0x3a7ba84bbe869ed318e654dd9b6ff3cf6d531e91",
    decimals: 18,
    symbol: "Spectra PT wstkscETH",
    asset: spectraPTscETHLogo,
  },
  {
    address: "0xbe27993204ec64238f71a527b4c4d5f4949034c3",
    decimals: 6,
    symbol: "Pendle PT wstkscUSD (29MAY2025)",
    asset: pendlePTscUSDLogo,
  },
  {
    address: "0x9F0dF7799f6FDAd409300080cfF680f5A23df4b1",
    decimals: 18,
    symbol: "wOS",
    asset: wOSLogo,
  },
  {
    address: "0x6202B9f02E30E5e1c62Cc01E4305450E5d83b926",
    decimals: 6,
    symbol: "xUSD",
    asset: xUSDLogo,
  },
  // {
  //   address: '0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38',
  //   decimals: 8,
  //   symbol: 'WBTC',
  //   asset: wbtcLogo,
  // },
  {
    address: "0x50c42deacd8fc9773493ed674b675be577f2634b",
    decimals: 18,
    symbol: "WETH",
    asset: wethLogo,
  },
  {
    address: "0x29219dd400f2bf60e5a23d13be72b486d4038894",
    decimals: 6,
    symbol: "USDC",
    asset: usdcLogo,
  },
  {
    address: "0xe715cbA7B5cCb33790ceBFF1436809d36cb17E57",
    decimals: 6,
    symbol: "EURC",
    asset: EURClogo,
  },
  {
    address: "0xAaAaaAAac311D0572Bffb4772fe985A750E88805",
    decimals: 18,
    symbol: "wmetaUSD (Stability)",
    asset: wmetaUSDlogo,
  },
  // {
  //   address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
  //   decimals: 6,
  //   symbol: 'USDT',
  //   asset: usdtLogo,
  // },
  {
    address: "0xc1Eb7689147C81aC840d4FF0D298489fc7986d52",
    decimals: 18,
    symbol: "XVS",
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
