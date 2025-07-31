import type { ContractTxData, EnclabsTreveeVeManager } from "types";

export interface WrapVeNftInput {
  enclabsTreveeVeManager: EnclabsTreveeVeManager;
  tokenId: string;
}

export type WrapVeNftOutput = ContractTxData<EnclabsTreveeVeManager, "deposit">;

const wrapVeNft = ({
  enclabsTreveeVeManager,
  tokenId,
}: WrapVeNftInput): WrapVeNftOutput => ({
  contract: enclabsTreveeVeManager,
  methodName: "deposit",
  args: [tokenId],
});

export default wrapVeNft;
