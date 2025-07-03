import { approveNft, type ApproveNftInput, queryClient } from "clients/api";
import FunctionKey from "constants/functionKey";
import {
  useSendTransaction,
  type UseSendTransactionOptions,
} from "hooks/useSendTransaction";
import { useGetNftContract } from "libs/contracts";
import { useChainId } from "libs/wallet";
import type { NFT } from "types";
import { callOrThrow } from "utilities";

type TrimmedApproveNftInput = Omit<ApproveNftInput, "nftContract">;
type Options = UseSendTransactionOptions<TrimmedApproveNftInput>;

const useApproveNft = ({ nft }: { nft: NFT }, options?: Partial<Options>) => {
  const { chainId } = useChainId();
  const nftContract = useGetNftContract({ nft, passSigner: true });

  return useSendTransaction({
    fnKey: [FunctionKey.SET_NFT_ALLOWANCE, { nftAddress: nft.address }],
    fn: (input: TrimmedApproveNftInput) =>
      callOrThrow({ nftContract }, (params) =>
        approveNft({
          ...input,
          ...params,
        })
      ),
    onConfirmed: async ({ input }) => {
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.SET_NFT_ALLOWANCE,
          {
            chainId,
            nftAddress: nft.address,
            tokenId: input.tokenId,
            approvedAddress: input.approvedAddress,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.GET_NFT_ALLOWANCE,
          {
            chainId,
            nftAddress: nft.address,
            tokenId: input.tokenId,
          },
        ],
      });
    },
    options,
  });
};

export default useApproveNft;
