import { type QueryObserverOptions, useQuery } from "@tanstack/react-query";

import FunctionKey from "constants/functionKey";
import { useChainId, useProvider } from "libs/wallet";
import type { ChainId } from "types";
import { callOrThrow } from "utilities";
import getVeUsdTokenLocked, { GetVeUsdTokenLockedOutput } from "./index";
import BigNumber from "bignumber.js";

export type UseGetVeUsdTokenLockedQueryKey = [
  FunctionKey.GET_VEUSD_TOKEN_LOCKED,
  {
    tokenId: BigNumber;
    chainId: ChainId;
  }
];

type Options = QueryObserverOptions<
  GetVeUsdTokenLockedOutput,
  Error,
  GetVeUsdTokenLockedOutput,
  GetVeUsdTokenLockedOutput,
  UseGetVeUsdTokenLockedQueryKey
>;

interface UseGetVeUsdTokenLockedInput {
  tokenId: BigNumber;
}

const useGetVeUsdTokenLocked = (
  { tokenId }: UseGetVeUsdTokenLockedInput,
  options?: Partial<Options>
) => {
  const { provider } = useProvider();
  const { chainId } = useChainId();

  return useQuery({
    queryKey: [
      FunctionKey.GET_VEUSD_TOKEN_LOCKED,
      {
        chainId,
        tokenId: tokenId,
      },
    ],

    queryFn: () =>
      callOrThrow({ tokenId }, (params) =>
        getVeUsdTokenLocked({
          provider,
          chainId,
          ...params,
        })
      ),

    ...options,
  });
};

export default useGetVeUsdTokenLocked;
