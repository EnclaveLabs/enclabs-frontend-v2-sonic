import type { Provider } from "libs/wallet";
import type { NFT } from "types";
import { getNFTContract } from "../../../../libs/contracts/utilities/getNFTContract";
import BigNumber from "bignumber.js";

export interface GetNftApprovedInput {
  tokenId: BigNumber;
  nft: NFT;
  provider: Provider;
}

export type GetNftApprovedOutput = {
  approvedAddress: string;
};

const getNftApproved = async ({
  provider,
  tokenId,
  nft,
}: GetNftApprovedInput): Promise<GetNftApprovedOutput> => {
  let approvedAddress: string;

  const nftContract = getNFTContract({
    nft,
    signerOrProvider: provider,
  });
  approvedAddress = await nftContract.getApproved(tokenId.toString());

  return {
    approvedAddress,
  };
};

export default getNftApproved;
