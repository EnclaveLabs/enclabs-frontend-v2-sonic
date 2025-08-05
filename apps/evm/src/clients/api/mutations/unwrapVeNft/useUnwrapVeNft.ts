import { queryClient } from "clients/api";
import FunctionKey from "constants/functionKey";
import {
  useSendTransaction,
  type UseSendTransactionOptions,
} from "hooks/useSendTransaction";
import { useChainId } from "libs/wallet";
import { callOrThrow } from "utilities";
import unwrapVeNft, { UnwrapVeNftInput } from "./index";
import { useGetToken } from "../../../../libs/tokens";
import BigNumber from "bignumber.js";
import { useGetVeNFT } from "../../../../libs/venfts";
import { TreveeWraping } from "../../../../types";

type TrimmedUnwrapVeNftInput = Omit<UnwrapVeNftInput, "treveeWraping">;
type Options = UseSendTransactionOptions<TrimmedUnwrapVeNftInput>;

const useUnwrapVeNft = (
  {
    treveeWraping,
    amountMantissa,
  }: {
    treveeWraping: TreveeWraping;
    amountMantissa: BigNumber;
  },
  options?: Partial<Options>
) => {
  const { chainId } = useChainId();
  const enclabsStakedToken = useGetToken({
    symbol: treveeWraping.enclabsStakedTokenSymbol,
  })!;
  const treveeVeNft = useGetVeNFT({ symbol: treveeWraping.treveeVeNftSymbol })!;
  const enclabsTreveeVeManager = treveeWraping.manager;

  return useSendTransaction({
    fnKey: [FunctionKey.UNWRAP_VENFT, { amountMantissa }],
    fn: (input: TrimmedUnwrapVeNftInput) =>
      callOrThrow({ enclabsTreveeVeManager }, (params) =>
        unwrapVeNft({
          ...input,
          ...params,
        })
      ),
    onConfirmed: async ({ input }) => {
      const accountAddress = await treveeWraping.manager?.signer.getAddress();
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.GET_NFT_BALANCE_OF,
          {
            chainId,
            accountAddress,
            nftAddress: treveeVeNft.address,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.GET_BALANCE_OF,
          {
            accountAddress,
            tokenAddress: enclabsStakedToken.address,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.GET_TOKEN_ALLOWANCE,
          {
            chainId,
            accountAddress,
            tokenAddress: enclabsStakedToken.address,
            spenderAddress: enclabsTreveeVeManager.address,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [FunctionKey.GET_VENFT_TOKEN_LOCKED],
      });
    },
    options,
  });
};

export default useUnwrapVeNft;
