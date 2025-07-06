import { EnclabsTreveeVeManager } from "libs/contracts";
import type { ContractTxData } from "types";

export interface WrapVeNftInput {
  enclabsTreveeVeManagerContract: EnclabsTreveeVeManager;
  tokenId: string;
}

export type WrapVeNftOutput = ContractTxData<EnclabsTreveeVeManager, "deposit">;

const wrapVeNft = ({
  enclabsTreveeVeManagerContract,
  tokenId,
}: WrapVeNftInput): WrapVeNftOutput => ({
  contract: enclabsTreveeVeManagerContract,
  methodName: "deposit",
  args: [tokenId],
});

export default wrapVeNft;
