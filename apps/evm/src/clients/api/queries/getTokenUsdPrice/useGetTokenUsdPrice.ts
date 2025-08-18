import { type QueryObserverOptions, useQuery } from '@tanstack/react-query';

import {
  type GetTokenUsdPriceInput,
  type GetTokenUsdPriceOutput,
  getTokenUsdPrice,
} from 'clients/api';
import { queryClient } from 'clients/api';
import FunctionKey from 'constants/functionKey';
import { useGetResilientOracleContract } from 'libs/contracts';
import { useChainId } from 'libs/wallet';
import type { ChainId, Token } from 'types';
import { callOrThrow } from 'utilities';

type TrimmedGetTokenUsdPriceInput = Omit<GetTokenUsdPriceInput, 'resilientOracleContract'>;

export type UseGetTokenBalancesQueryKey = [
  FunctionKey.GET_TOKEN_USD_PRICE,
  {
    tokenAddress: string;
    chainId: ChainId;
  },
];

type Options = QueryObserverOptions<
  GetTokenUsdPriceOutput,
  Error,
  GetTokenUsdPriceOutput,
  GetTokenUsdPriceOutput,
  UseGetTokenBalancesQueryKey
>;

interface UseGetTokenUsdPriceInput extends Omit<TrimmedGetTokenUsdPriceInput, 'token'> {
  token?: Token;
}

const useGetTokenUsdPrice = ({ token }: UseGetTokenUsdPriceInput, options?: Partial<Options>) => {
  const { chainId } = useChainId();
  const resilientOracleContract = useGetResilientOracleContract({
    chainId,
  });

  const queryKey: UseGetTokenBalancesQueryKey = [
    FunctionKey.GET_TOKEN_USD_PRICE,
    {
      tokenAddress: token ? token.address : '',
      chainId,
    },
  ];

  return useQuery({
    queryKey,

    queryFn: () =>
      callOrThrow({ token, resilientOracleContract }, params => getTokenUsdPrice({ ...params })),

    placeholderData: options?.placeholderData ?? (() => queryClient.getQueryData(queryKey)),
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    gcTime: options?.gcTime ?? 5 * 60 * 1000,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    retry: options?.retry ?? 1,
    retryDelay: options?.retryDelay ?? ((attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 3000)),

    ...options,
    enabled: (options?.enabled === undefined || options?.enabled) && !!token,
  });
};

export default useGetTokenUsdPrice;
