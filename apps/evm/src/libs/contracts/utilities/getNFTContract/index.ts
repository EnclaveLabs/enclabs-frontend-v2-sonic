import type { Provider } from "@ethersproject/abstract-provider";
import type { Signer } from "ethers";
import { NFT } from "../../../../types";
import {
  getERC721Contract,
  getTreveeVeUSDContract,
} from "../../generated/getters";

export interface GetNftContractInput {
  nft: NFT;
  signerOrProvider: Signer | Provider;
}

export const getNFTContract = ({
  nft,
  signerOrProvider,
}: GetNftContractInput) => {
  const input = {
    address: nft.address,
    signerOrProvider,
  };

  if (nft.symbol === "veUSD") {
    return getTreveeVeUSDContract(input);
  }

  return getERC721Contract(input);
};
