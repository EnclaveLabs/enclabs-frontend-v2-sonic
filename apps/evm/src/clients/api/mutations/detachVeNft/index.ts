import type { ContractTxData } from "types";
import { TreveeVeNFT } from "types";

export interface DetachVeNftInput {
  veNftContract: TreveeVeNFT;
  tokenId: string;
}

export type DetachVeNftOutput = ContractTxData<TreveeVeNFT, "detach">;

const detachVeNft = ({
  veNftContract,
  tokenId,
}: DetachVeNftInput): DetachVeNftOutput => ({
  contract: veNftContract,
  methodName: "detach",
  args: [tokenId],
});

export default detachVeNft;
