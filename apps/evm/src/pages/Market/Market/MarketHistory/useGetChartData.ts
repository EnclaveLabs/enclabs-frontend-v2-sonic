import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { type MarketHistoryPeriodType, useGetMarketHistory } from 'clients/api';
import type { ApyChartProps } from 'components/charts/ApyChart';
import { useIsFeatureEnabled } from 'hooks/useIsFeatureEnabled';
import type { VToken } from 'types';
import { LiquidityChartProps } from 'components/charts/LiquidityChart';

const useGetChartData = ({
  vToken,
  period,
}: { vToken: VToken; period: MarketHistoryPeriodType }) => {
  const isApyChartsFeatureEnabled = useIsFeatureEnabled({ name: 'apyCharts' });
  const {
    isLoading,
    data: marketSnapshotsData = {
      marketSnapshots: [],
    },
  } = useGetMarketHistory(
    {
      vToken,
      period,
    },
    {
      enabled: isApyChartsFeatureEnabled,
    },
  );

  const data = useMemo(() => {
    const supplyChartData: ApyChartProps['data'] = [];
    const borrowChartData: ApyChartProps['data'] = [];
    const liquidityChartData: LiquidityChartProps['data'] = [];

    [...marketSnapshotsData.marketSnapshots]
      // Snapshots are already reversed, due to the negative slice
      .forEach(marketSnapshot => {
        const timestampMs = Number(marketSnapshot.blockTimestamp) * 1000;

        supplyChartData.push({
          apyPercentage: +marketSnapshot.supplyApy,
          timestampMs,
          balanceCents: new BigNumber(marketSnapshot.totalSupplyCents),
        });

        borrowChartData.push({
          apyPercentage: +marketSnapshot.borrowApy,
          timestampMs,
          balanceCents: new BigNumber(marketSnapshot.totalBorrowCents),
        });

        liquidityChartData.push({
          totalSupply: new BigNumber(marketSnapshot.totalSupplyCents),
          totalLiquidity: new BigNumber(marketSnapshot.totalLiquidityCents),
          timestampMs,
        });
      });

    return { supplyChartData, borrowChartData, liquidityChartData };
  }, [marketSnapshotsData]);

  return {
    isLoading,
    data,
  };
};

export default useGetChartData;
