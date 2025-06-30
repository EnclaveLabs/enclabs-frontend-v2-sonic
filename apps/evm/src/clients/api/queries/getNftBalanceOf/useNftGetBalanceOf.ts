import { type QueryObserverOptions, useQuery } from "@tanstack/react-query";

import {
  getNftBalanceOf,
  type GetNftBalanceOfInput,
  type GetNftBalanceOfOutput,
} from "clients/api";
import FunctionKey from "constants/functionKey";
import { useChainId, useProvider } from "libs/wallet";
import type { ChainId, NFT } from "types";
import { callOrThrow } from "utilities";

type TrimmedGetNftBalanceOfInput = Omit<
  GetNftBalanceOfInput,
  "signer" | "provider"
>;

export type UseNftGetBalanceOfQueryKey = [
  FunctionKey.GET_NFT_BALANCE_OF,
  {
    accountAddress: string;
    nftAddress: string;
    chainId: ChainId;
  }
];

type Options = QueryObserverOptions<
  GetNftBalanceOfOutput,
  Error,
  GetNftBalanceOfOutput,
  GetNftBalanceOfOutput,
  UseNftGetBalanceOfQueryKey
>;

interface UseNFTGetBalanceOfInput
  extends Omit<TrimmedGetNftBalanceOfInput, "nft"> {
  nft?: NFT;
}

const useNftGetBalanceOf = (
  { accountAddress, nft }: UseNFTGetBalanceOfInput,
  options?: Partial<Options>
) => {
  const { provider } = useProvider();
  const { chainId } = useChainId();

  return useQuery({
    queryKey: [
      FunctionKey.GET_NFT_BALANCE_OF,
      {
        chainId,
        accountAddress,
        nftAddress: nft?.address || "",
      },
    ],

    queryFn: () =>
      callOrThrow({ nft }, (params) =>
        getNftBalanceOf({
          provider,
          accountAddress,
          ...params,
        })
      ),

    ...options,
  });
};

export default useNftGetBalanceOf;
