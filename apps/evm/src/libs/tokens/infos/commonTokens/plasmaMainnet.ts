import { NATIVE_TOKEN_ADDRESS } from "constants/address";
import plasmaLogo from "libs/tokens/img/plasma.svg";
import usdt0Logo from "libs/tokens/img/usdt0.svg";
import usdeLogo from "libs/tokens/img/usde.svg";
import susdeLogo from "libs/tokens/img/susde.svg";
import wethLogo from "libs/tokens/img/weth.svg";
import xvsLogo from "libs/tokens/img/xvs.svg";
import xusdLogo from "libs/tokens/img/xusd.svg";
import plusdLogo from "libs/tokens/img/plusd.svg";
import splusdLogo from "libs/tokens/img/splusd.svg";
import type { Token } from "types";

const xplToken: Token = {
  address: NATIVE_TOKEN_ADDRESS,
  decimals: 18,
  symbol: "XPL",
  asset: plasmaLogo,
  isNative: true,
};

export const tokens: Token[] = [
  xplToken,
  {
    symbol: "WXPL",
    decimals: 18,
    address: "0x6100E367285b01F48D07953803A2d8dCA5D19873",
    asset: plasmaLogo,
    tokenWrapped: xplToken
  },
  {
    symbol: "USDT0",
    decimals: 6,
    address: "0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb",
    asset: usdt0Logo
  },
  {
    symbol: "sUSDe",
    decimals: 18,
    address: "0x211Cc4DD073734dA055fbF44a2b4667d5E5fE5d2",
    asset: usdeLogo
  },
  {
    symbol: "USDe",
    decimals: 18,
    address: "0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34",
    asset: susdeLogo
  },
  {
    symbol: "WETH",
    decimals: 18,
    address: "0x9895D81bB462A195b4922ED7De0e3ACD007c32CB",
    asset: wethLogo
  },
  {
    symbol: "plUSD",
    decimals: 18,
    address: "0xf91c31299E998C5127Bc5F11e4a657FC0cF358CD",
    asset: plusdLogo
  },
  {
    symbol: "splUSD",
    decimals: 18,
    address: "0x616185600989Bf8339b58aC9e539d49536598343",
    asset: splusdLogo
  },
  {
    symbol: "xUSD",
    decimals: 6,
    address: "0x6eAf19b2FC24552925dB245F9Ff613157a7dbb4C",
    asset: xusdLogo
  },
  {
    address: "0xc1Eb7689147C81aC840d4FF0D298489fc7986d52",
    decimals: 18,
    symbol: "XVS",
    asset: xvsLogo,
  }
];