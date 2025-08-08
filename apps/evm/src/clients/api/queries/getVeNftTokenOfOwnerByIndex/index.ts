import BigNumber from "bignumber.js";

import type { Provider } from "libs/wallet";
import { ChainId, TreveeVeNFT } from "types";

export interface GetVeNftTokenOfOwnerByIndexInput {
  veNftContract: TreveeVeNFT;
  accountAddress: string;
  tokenIndex: number;
  chainId: ChainId;
  provider: Provider;
}

export type GetVeNftTokenOfOwnerByIndexOutput = {
  tokenId: BigNumber;
};

const getVeNftTokenOfOwnerByIndex = async ({
  veNftContract,
  provider,
  accountAddress,
  chainId,
  tokenIndex,
}: GetVeNftTokenOfOwnerByIndexInput): Promise<GetVeNftTokenOfOwnerByIndexOutput> => {
  let tokenId: BigNumber;
  const tokenIdResp = await veNftContract?.tokenOfOwnerByIndex(
    accountAddress,
    tokenIndex
  );
  tokenId = new BigNumber(tokenIdResp?.toString() || 0);

  return {
    tokenId,
  };
};

export default getVeNftTokenOfOwnerByIndex;
