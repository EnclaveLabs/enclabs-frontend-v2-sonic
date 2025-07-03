import { queryClient, resetVeNft, type ResetVeNftInput } from "clients/api";
import FunctionKey from "constants/functionKey";
import {
  useSendTransaction,
  type UseSendTransactionOptions,
} from "hooks/useSendTransaction";
import { useGetTreveeVeUSDVoterContract } from "libs/contracts";
import { useChainId } from "libs/wallet";
import { callOrThrow } from "utilities";
import BigNumber from "bignumber.js";

type TrimmedResetVeNftInput = Omit<ResetVeNftInput, "veNftVoterContract">;
type Options = UseSendTransactionOptions<TrimmedResetVeNftInput>;

const useResetVeNft = (
  { tokenId }: { tokenId: BigNumber },
  options?: Partial<Options>
) => {
  const { chainId } = useChainId();
  const veNftVoterContract = useGetTreveeVeUSDVoterContract({
    passSigner: true,
  });

  return useSendTransaction({
    fnKey: [FunctionKey.RESET_VENFT, { tokenId }],
    fn: (input: TrimmedResetVeNftInput) =>
      callOrThrow({ veNftVoterContract }, (params) =>
        resetVeNft({
          ...input,
          ...params,
        })
      ),
    onConfirmed: async ({ input }) => {
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.GET_VEUSD_TOKEN_VOTED,
          {
            chainId,
            tokenId,
          },
        ],
      });
    },
    options,
  });
};

export default useResetVeNft;
