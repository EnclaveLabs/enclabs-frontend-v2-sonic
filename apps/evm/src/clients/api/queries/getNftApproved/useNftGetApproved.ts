import { type QueryObserverOptions, useQuery } from "@tanstack/react-query";

import getNftApproved, {
  type GetNftApprovedInput,
  type GetNftApprovedOutput,
} from "./index";
import FunctionKey from "constants/functionKey";
import { useChainId, useProvider } from "libs/wallet";
import type { ChainId, NFT } from "types";
import { callOrThrow } from "utilities";

type TrimmedGetNftApprovedInput = Omit<
  GetNftApprovedInput,
  "signer" | "provider"
>;

export type UseNftGetApprovedQueryKey = [
  FunctionKey.GET_NFT_APPROVED,
  {
    accountAddress: string;
    nftAddress: string;
    chainId: ChainId;
  }
];

type Options = QueryObserverOptions<
  GetNftApprovedOutput,
  Error,
  GetNftApprovedOutput,
  GetNftApprovedOutput,
  UseNftGetApprovedQueryKey
>;

interface UseNFTGetApprovedInput
  extends Omit<TrimmedGetNftApprovedInput, "nft"> {
  nft?: NFT;
}

const useNftGetApproved = (
  { accountAddress, nft }: UseNFTGetApprovedInput,
  options?: Partial<Options>
) => {
  const { provider } = useProvider();
  const { chainId } = useChainId();

  return useQuery({
    queryKey: [
      FunctionKey.GET_NFT_APPROVED,
      {
        chainId,
        accountAddress,
        nftAddress: nft?.address || "",
      },
    ],

    queryFn: () =>
      callOrThrow({ nft }, (params) =>
        getNftApproved({
          provider,
          accountAddress,
          ...params,
        })
      ),

    ...options,
  });
};

export default useNftGetApproved;
