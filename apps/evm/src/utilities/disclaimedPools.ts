import { Pool } from "types";

export const poolDisclaimerKey = (poolAddress: string) =>
  `poolDisclaimerAccepted:${poolAddress.toLowerCase()}`;

export const hasAcceptedPoolDisclaimer = (poolAddress: string) => {
  if (typeof window === 'undefined') return true; // SSR: don't block
  return localStorage.getItem(poolDisclaimerKey(poolAddress)) === '1';
};

export const setAcceptedPoolDisclaimer = (poolAddress: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(poolDisclaimerKey(poolAddress), '1');
};

export const isPoolDisclaimed = (pool: Pool) => {
  return disclaimedPools.some(p => p === pool.comptrollerAddress);
};

export const disclaimedPools: string[] = [
  '0x0c9425eCFbd64a96D306f36e8281EE5308446d31' // Isolated Sonic Ecosystem Pool
]