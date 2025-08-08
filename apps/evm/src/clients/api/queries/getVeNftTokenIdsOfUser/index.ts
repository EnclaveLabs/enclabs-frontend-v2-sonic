import type { BigNumber } from "ethers";
import type { TreveeVeNFT } from "types";
import type { Provider } from "@ethersproject/providers";

export interface GetNftTokenIdsInput {
  veNftContract: TreveeVeNFT;
  accountAddress: string;
  provider: Provider;
}

export type GetNftTokenIdsOutput = { tokenIds: BigNumber[] };

const getNftTokenIdsOfUser = async ({
  veNftContract,
  accountAddress,
  provider,
}: GetNftTokenIdsInput): Promise<GetNftTokenIdsOutput> => {
  const balance = await veNftContract.balanceOf(accountAddress);
  const indices = [...Array(balance.toNumber()).keys()];

  const tokenIds = await Promise.all(
    indices.map((i) => veNftContract.tokenOfOwnerByIndex(accountAddress, i))
  );

  return { tokenIds };
};

export default getNftTokenIdsOfUser;
