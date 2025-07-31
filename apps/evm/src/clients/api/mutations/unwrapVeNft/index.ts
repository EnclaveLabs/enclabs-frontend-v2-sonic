import type { ContractTxData, EnclabsTreveeVeManager } from "types";
import BigNumber from "bignumber.js";

export interface UnwrapVeNftInput {
  enclabsTreveeVeManager: EnclabsTreveeVeManager;
  amountMantissa: BigNumber;
}

export type UnwrapVeNftOutput = ContractTxData<
  EnclabsTreveeVeManager,
  "withdraw"
>;

const unwrapVeNft = ({
  enclabsTreveeVeManager,
  amountMantissa,
}: UnwrapVeNftInput): UnwrapVeNftOutput => ({
  contract: enclabsTreveeVeManager,
  methodName: "withdraw",
  args: [amountMantissa.toFixed()],
});

export default unwrapVeNft;
