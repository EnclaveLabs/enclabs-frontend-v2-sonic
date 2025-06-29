import BigNumber from "bignumber.js";

import { getTokenContract } from "libs/contracts";
import type { Provider } from "libs/wallet";
import type {NFT, Token} from 'types';

export interface GetBalanceOfInput {
  accountAddress: string;
  nft: NFT;
  provider: Provider;
}

export type GetBalanceOfOutput = {
  balance: BigNumber;
};

const getBalanceOf = async ({
  provider,
  accountAddress,
  nft,
}: GetBalanceOfInput): Promise<GetBalanceOfOutput> => {
  let balance: BigNumber;

    const tokenContract = getTokenContract({
      nft,
      signerOrProvider: provider,
    });
    const resp = await tokenContract.balanceOf(accountAddress);
  balance = new BigNumber(resp.toString());
  }

  return {
    balance,
  };
};

export default getBalanceOf;
