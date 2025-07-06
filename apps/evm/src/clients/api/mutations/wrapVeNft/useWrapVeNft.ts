import { queryClient, type WrapVeNftInput } from "clients/api";
import FunctionKey from "constants/functionKey";
import {
  useSendTransaction,
  type UseSendTransactionOptions,
} from "hooks/useSendTransaction";
import { useGetEnclabsTreveeVeManagerContract } from "libs/contracts";
import { useAccountAddress, useChainId } from "libs/wallet";
import { callOrThrow } from "utilities";
import wrapVeNft from "./index";
import { useGetToken } from "../../../../libs/tokens";

type TrimmedWrapVeNftInput = Omit<WrapVeNftInput, "veNftVoterContract">;
type Options = UseSendTransactionOptions<TrimmedWrapVeNftInput>;

const useWrapVeNft = (
  { tokenId }: { tokenId: string },
  options?: Partial<Options>
) => {
  const { chainId } = useChainId();
  const enclabsTreveeVeManagerContract = useGetEnclabsTreveeVeManagerContract({
    passSigner: true,
  });

  return useSendTransaction({
    fnKey: [FunctionKey.WRAP_VENFT, { tokenId }],
    fn: (input: TrimmedWrapVeNftInput) =>
      callOrThrow({ enclabsTreveeVeManagerContract }, (params) =>
        wrapVeNft({
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
