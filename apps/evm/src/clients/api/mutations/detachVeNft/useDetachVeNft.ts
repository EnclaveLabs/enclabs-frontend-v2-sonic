import FunctionKey from "constants/functionKey";
import {
  useSendTransaction,
  type UseSendTransactionOptions,
} from "hooks/useSendTransaction";
import { useChainId } from "libs/wallet";
import { callOrThrow } from "utilities";
import BigNumber from "bignumber.js";
import { TreveeVeNFT } from "../../../../types";
import detachVeNft, { DetachVeNftInput } from "./index";
import queryClient from "../../queryClient";

type TrimmedDetachVeNftInput = Omit<DetachVeNftInput, "veNftContract">;
type Options = UseSendTransactionOptions<TrimmedDetachVeNftInput>;

const useDetachVeNft = (
  {
    veNftContract,
    tokenId,
  }: { veNftContract: TreveeVeNFT; tokenId: BigNumber },
  options?: Partial<Options>
) => {
  const { chainId } = useChainId();

  return useSendTransaction({
    fnKey: [FunctionKey.DETACH_VENFT, { tokenId }],
    fn: (input: TrimmedDetachVeNftInput) =>
      callOrThrow({ veNftContract }, (params) =>
        detachVeNft({
          ...input,
          ...params,
        })
      ),
    onConfirmed: async ({ input }) => {
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

export default useDetachVeNft;
