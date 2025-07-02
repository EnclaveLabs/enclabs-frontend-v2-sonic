import { type QueryObserverOptions, useQuery } from "@tanstack/react-query";

import FunctionKey from "constants/functionKey";
import { useChainId, useProvider } from "libs/wallet";
import type { ChainId } from "types";
import { callOrThrow } from "utilities";
import getVeUsdTokenVoted, { GetVeUsdTokenVotedOutput } from "./index";
import BigNumber from "bignumber.js";

export type UseGetVeUsdTokenVotedQueryKey = [
  FunctionKey.GET_VEUSD_TOKEN_VOTED,
  {
    tokenId: BigNumber;
    chainId: ChainId;
  }
];

type Options = QueryObserverOptions<
  GetVeUsdTokenVotedOutput,
  Error,
  GetVeUsdTokenVotedOutput,
  GetVeUsdTokenVotedOutput,
  UseGetVeUsdTokenVotedQueryKey
>;

interface UseGetVeUsdTokenVotedInput {
  tokenId: BigNumber;
}

const useGetVeUsdTokenVoted = (
  { tokenId }: UseGetVeUsdTokenVotedInput,
  options?: Partial<Options>
) => {
  const { provider } = useProvider();
  const { chainId } = useChainId();

  return useQuery({
    queryKey: [
      FunctionKey.GET_VEUSD_TOKEN_VOTED,
      {
        chainId,
        tokenId: tokenId,
      },
    ],

    queryFn: () =>
      callOrThrow({ tokenId }, (params) =>
        getVeUsdTokenVoted({
          provider,
          chainId,
          ...params,
        })
      ),

    ...options,
  });
};

export default useGetVeUsdTokenVoted;
