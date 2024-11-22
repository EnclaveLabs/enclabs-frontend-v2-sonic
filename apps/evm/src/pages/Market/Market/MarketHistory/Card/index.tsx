import { useMemo } from 'react';

import { ButtonGroup, Spinner } from 'components';
import { ApyChart, type ApyChartProps } from 'components/charts/ApyChart';
import { useTranslation } from 'libs/translations';
import type { Asset } from 'types';
import { formatCentsToReadableValue, formatPercentageToReadableValue, getCombinedDistributionApys } from 'utilities';

import { type MarketHistoryPeriodType, useGetPoolLiquidationIncentive } from 'clients/api';
import { useIsFeatureEnabled } from 'hooks/useIsFeatureEnabled';
import { MarketCard, type MarketCardProps } from '../../MarketCard';
import { CapThreshold } from './CapThreshold';
import { useGetLiquidationThresholdPercentage } from './useGetLiquidationThresholdPercentage';
import { LiquidityChart, LiquidityChartProps } from 'components/charts/LiquidityChart';

export type ChartType = 'supply' | 'borrow' | 'liquidity';

export interface CardProps {
  type: ChartType;
  asset: Asset;
  data: ApyChartProps['data'] | LiquidityChartProps['data'];
  poolComptrollerContractAddress: string;
  isLoading: boolean;
  testId: string;
  selectedPeriod: MarketHistoryPeriodType;
  setSelectedPeriod: (period: MarketHistoryPeriodType) => void;
}

export const Card: React.FC<CardProps> = ({
  type,
  data,
  isLoading,
  asset,
  poolComptrollerContractAddress,
  selectedPeriod,
  setSelectedPeriod,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const isApyChartsFeatureEnabled = useIsFeatureEnabled({ name: 'apyCharts' });
  const shouldDisplayLiquidationInfo = type === 'borrow';

  const periodOptions: { label: string; value: MarketHistoryPeriodType }[] = useMemo(
    () => [
      {
        label: t('market.periodOption.thirtyDays'),
        value: 'month',
      },
      {
        label: t('market.periodOption.sixMonths'),
        value: 'halfyear',
      },
      {
        label: t('market.periodOption.oneYear'),
        value: 'year',
      },
    ],
    [t],
  );

  const { data: getPoolLiquidationIncentiveData } = useGetPoolLiquidationIncentive(
    {
      poolComptrollerContractAddress,
    },
    {
      enabled: shouldDisplayLiquidationInfo,
    },
  );

  const liquidationIncentivePercentage =
    getPoolLiquidationIncentiveData?.liquidationIncentivePercentage;

  const liquidationThresholdPercentage = useGetLiquidationThresholdPercentage(
    {
      asset,
      poolComptrollerContractAddress,
    },
    {
      enabled: shouldDisplayLiquidationInfo,
    },
  );

  const stats: MarketCardProps['stats'] = useMemo(() => {
    if (!asset) {
      return [];
    }

    const distributionApys = getCombinedDistributionApys({ asset });

    const tmpStats: MarketCardProps['stats'] = 
    type === 'liquidity' ?
      [
        {
          label: t('market.stats.totalSupplyLabel'),
          value: formatCentsToReadableValue(
            {value: asset.supplyBalanceCents}
          ),
        },
        {
          label: t('market.stats.totalLiquidityLabel'),
          value: formatCentsToReadableValue(
            {value: asset.supplyBalanceCents.minus(asset.borrowBalanceCents)}
          ),
        },
      ]
    : [
      {
        label: t('market.stats.apy'),
        value: formatPercentageToReadableValue(
          type === 'supply' ? asset.supplyApyPercentage : asset.borrowApyPercentage,
        ),
      },
      {
        label: t('market.stats.distributionApy'),
        value: formatPercentageToReadableValue(
          type === 'supply'
            ? distributionApys.supplyApyRewardsPercentage
            : distributionApys.borrowApyRewardsPercentage,
        ),
      },
      ];

    if (shouldDisplayLiquidationInfo) {
      tmpStats.push(
        {
          label: t('market.stats.liquidationThreshold'),
          value: formatPercentageToReadableValue(liquidationThresholdPercentage),
        },
        {
          label: t('market.stats.liquidationPenalty'),
          value: formatPercentageToReadableValue(liquidationIncentivePercentage),
        },
      );
    }

    return tmpStats;
  }, [
    asset,
    t,
    type,
    liquidationIncentivePercentage,
    liquidationThresholdPercentage,
    shouldDisplayLiquidationInfo,
  ]);

  const legends: MarketCardProps['legends'] = [
    type === 'supply'
      ? {
          label: t('market.legends.supplyApy'),
          color: 'green',
        }
    : type === 'borrow' ?
      {
          label: t('market.legends.borrowApy'),
          color: 'red',
      }
    : {
        label: t('market.legends.supply'),
        color: 'green',
      },
      {
        label: t('market.legends.liquidity'),
        color: 'red',
      }

  ];
  return (
    <MarketCard
      title={type === 'supply' ? t('market.supplyInfo.title') : type === 'liquidity' ? t('market.liquidityInfo.title')  : t('market.borrowInfo.title')}
      stats={stats}
      legends={isApyChartsFeatureEnabled ? legends : undefined}
      topContent={
          type != 'liquidity' &&
            <CapThreshold
              type={type as ApyChartProps['type']}
              tokenPriceCents={asset.tokenPriceCents}
              capTokens={type === 'supply' ? asset.supplyCapTokens : asset.borrowCapTokens}
              balanceTokens={type === 'supply' ? asset.supplyBalanceTokens : asset.borrowBalanceTokens}
              token={asset.vToken.underlyingToken}
            />
      }
      rightContent={
        isApyChartsFeatureEnabled ? (
          <ButtonGroup
            buttonLabels={periodOptions.map(p => p.label)}
            activeButtonIndex={periodOptions.findIndex(p => p.value === selectedPeriod)}
            onButtonClick={index => setSelectedPeriod(periodOptions[index].value)}
            tokenAddress={asset.vToken.underlyingToken.address}
          />
        ) : undefined
      }
      {...otherProps}
    >
      {isLoading && data.length === 0 && <Spinner />}

      {data.length > 0 && 
        type === 'liquidity' ?  
        <LiquidityChart data={data as LiquidityChartProps['data']} selectedPeriod={selectedPeriod} />
        :
        <ApyChart data={data as ApyChartProps['data']} type={type as ApyChartProps['type']} selectedPeriod={selectedPeriod} />
      }
    </MarketCard>
  );
};
