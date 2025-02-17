import type { Asset } from 'types';

import type { MarketHistoryPeriodType } from 'clients/api';
import { useState } from 'react';
import TEST_IDS from '../../testIds';
import { Card } from './Card';
import useGetChartData from './useGetChartData';

interface MarketHistoryProps {
  asset: Asset;
  poolComptrollerContractAddress: string;
}

export const MarketHistory: React.FC<MarketHistoryProps> = ({
  asset,
  poolComptrollerContractAddress,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<MarketHistoryPeriodType>('month');

  const {
    data: { supplyChartData, borrowChartData, liquidityChartData },
    isLoading: isChartDataLoading,
  } = useGetChartData({
    vToken: asset.vToken,
    period: selectedPeriod,
  });

  return (
    <div className="space-y-6">

      <Card
        asset={asset}
        type="liquidity"
        testId={TEST_IDS.supplyInfo}
        data={liquidityChartData ?? []}
        isLoading={isChartDataLoading}
        poolComptrollerContractAddress={poolComptrollerContractAddress}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />

      <Card
        asset={asset}
        type="supply"
        testId={TEST_IDS.supplyInfo}
        data={supplyChartData ?? []}
        isLoading={isChartDataLoading}
        poolComptrollerContractAddress={poolComptrollerContractAddress}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />

      <Card
        asset={asset}
        type="borrow"
        testId={TEST_IDS.borrowInfo}
        data={borrowChartData ?? []}
        isLoading={isChartDataLoading}
        poolComptrollerContractAddress={poolComptrollerContractAddress}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
    </div>
  );
};
