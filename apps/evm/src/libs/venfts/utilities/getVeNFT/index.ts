import type { ChainId } from "types";
import { VeNFTs } from "../../infos";

export interface GetVeNFTInput {
  chainId: ChainId;
  symbol: string;
}

export const getVeNFT = ({ chainId, symbol }: GetVeNFTInput) => {
  const chainVeNFTs = VeNFTs[chainId];
  return chainVeNFTs.find((nft) => nft.symbol === symbol);
};
