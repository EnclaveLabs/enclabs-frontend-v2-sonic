import BigNumber from "bignumber.js";

import type { Provider } from "libs/wallet";
import type { NFT } from "types";
import { getNFTContract } from "../../../../libs/contracts/utilities/getNFTContract";

export interface GetNftBalanceOfInput {
  accountAddress: string;
  nft: NFT;
  provider: Provider;
}

export type GetNftBalanceOfOutput = {
  balance: BigNumber;
};

const getNftBalanceOf = async ({
  provider,
  accountAddress,
  nft,
}: GetNftBalanceOfInput): Promise<GetNftBalanceOfOutput> => {
  let balance: BigNumber;

  const nftContract = getNFTContract({
    nft,
    signerOrProvider: provider,
  });
  const resp = await nftContract.balanceOf(accountAddress);
  balance = new BigNumber(resp.toString());

  return {
    balance,
  };
};

export default getNftBalanceOf;
