import { type QueryObserverOptions, useQuery } from "@tanstack/react-query";

import FunctionKey from "constants/functionKey";
import { useChainId, useProvider } from "libs/wallet";
import type { ChainId, NFT } from "types";
import { callOrThrow } from "utilities";
import getVeUsdTokenOfOwnerByIndex, {
  GetVeUsdTokenOfOwnerByIndexInput,
  GetVeUsdTokenOfOwnerByIndexOutput,
} from "./index";

type TrimmedGetNftBalanceOfInput = Omit<
  GetVeUsdTokenOfOwnerByIndexInput,
  "signer" | "provider"
>;

export type UseGetVeUsdTokenOfOwnerByIndexQueryKey = [
  FunctionKey.GET_NFT_OF_OWNER_BY_INDEX,
  {
    accountAddress: string;
    tokenIndex: number;
    chainId: ChainId;
  }
];

type Options = QueryObserverOptions<
  GetVeUsdTokenOfOwnerByIndexOutput,
  Error,
  GetVeUsdTokenOfOwnerByIndexOutput,
  GetVeUsdTokenOfOwnerByIndexOutput,
  UseGetVeUsdTokenOfOwnerByIndexQueryKey
>;

interface UseNFTGetBalanceOfInput
  extends Omit<TrimmedGetNftBalanceOfInput, "nft"> {
  nft?: NFT;
}

const useGetVeUsdTokenOfOwnerByIndex = (
  { accountAddress, tokenIndex }: UseNFTGetBalanceOfInput,
  options?: Partial<Options>
) => {
  const { provider } = useProvider();
  const { chainId } = useChainId();

  return useQuery({
    queryKey: [
      FunctionKey.GET_NFT_OF_OWNER_BY_INDEX,
      {
        chainId,
        accountAddress,
        tokenIndex: tokenIndex,
      },
    ],

    queryFn: () =>
      callOrThrow({ tokenIndex }, (params) =>
        getVeUsdTokenOfOwnerByIndex({
          provider,
          accountAddress,
          chainId,
          ...params,
        })
      ),

    ...options,
  });
};

export default useGetVeUsdTokenOfOwnerByIndex;
