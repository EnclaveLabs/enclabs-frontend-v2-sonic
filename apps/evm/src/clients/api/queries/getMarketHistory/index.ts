import { VError } from 'libs/errors';
import type { ChainId, MarketSnapshot, VToken } from 'types';
import { restService } from 'utilities';
import config from 'config';
import { createClient } from '@supabase/supabase-js';

export type MarketHistoryPeriodType = 'year' | 'halfyear' | 'month';

export interface GetMarketHistoryResponse {
  asset: string;
  result: {
    data: MarketSnapshot[];
  };
  updatedAt: string;
}

export interface GetMarketHistoryInput {
  vToken: VToken;
  period: MarketHistoryPeriodType;
  chainId: ChainId;
}

export type GetMarketHistoryOutput = {
  marketSnapshots: MarketSnapshot[];
};

const supabase = createClient(config.database.dbUrl, config.database.dbApiKey);

const getMarketHistory = async ({
  vToken,
  period,
  chainId
}: GetMarketHistoryInput): Promise<GetMarketHistoryOutput> => {
  // const endpoint = `/markets/history?asset=${vToken.address}&period=${period}`;
  
  // const response = await restService<GetMarketHistoryResponse>({
  //   endpoint,
  //   method: 'GET',
  // });

  const currentDate = new Date();
  let startDate = new Date();

  switch (period) {
    case 'year':
      startDate.setFullYear(currentDate.getFullYear() - 1);
      break;
    case 'halfyear':
      startDate.setMonth(currentDate.getMonth() - 6);
      break;
    case 'month':
      startDate.setMonth(currentDate.getMonth() - 1);
      break;
  }

  let { data, error } = await supabase
    .from('History')
    .select()
    // Filters
    .eq('market_address', vToken.address.toLowerCase())
    .eq('chain_id', chainId)
    .gte('created_at', startDate.toISOString());;

  if(!data || error){
    throw new VError({
      type: 'unexpected',
      code: 'somethingWentWrong',
      data: error!,
    });
  }

  const marketSnapshots: MarketSnapshot[] = data.map(market => ({
    blockNumber: market.block_number,
    blockTimestamp: market.block_timestamp,
    borrowApy: market.borrow_apy,
    supplyApy: market.supply_apy,
    totalBorrowCents: market.total_borrow_price_usd,
    totalSupplyCents: market.total_supply_price_usd,
    totalLiquidityCents: market.total_liquidity_price_usd,
  }));  

    
  // const payload = response.data;

  // // @todo Add specific api error handling
  // if (payload && 'error' in payload) {
  //   throw new VError({
  //     type: 'unexpected',
  //     code: 'somethingWentWrong',
  //     data: { message: payload.error },
  //   });
  // }


  // const marketSnapshots = payload?.result?.data || [];

  return {
    marketSnapshots,
  };
};

export default getMarketHistory;
