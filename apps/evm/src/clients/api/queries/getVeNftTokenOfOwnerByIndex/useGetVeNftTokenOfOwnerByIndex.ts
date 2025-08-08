import { type QueryObserverOptions, useQuery } from "@tanstack/react-query";

import FunctionKey from "constants/functionKey";
import { useChainId, useProvider } from "libs/wallet";
import type { ChainId, TreveeVeNFT } from "types";
import { callOrThrow } from "utilities";
import getVeNftTokenOfOwnerByIndex, {
  GetVeNftTokenOfOwnerByIndexInput,
  GetVeNftTokenOfOwnerByIndexOutput,
} from "./index";

type TrimmedGetNftBalanceOfInput = Omit<
  GetVeNftTokenOfOwnerByIndexInput,
  "signer" | "provider"
>;

export type UseGetVeNftTokenOfOwnerByIndexQueryKey = [
  FunctionKey.GET_VENFT_OF_OWNER_BY_INDEX,
  {
    veNftContractAddress: string;
    accountAddress: string;
    tokenIndex: number;
    chainId: ChainId;
  }
];

type Options = QueryObserverOptions<
  GetVeNftTokenOfOwnerByIndexOutput,
  Error,
  GetVeNftTokenOfOwnerByIndexOutput,
  GetVeNftTokenOfOwnerByIndexOutput,
  UseGetVeNftTokenOfOwnerByIndexQueryKey
>;

interface UseNFTGetBalanceOfInput
  extends Omit<TrimmedGetNftBalanceOfInput, "nft"> {
  veNftContract: TreveeVeNFT;
}

const useGetVeNftTokenOfOwnerByIndex = (
  { veNftContract, accountAddress, tokenIndex }: UseNFTGetBalanceOfInput,
  options?: Partial<Options>
) => {
  const { provider } = useProvider();
  const { chainId } = useChainId();

  return useQuery({
    queryKey: [
      FunctionKey.GET_VENFT_OF_OWNER_BY_INDEX,
      {
        veNftContractAddress: veNftContract.address,
        chainId,
        accountAddress,
        tokenIndex: tokenIndex,
      },
    ],

    queryFn: () =>
      callOrThrow({ tokenIndex }, (params) =>
        getVeNftTokenOfOwnerByIndex({
          veNftContract,
          provider,
          accountAddress,
          chainId,
          ...params,
        })
      ),

    ...options,
  });
};

export default useGetVeNftTokenOfOwnerByIndex;
