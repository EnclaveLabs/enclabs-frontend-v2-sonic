import type { ContractTxData } from "types";
import { TreveeVoter } from "types";

export interface ResetVeNftInput {
  veNftVoterContract: TreveeVoter;
  tokenId: string;
}

export type ResetVeNftOutput = ContractTxData<TreveeVoter, "reset">;

const resetVeNft = ({
  veNftVoterContract,
  tokenId,
}: ResetVeNftInput): ResetVeNftOutput => ({
  contract: veNftVoterContract,
  methodName: "reset",
  args: [tokenId],
});

export default resetVeNft;
