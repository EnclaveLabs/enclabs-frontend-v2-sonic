import { queryClient, resetVeNft, type ResetVeNftInput } from "clients/api";
import FunctionKey from "constants/functionKey";
import {
  useSendTransaction,
  type UseSendTransactionOptions,
} from "hooks/useSendTransaction";
import { useChainId } from "libs/wallet";
import { callOrThrow } from "utilities";
import BigNumber from "bignumber.js";
import { TreveeVoter } from "../../../../types";

type TrimmedResetVeNftInput = Omit<ResetVeNftInput, "veNftVoterContract">;
type Options = UseSendTransactionOptions<TrimmedResetVeNftInput>;

const useResetVeNft = (
  {
    veNftVoterContract,
    tokenId,
  }: { veNftVoterContract: TreveeVoter; tokenId: BigNumber },
  options?: Partial<Options>
) => {
  const { chainId } = useChainId();

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
          FunctionKey.GET_VENFT_TOKEN_VOTED,
          {
            chainId,
            tokenId,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.GET_VENFT_TOKEN_ATTACHED,
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
