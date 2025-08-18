// import type { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useGetXvsVaultPaused, useGetXvsVaultPoolCount, useGetXvsVaultTotalAllocationPoints, useGetXvsVaultsTotalDailyDistributedXvs } from 'clients/api';
import { DAYS_PER_YEAR } from 'constants/time';
import { useGetToken, useGetTokens } from 'libs/tokens';
import type { Vault } from 'types';
import { convertTokensToMantissa, indexBy } from 'utilities';
import findTokenByAddress from 'utilities/findTokenByAddress';

import BigNumber from 'bignumber.js';
import useGetXvsVaultPoolBalances from './useGetXvsVaultPoolBalances';
import useGetXvsVaultPools, { type BatchedXvsVaultPoolsData } from './useGetXvsVaultPools';

export interface UseGetVestingVaultsOutput {
  isLoading: boolean;
  data: Vault[];
}

const useGetVestingVaults = ({
  accountAddress,
}: {
  accountAddress?: string;
}): UseGetVestingVaultsOutput => {
  const xvs = useGetToken({
    symbol: 'XVS',
  });
  const tokens = useGetTokens();

  const {
    data: xvsVaultPoolCountData = { poolCount: 0 },
    isLoading: isGetXvsVaultPoolCountLoading,
  } = useGetXvsVaultPoolCount({ enabled: !!accountAddress });

  // Fetch data generic to all XVS pools
  const {
    data: xvsVaultDailyDistributedXvsData,
    isLoading: isGetXvsVaultsTotalDailyDistributedXvsLoading,
  } = useGetXvsVaultsTotalDailyDistributedXvs(
    {
      stakedToken: xvs as NonNullable<typeof xvs>,
    },
    {
      enabled: !!xvs && !!accountAddress,
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  );

  const {
    data: xvsVaultTotalAllocationPointsData,
    isLoading: isGetXvsVaultTotalAllocationPointsLoading,
  } = useGetXvsVaultTotalAllocationPoints(
    {
      tokenAddress: (xvs as NonNullable<typeof xvs>).address,
    },
    {
      enabled: !!xvs && !!accountAddress,
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  );

  const { data: getXvsVaultPausedData, isLoading: isGetXvsVaultPausedLoading } =
    useGetXvsVaultPaused({ enabled: !!accountAddress, staleTime: 5 * 60 * 1000, gcTime: 5 * 60 * 1000, refetchOnWindowFocus: false });

  // Fetch pools
  const poolsDataQuery = useGetXvsVaultPools({
    accountAddress,
    poolsCount: xvsVaultPoolCountData.poolCount,
  });
  const arePoolQueriesLoading = poolsDataQuery.isLoading;


  // Index results by pool ID
  const [poolData, stakedTokenAddresses] = useMemo(() => {
    const data: {
      [poolIndex: string]: {
        poolInfos: BatchedXvsVaultPoolsData['poolInfos'][number];
        pendingWithdrawalsBalanceMantissa: BigNumber;
        userHasPendingWithdrawalsFromBeforeUpgrade: boolean;
        userInfos?: BatchedXvsVaultPoolsData['userInfos'][number];
      };
    } = {};

    const tokenAddresses: string[] = [];

    for (let poolIndex = 0; poolIndex < xvsVaultPoolCountData.poolCount; poolIndex++) {
      const poolInfos = poolsDataQuery.data?.poolInfos?.[poolIndex];
      const pending = poolsDataQuery.data?.pendingWithdrawals?.[poolIndex];
      const userInfo = poolsDataQuery.data?.userInfos?.[poolIndex];
      const userPending = poolsDataQuery.data?.userPendingBeforeUpgrade?.[poolIndex];

      if (poolInfos && pending?.balanceMantissa) {
        tokenAddresses.push(poolInfos.stakedTokenAddress);

        data[poolIndex] = {
          poolInfos,
          userInfos: userInfo,
          pendingWithdrawalsBalanceMantissa: pending.balanceMantissa,
          userHasPendingWithdrawalsFromBeforeUpgrade:
            userPending?.userPendingWithdrawalsFromBeforeUpgradeMantissa?.isGreaterThan(0) ||
            false,
        };
      }
    }

    return [data, tokenAddresses];
  }, [poolsDataQuery.data, xvsVaultPoolCountData.poolCount]);

  // Fetch pool balances
  const poolBalanceQueryResults = useGetXvsVaultPoolBalances({
    stakedTokenAddresses,
  });
  const arePoolBalanceQueriesLoading = poolBalanceQueryResults.some(
    queryResult => queryResult.isLoading,
  );

  // Index results by pool ID
  const poolBalances = useMemo(
    () =>
      indexBy(
        (_item, index) => `${index}`,
        poolBalanceQueryResults.map(poolBalanceQueryResult => poolBalanceQueryResult.data),
      ),
    [poolBalanceQueryResults],
  );

  const isLoading =
    isGetXvsVaultPoolCountLoading ||
    isGetXvsVaultsTotalDailyDistributedXvsLoading ||
    isGetXvsVaultTotalAllocationPointsLoading ||
    arePoolQueriesLoading ||
    arePoolBalanceQueriesLoading ||
    isGetXvsVaultPausedLoading;

  // Format query results into Vaults
  const data: Vault[] = useMemo(
    () =>
      Array.from({ length: xvsVaultPoolCountData.poolCount }).reduce<Vault[]>(
        (acc, _item, poolIndex) => {
          const lockingPeriodMs = poolData[poolIndex]?.poolInfos.lockingPeriodMs;
          const userStakedMantissa = poolData[poolIndex]?.userInfos?.stakedAmountMantissa.minus(
            poolData[poolIndex]?.userInfos?.pendingWithdrawalsTotalAmountMantissa || 0,
          );

          const userHasPendingWithdrawalsFromBeforeUpgrade =
            poolData[poolIndex]?.userHasPendingWithdrawalsFromBeforeUpgrade;

          const pendingWithdrawalsMantissa = poolData[poolIndex]?.pendingWithdrawalsBalanceMantissa;
          const totalStakedMantissaData = poolBalances[poolIndex];

          const totalStakedMantissa = totalStakedMantissaData
            ? totalStakedMantissaData.balanceMantissa.minus(pendingWithdrawalsMantissa ?? 0)
            : new BigNumber(0);

          const stakedToken =
            poolData[poolIndex]?.poolInfos?.stakedTokenAddress &&
            findTokenByAddress({
              tokens,
              address: poolData[poolIndex]?.poolInfos.stakedTokenAddress,
            });

          const dailyDistributedXvs =
            xvsVaultDailyDistributedXvsData?.dailyDistributedXvs !== undefined &&
              xvsVaultTotalAllocationPointsData?.totalAllocationPoints !== undefined &&
              poolData[poolIndex]?.poolInfos.allocationPoint
              ? xvsVaultDailyDistributedXvsData?.dailyDistributedXvs
                .multipliedBy(poolData[poolIndex]?.poolInfos.allocationPoint)
                .div(xvsVaultTotalAllocationPointsData.totalAllocationPoints)
              : undefined;

          const dailyDistributedXvsMantissa =
            dailyDistributedXvs &&
            convertTokensToMantissa({
              value: dailyDistributedXvs,
              token: xvs as NonNullable<typeof xvs>,
            });

          const stakingAprPercentage = dailyDistributedXvsMantissa
            ?.multipliedBy(DAYS_PER_YEAR)
            .div(
              totalStakedMantissa.isGreaterThan(0) ? totalStakedMantissa : 1, // Prevent dividing by 0 if balance is 0
            )
            .multipliedBy(100)
            .toNumber();

          if (
            !!stakedToken &&
            lockingPeriodMs !== undefined &&
            dailyDistributedXvsMantissa !== undefined &&
            totalStakedMantissaData !== undefined &&
            stakingAprPercentage !== undefined &&
            getXvsVaultPausedData?.isVaultPaused !== undefined &&
            !!xvs
          ) {
            const vault: Vault = {
              isPaused: getXvsVaultPausedData.isVaultPaused,
              rewardToken: xvs,
              stakedToken,
              lockingPeriodMs,
              dailyEmissionMantissa: dailyDistributedXvsMantissa,
              totalStakedMantissa,
              stakingAprPercentage,
              userStakedMantissa,
              poolIndex,
              userHasPendingWithdrawalsFromBeforeUpgrade,
            };

            return [...acc, vault];
          }

          return acc;
        },
        [],
      ),
    [
      xvsVaultPoolCountData.poolCount,
      poolData,
      poolBalances,
      xvsVaultDailyDistributedXvsData?.dailyDistributedXvs,
      xvsVaultTotalAllocationPointsData?.totalAllocationPoints,
      getXvsVaultPausedData?.isVaultPaused,
      xvs,
      tokens,
    ],
  );

  return {
    data,
    isLoading,
  };
};

export default useGetVestingVaults;
