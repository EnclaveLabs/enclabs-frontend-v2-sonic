import { queryClient, type WrapVeNftInput } from "clients/api";
import FunctionKey from "constants/functionKey";
import {
  useSendTransaction,
  type UseSendTransactionOptions,
} from "hooks/useSendTransaction";
import { useChainId } from "libs/wallet";
import { callOrThrow } from "utilities";
import wrapVeNft from "./index";
import { useGetVeNFT } from "../../../../libs/venfts";
import { useGetToken } from "../../../../libs/tokens";
import { TreveeWraping } from "../../../../types";

type TrimmedWrapVeNftInput = Omit<WrapVeNftInput, "treveeWraping">;
type Options = UseSendTransactionOptions<TrimmedWrapVeNftInput>;

const useWrapVeNft = (
  { tokenId, treveeWraping }: { tokenId: string; treveeWraping: TreveeWraping },
  options?: Partial<Options>
) => {
  const { chainId } = useChainId();
  const enclabsStakedToken = useGetToken({
    symbol: treveeWraping.enclabsStakedTokenSymbol,
  })!;
  const treveeVeNft = useGetVeNFT({ symbol: treveeWraping.treveeVeNftSymbol })!;
  const enclabsTreveeVeManager = treveeWraping.manager;

  return useSendTransaction({
    fnKey: [FunctionKey.WRAP_VENFT, { tokenId }],
    fn: (input: WrapVeNftInput) =>
      callOrThrow({ enclabsTreveeVeManager }, (params) =>
        wrapVeNft({
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
          FunctionKey.GET_VENFT_TOKEN_LOCKED,
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

export default useWrapVeNft;
