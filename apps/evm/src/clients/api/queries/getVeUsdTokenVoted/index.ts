import type { Provider } from "libs/wallet";
import {
  getTreveeVeUSDContract,
  TreveeVeUSD,
} from "../../../../libs/contracts";
import { ChainId } from "types";
import BigNumber from "bignumber.js";

export interface GetVeUsdTokenVotedInput {
  tokenId: BigNumber;
  chainId: ChainId;
  provider: Provider;
}

export type GetVeUsdTokenVotedOutput = {
  isVoted: boolean;
};

const getVeUsdTokenVoted = async ({
  provider,
  chainId,
  tokenId,
}: GetVeUsdTokenVotedInput): Promise<GetVeUsdTokenVotedOutput> => {
  const VeUsdContract = getTreveeVeUSDContract({
    chainId,
    signerOrProvider: provider,
  }) as TreveeVeUSD;
  const isVoted = await VeUsdContract.voted(tokenId.toNumber());

  return {
    isVoted,
  };
};

export default getVeUsdTokenVoted;
