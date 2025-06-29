import type { ChainId, NFT } from "types";

export type VeNFTMapping = {
  [chainId in ChainId]: NFT[];
};
