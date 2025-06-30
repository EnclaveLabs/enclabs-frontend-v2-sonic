import BigNumber from "bignumber.js";

import type { Provider } from "libs/wallet";
import {
  getTreveeVeUSDContract,
  TreveeVeUSD,
} from "../../../../libs/contracts";
import { ChainId } from "types";

export interface GetVeUsdTokenOfOwnerByIndexInput {
  accountAddress: string;
  tokenIndex: number;
  chainId: ChainId;
  provider: Provider;
}

export type GetVeUsdTokenOfOwnerByIndexOutput = {
  tokenId: BigNumber;
};

const getVeUsdTokenOfOwnerByIndex = async ({
  provider,
  accountAddress,
  chainId,
  tokenIndex,
}: GetVeUsdTokenOfOwnerByIndexInput): Promise<GetVeUsdTokenOfOwnerByIndexOutput> => {
  let tokenId: BigNumber;

  const VeUsdContract = getTreveeVeUSDContract({
    chainId,
    signerOrProvider: provider,
  }) as TreveeVeUSD;
  const tokenIdResp = await VeUsdContract?.tokenOfOwnerByIndex(
    accountAddress,
    tokenIndex
  );
  tokenId = new BigNumber(tokenIdResp?.toString() || 0);

  return {
    tokenId,
  };
};

export default getVeUsdTokenOfOwnerByIndex;
