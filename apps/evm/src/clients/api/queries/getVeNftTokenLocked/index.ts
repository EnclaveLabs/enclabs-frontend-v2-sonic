import type { Provider } from "libs/wallet";
import { ChainId, TreveeVeNFT } from "types";
import BigNumber from "bignumber.js";

export interface GetVeNftTokenLockedInput {
  veNftContract: TreveeVeNFT;
  tokenId: BigNumber;
  chainId: ChainId;
  provider: Provider;
}

export type GetVeNftTokenLockedOutput = {
  amount: BigNumber;
  end: BigNumber;
};

const getVeNftTokenLocked = async ({
  veNftContract,
  provider,
  chainId,
  tokenId,
}: GetVeNftTokenLockedInput): Promise<GetVeNftTokenLockedOutput> => {
  const tokenIdResp = await veNftContract.locked(tokenId.toNumber());

  return {
    amount: new BigNumber(tokenIdResp.amount.toString()),
    end: new BigNumber(tokenIdResp.end.toString()),
  };
};

export default getVeNftTokenLocked;
