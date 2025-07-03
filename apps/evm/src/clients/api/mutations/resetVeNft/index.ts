import { TreveeVeUSDVoter } from "libs/contracts";
import type { ContractTxData } from "types";

export interface ResetVeNftInput {
  veNftVoterContract: TreveeVeUSDVoter;
  tokenId: string;
}

export type ResetVeNftOutput = ContractTxData<TreveeVeUSDVoter, "reset">;

const resetVeNft = ({
  veNftVoterContract,
  tokenId,
}: ResetVeNftInput): ResetVeNftOutput => ({
  contract: veNftVoterContract,
  methodName: "reset",
  args: [tokenId],
});

export default resetVeNft;
