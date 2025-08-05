import { type QueryObserverOptions, useQuery } from "@tanstack/react-query";

import FunctionKey from "constants/functionKey";
import { useProvider } from "libs/wallet";
import type { TreveeVeNFT } from "types";
import { callOrThrow } from "utilities";
import getNftTokenIdsOfUser, { GetNftTokenIdsOutput } from "./index";

export type UseGetVeNftTokenIdsOfUserQueryKey = [
  FunctionKey.GET_VENFT_TOKEN_IDS,
  {
    veNftContractAddress: string;
    accountAddress: string;
  }
];

type Options = QueryObserverOptions<
  GetNftTokenIdsOutput,
  Error,
  GetNftTokenIdsOutput,
  GetNftTokenIdsOutput,
  UseGetVeNftTokenIdsOfUserQueryKey
>;

interface UseGetVeNftTokenIdsOfUserInput {
  veNftContract: TreveeVeNFT;
  accountAddress: string;
}

const useGetVeNftTokenIdsOfUser = (
  { veNftContract, accountAddress }: UseGetVeNftTokenIdsOfUserInput,
  options?: Partial<Options>
) => {
  const { provider } = useProvider();

  return useQuery({
    queryKey: [
      FunctionKey.GET_VENFT_TOKEN_IDS,
      {
        veNftContractAddress: veNftContract.address,
        accountAddress,
      },
    ],

    queryFn: () =>
      callOrThrow({ accountAddress }, (params) =>
        getNftTokenIdsOfUser({
          veNftContract,
          provider,
          ...params,
        })
      ),

    ...options,
  });
};

export default useGetVeNftTokenIdsOfUser;
