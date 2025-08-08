import type { Provider } from "libs/wallet";
import { ChainId, TreveeVeNFT } from "types";
import BigNumber from "bignumber.js";

export interface GetVeNftTokenVotedInput {
  veNftContract: TreveeVeNFT;
  tokenId: BigNumber;
  chainId: ChainId;
  provider: Provider;
}

export type GetVeNftTokenVotedOutput = {
  isVoted: boolean;
};

const getVeNftTokenVoted = async ({
  veNftContract,
  provider,
  chainId,
  tokenId,
}: GetVeNftTokenVotedInput): Promise<GetVeNftTokenVotedOutput> => {
  const isVoted = await veNftContract.voted(tokenId.toString());

  return {
    isVoted,
  };
};

export default getVeNftTokenVoted;
