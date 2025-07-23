import { queryClient, type WrapVeNftInput } from "clients/api";
import FunctionKey from "constants/functionKey";
import {
  useSendTransaction,
  type UseSendTransactionOptions,
} from "hooks/useSendTransaction";
import { useGetEnclabsTreveeVeManagerContract } from "libs/contracts";
import { useChainId } from "libs/wallet";
import { callOrThrow } from "utilities";
import wrapVeNft from "./index";
import { useGetVeNFT } from "../../../../libs/venfts";
import { useGetToken } from "../../../../libs/tokens";

type TrimmedWrapVeNftInput = Omit<
  WrapVeNftInput,
  "enclabsTreveeVeManagerContract"
>;
type Options = UseSendTransactionOptions<TrimmedWrapVeNftInput>;

const useWrapVeNft = (
  { tokenId }: { tokenId: string },
  options?: Partial<Options>
) => {
  const { chainId } = useChainId();
  const enclabsTreveeVeManagerContract = useGetEnclabsTreveeVeManagerContract({
    passSigner: true,
  });
  const enclabsVeUsd = useGetToken({ symbol: "Enclabs Trevee veUSD" })!;
  const veUSD = useGetVeNFT({ symbol: "veUSD" })!;
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
      const accountAddress =
        await enclabsTreveeVeManagerContract?.signer.getAddress();
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.GET_NFT_BALANCE_OF,
          {
            chainId,
            accountAddress,
            nftAddress: veUSD.address,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.GET_BALANCE_OF,
          {
            accountAddress,
            tokenAddress: enclabsVeUsd.address,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.GET_VEUSD_TOKEN_LOCKED,
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
