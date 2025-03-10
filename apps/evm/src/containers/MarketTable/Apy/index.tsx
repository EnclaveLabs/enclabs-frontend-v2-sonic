import { useMemo } from 'react';

import { Icon, LabeledInlineContent, LabeledInlineContentProps, LayeredValues, Tooltip } from 'components';
import useFormatPercentageToReadableValue from 'hooks/useFormatPercentageToReadableValue';
import { useGetToken } from 'libs/tokens';
import type { Asset, AssetDistribution, PrimeDistribution, PrimeSimulationDistribution } from 'types';
import { cn, formatPercentageToReadableValue, getCombinedDistributionApys } from 'utilities';

import type { ColumnKey } from '../types';
import { ApyWithPrimeBoost } from './ApyWithPrimeBoost';
import { ApyWithPrimeSimulationBoost } from './ApyWithPrimeSimulationBoost';
import { Link } from 'react-router-dom';
import { t } from 'i18next';

export interface ApyProps {
  asset: Asset;
  column: ColumnKey;
  className?: string;
  classNameBottomValue?: string;
}

export const Apy: React.FC<ApyProps> = ({ asset, column, className, classNameBottomValue }) => {
  const type = column === 'supplyApyLtv' || column === 'labeledSupplyApyLtv' ? 'supply' : 'borrow';

  // const xvs = useGetToken({
  //   symbol: 'XVS',
  // });
  const combinedDistributionApys = useMemo(() => getCombinedDistributionApys({ asset }), [asset]);

  const { primeDistribution, primeSimulationDistribution } = useMemo(() => {
    const result: {
      primeSimulationDistribution?: PrimeSimulationDistribution;
      primeDistribution?: PrimeDistribution;
    } = {};

    const distributions = type === 'borrow' ? asset.borrowDistributions : asset.supplyDistributions;

    distributions.forEach(distribution => {
      if (distribution.type === 'prime') {
        result.primeDistribution = distribution;
      } else if (distribution.type === 'primeSimulation') {
        result.primeSimulationDistribution = distribution;
      }
    });

    return result;
  }, [asset.borrowDistributions, asset.supplyDistributions, type]);

  const apyPercentage =
    type === 'borrow'
      ? asset.borrowApyPercentage.minus(combinedDistributionApys.totalBorrowApyPercentage)
      : asset.supplyApyPercentage.plus(combinedDistributionApys.totalSupplyApyPercentage);

  const readableApy = useFormatPercentageToReadableValue({
    value: apyPercentage,
  });

  const readableLtv = useFormatPercentageToReadableValue({
    value: +asset.collateralFactor * 100,
  });

  // // Display Prime boost
  // if (primeDistribution?.apyPercentage?.isGreaterThan(0)) {
  //   const apyPercentageWithoutPrimeBoost =
  //     type === 'borrow'
  //       ? apyPercentage.plus(primeDistribution.apyPercentage)
  //       : apyPercentage.minus(primeDistribution.apyPercentage);

  //   return (
  //     <ApyWithPrimeBoost
  //       className={className}
  //       type={type}
  //       tokenAddress={asset.vToken.underlyingToken.address}
  //       apyPercentage={apyPercentage}
  //       apyPercentageWithoutPrimeBoost={apyPercentageWithoutPrimeBoost}
  //       readableLtv={readableLtv}
  //     />
  //   );
  // }

  // // Display hypothetical Prime boost
  // if (primeSimulationDistribution?.apyPercentage.isGreaterThan(0)) {
  //   return (
  //     <ApyWithPrimeSimulationBoost
  //       className={className}
  //       type={type}
  //       tokenAddress={asset.vToken.underlyingToken.address}
  //       apyPercentage={apyPercentage}
  //       readableLtv={readableLtv}
  //       primeSimulationDistribution={primeSimulationDistribution}
  //       xvs={xvs!}
  //     />
  //   );
  // }

  // No Prime boost or Prime boost simulation to display

  const supplyBorrowApyRow: LabeledInlineContentProps = {
    label: type === 'supply'
      ? t('assetInfo.supplyApy')
      : t('assetInfo.borrowApy'),
    iconSrc: asset.vToken.underlyingToken,
    children: formatPercentageToReadableValue(
      type === 'supply'
        ? asset.supplyApyPercentage
        : asset.borrowApyPercentage,
    ),
    invertTextColors: true,
  };

  const distributions : AssetDistribution[] = type === 'supply'
      ? asset.supplyDistributions
      : asset.borrowDistributions

  const distributionApyRows: LabeledInlineContentProps[] = distributions
    .filter(d => d.apyPercentage.toString() > "0")
    .map((distribution) =>
    ({
      label: t('assetInfo.distributionApy', {
        tokenSymbol: distribution.token.symbol
      }),
      iconSrc: distribution.token,
      invertTextColors: true,
      children: formatPercentageToReadableValue(distribution.apyPercentage),
    }));

  // Display supply APY
  if (type === 'supply') {
    
    return (
      distributionApyRows.length > 0 ? (
        <Tooltip
          title={
            <div>
              <LabeledInlineContent {...supplyBorrowApyRow} />
              {distributionApyRows.map((row, index) => (
                <LabeledInlineContent key={index} {...row} />
              ))}
            </div>
          }
        >
          <div className='flex justify-start lg:justify-end gap-[5px]' >
            <Icon name="distribution"/>
            <LayeredValues 
              className={cn(className, 'text-[#00C38E]')}
              classNameBottomValue={classNameBottomValue}
              topValue={readableApy}
              bottomValue={readableLtv}
              />
            </div>
        </Tooltip>
      ) : (
        <LayeredValues
          className={className}
          classNameBottomValue={classNameBottomValue}
          topValue={readableApy}
          bottomValue={readableLtv}
        />
      )
    )
  }

  // Display borrow APY
  return (
    
    distributionApyRows.length > 0 ? (
      <div className='flex justify-start lg:justify-end gap-[5px]' >
        <Icon name="distribution"/>
        <span className={cn(className, 'text-[#00C38E]')}>{readableApy}</span>
      </div>
    ) : (
      <span className={className}>{readableApy}</span>
    )
  )
};
