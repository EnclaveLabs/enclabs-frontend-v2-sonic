import { EnclabsTreveeVeManager } from "libs/contracts";
import type { ContractTxData } from "types";
import BigNumber from "bignumber.js";

export interface UnwrapVeNftInput {
  enclabsTreveeVeManagerContract: EnclabsTreveeVeManager;
  amountMantissa: BigNumber;
}

export type UnwrapVeNftOutput = ContractTxData<
  EnclabsTreveeVeManager,
  "withdraw"
>;

const unwrapVeNft = ({
  enclabsTreveeVeManagerContract,
  amountMantissa,
}: UnwrapVeNftInput): UnwrapVeNftOutput => ({
  contract: enclabsTreveeVeManagerContract,
  methodName: "withdraw",
  args: [amountMantissa.toFixed()],
});

export default unwrapVeNft;
