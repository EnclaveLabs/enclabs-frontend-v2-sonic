import type { Provider } from "libs/wallet";
import { ChainId, TreveeVeNFT } from "types";
import BigNumber from "bignumber.js";

export interface GetVeNftTokenAttachedInput {
  veNftContract: TreveeVeNFT;
  tokenId: BigNumber;
  chainId: ChainId;
  provider: Provider;
}

export type GetVeNftTokenAttachedOutput = {
  isAttached: boolean;
};

const getVeNftTokenAttached = async ({
  veNftContract,
  provider,
  chainId,
  tokenId,
}: GetVeNftTokenAttachedInput): Promise<GetVeNftTokenAttachedOutput> => {
  const isAttachedNb = await veNftContract.attachments(tokenId.toString());
  const isAttached = !isAttachedNb.isZero();

  return {
    isAttached,
  };
};

export default getVeNftTokenAttached;
