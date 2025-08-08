import { type QueryObserverOptions, useQuery } from "@tanstack/react-query";

import FunctionKey from "constants/functionKey";
import { useChainId, useProvider } from "libs/wallet";
import type { ChainId, TreveeVeNFT } from "types";
import { callOrThrow } from "utilities";
import getVeNftTokenAttached, { GetVeNftTokenAttachedOutput } from "./index";
import BigNumber from "bignumber.js";

export type UseGetVeNftTokenAttachedQueryKey = [
  FunctionKey.GET_VENFT_TOKEN_ATTACHED,
  {
    veNftContractAddress: string;
    tokenId: BigNumber;
    chainId: ChainId;
  }
];

type Options = QueryObserverOptions<
  GetVeNftTokenAttachedOutput,
  Error,
  GetVeNftTokenAttachedOutput,
  GetVeNftTokenAttachedOutput,
  UseGetVeNftTokenAttachedQueryKey
>;

interface UseGetVeNftTokenAttachedInput {
  veNftContract: TreveeVeNFT;
  tokenId: BigNumber;
}

const useGetVeNftTokenAttached = (
  { veNftContract, tokenId }: UseGetVeNftTokenAttachedInput,
  options?: Partial<Options>
) => {
  const { provider } = useProvider();
  const { chainId } = useChainId();

  return useQuery({
    queryKey: [
      FunctionKey.GET_VENFT_TOKEN_ATTACHED,
      {
        veNftContractAddress: veNftContract.address,
        chainId,
        tokenId: tokenId,
      },
    ],

    queryFn: () =>
      callOrThrow({ tokenId }, (params) =>
        getVeNftTokenAttached({
          veNftContract,
          provider,
          chainId,
          ...params,
        })
      ),

    ...options,
  });
};

export default useGetVeNftTokenAttached;
