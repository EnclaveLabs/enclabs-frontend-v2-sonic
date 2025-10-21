import { type QueryObserverOptions, useQuery } from '@tanstack/react-query';

import getMarketHistory, {
  type MarketHistoryPeriodType,
  type GetMarketHistoryInput,
  type GetMarketHistoryOutput,
} from 'clients/api/queries/getMarketHistory';
import FunctionKey from 'constants/functionKey';
import { ChainId } from 'types';

type Options = QueryObserverOptions<
  GetMarketHistoryOutput,
  Error,
  GetMarketHistoryOutput,
  GetMarketHistoryOutput,
  [FunctionKey.GET_MARKET_HISTORY, { vTokenAddress: string; period: MarketHistoryPeriodType, chainId: ChainId }]
>;

const useGetMarketHistory = (input: GetMarketHistoryInput, options?: Partial<Options>) =>
  useQuery({
    queryKey: [
      FunctionKey.GET_MARKET_HISTORY,
      { vTokenAddress: input.vToken.address, period: input.period, chainId: input.chainId },
    ],
    queryFn: () => getMarketHistory(input),
    ...options,
  });

export default useGetMarketHistory;
