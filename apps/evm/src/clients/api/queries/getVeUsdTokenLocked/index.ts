import type { Provider } from "libs/wallet";
import {
  getTreveeVeUSDContract,
  TreveeVeUSD,
} from "../../../../libs/contracts";
import { ChainId } from "types";
import BigNumber from "bignumber.js";

export interface GetVeUsdTokenLockedInput {
  tokenId: BigNumber;
  chainId: ChainId;
  provider: Provider;
}

export type GetVeUsdTokenLockedOutput = {
  amount: BigNumber;
  end: BigNumber;
};

const getVeUsdTokenLocked = async ({
  provider,
  chainId,
  tokenId,
}: GetVeUsdTokenLockedInput): Promise<GetVeUsdTokenLockedOutput> => {
  const VeUsdContract = getTreveeVeUSDContract({
    chainId,
    signerOrProvider: provider,
  }) as TreveeVeUSD;
  const tokenIdResp = await VeUsdContract.locked(tokenId.toNumber());

  return {
    amount: new BigNumber(tokenIdResp.amount.toString()),
    end: new BigNumber(tokenIdResp.end.toString()),
  };
};

export default getVeUsdTokenLocked;
