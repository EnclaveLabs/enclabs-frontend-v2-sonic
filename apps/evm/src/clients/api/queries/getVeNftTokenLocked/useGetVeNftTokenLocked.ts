import { type QueryObserverOptions, useQuery } from "@tanstack/react-query";

import FunctionKey from "constants/functionKey";
import { useChainId, useProvider } from "libs/wallet";
import type { ChainId, TreveeVeNFT } from "types";
import { callOrThrow } from "utilities";
import getVeNftTokenLocked, { GetVeNftTokenLockedOutput } from "./index";
import BigNumber from "bignumber.js";

export type UseGetVeNftTokenLockedQueryKey = [
  FunctionKey.GET_VENFT_TOKEN_LOCKED,
  {
    veNftContractAddress: string;
    chainId: ChainId;
    tokenId: BigNumber;
  }
];

type Options = QueryObserverOptions<
  GetVeNftTokenLockedOutput,
  Error,
  GetVeNftTokenLockedOutput,
  GetVeNftTokenLockedOutput,
  UseGetVeNftTokenLockedQueryKey
>;

interface UseGetVeNftTokenLockedInput {
  tokenId: BigNumber;
  veNftContract: TreveeVeNFT;
}

const useGetVeNftTokenLocked = (
  { tokenId, veNftContract }: UseGetVeNftTokenLockedInput,
  options?: Partial<Options>
) => {
  const { provider } = useProvider();
  const { chainId } = useChainId();

  return useQuery({
    queryKey: [
      FunctionKey.GET_VENFT_TOKEN_LOCKED,
      {
        veNftContractAddress: veNftContract.address,
        chainId,
        tokenId,
      },
    ],

    queryFn: () =>
      callOrThrow({ tokenId }, (params) =>
        getVeNftTokenLocked({
          veNftContract,
          provider,
          chainId,
          ...params,
        })
      ),

    ...options,
  });
};

export default useGetVeNftTokenLocked;
