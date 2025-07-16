import { queryClient } from "clients/api";
import FunctionKey from "constants/functionKey";
import {
  useSendTransaction,
  type UseSendTransactionOptions,
} from "hooks/useSendTransaction";
import { useGetEnclabsTreveeVeManagerContract } from "libs/contracts";
import { useAccountAddress, useChainId } from "libs/wallet";
import { callOrThrow } from "utilities";
import unwrapVeNft, { UnwrapVeNftInput } from "./index";
import { useGetToken } from "../../../../libs/tokens";
import BigNumber from "bignumber.js";

type TrimmedUnwrapVeNftInput = Omit<
  UnwrapVeNftInput,
  "enclabsTreveeVeManagerContract"
>;
type Options = UseSendTransactionOptions<TrimmedUnwrapVeNftInput>;

const useWrapVeNft = (
  { amountMantissa }: { amountMantissa: BigNumber },
  options?: Partial<Options>
) => {
  const { chainId } = useChainId();
  const enclabsTreveeVeManagerContract = useGetEnclabsTreveeVeManagerContract({
    passSigner: true,
  });

  return useSendTransaction({
    fnKey: [FunctionKey.UNWRAP_VENFT, { amountMantissa }],
    fn: (input: TrimmedUnwrapVeNftInput) =>
      callOrThrow({ enclabsTreveeVeManagerContract }, (params) =>
        unwrapVeNft({
          ...input,
          ...params,
        })
      ),
    onConfirmed: async ({ input }) => {
      const enclabsVeUsd = useGetToken({ symbol: "Enclabs Trevee veUSD" })!;
      const accountAddress = useAccountAddress();
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.GET_BALANCE_OF,
          {
            chainId,
            accountAddress,
            tokenAddress: enclabsVeUsd.address,
          },
        ],
      });
    },
    options,
  });
};

export default useWrapVeNft;
