import { type QueryObserverOptions, useQuery } from "@tanstack/react-query";

import FunctionKey from "constants/functionKey";
import { useChainId, useProvider } from "libs/wallet";
import type { ChainId, TreveeVeNFT } from "types";
import { callOrThrow } from "utilities";
import getVeNftTokenVoted, { GetVeNftTokenVotedOutput } from "./index";
import BigNumber from "bignumber.js";

export type UseGetVeNftTokenVotedQueryKey = [
  FunctionKey.GET_VENFT_TOKEN_VOTED,
  {
    veNftContractAddress: string;
    tokenId: BigNumber;
    chainId: ChainId;
  }
];

type Options = QueryObserverOptions<
  GetVeNftTokenVotedOutput,
  Error,
  GetVeNftTokenVotedOutput,
  GetVeNftTokenVotedOutput,
  UseGetVeNftTokenVotedQueryKey
>;

interface UseGetVeNftTokenVotedInput {
  veNftContract: TreveeVeNFT;
  tokenId: BigNumber;
}

const useGetVeNftTokenVoted = (
  { veNftContract, tokenId }: UseGetVeNftTokenVotedInput,
  options?: Partial<Options>
) => {
  const { provider } = useProvider();
  const { chainId } = useChainId();

  return useQuery({
    queryKey: [
      FunctionKey.GET_VENFT_TOKEN_VOTED,
      {
        veNftContractAddress: veNftContract.address,
        chainId,
        tokenId: tokenId,
      },
    ],

    queryFn: () =>
      callOrThrow({ tokenId }, (params) =>
        getVeNftTokenVoted({
          veNftContract,
          provider,
          chainId,
          ...params,
        })
      ),

    ...options,
  });
};

export default useGetVeNftTokenVoted;
