import { type UseQueryResult, useQuery } from '@tanstack/react-query';

import {
  type GetXvsVaultPendingWithdrawalsBalanceOutput,
  type GetXvsVaultPoolInfoOutput,
  type GetXvsVaultUserInfoOutput,
  type GetXvsVaultUserPendingWithdrawalsFromBeforeUpgradeOutput,
  getXvsVaultPendingWithdrawalsBalance,
  getXvsVaultPoolInfo,
  getXvsVaultUserInfo,
  getXvsVaultUserPendingWithdrawalsFromBeforeUpgrade,
} from 'clients/api';
import FunctionKey from 'constants/functionKey';
import { useGetXvsVaultContract } from 'libs/contracts';
import { useGetToken } from 'libs/tokens';
import { useChainId } from 'libs/wallet';
import { callOrThrow } from 'utilities';

export interface UseGetXvsVaultPoolsInput {
  poolsCount: number;
  accountAddress?: string;
}

export interface BatchedXvsVaultPoolsData {
  poolInfos: GetXvsVaultPoolInfoOutput[];
  pendingWithdrawals: GetXvsVaultPendingWithdrawalsBalanceOutput[];
  userInfos: Array<GetXvsVaultUserInfoOutput | undefined>;
  userPendingBeforeUpgrade: Array<
    GetXvsVaultUserPendingWithdrawalsFromBeforeUpgradeOutput | undefined
  >;
}

export type UseGetXvsVaultPoolsOutput = UseQueryResult<BatchedXvsVaultPoolsData>;

const useGetXvsVaultPools = ({
  accountAddress,
  poolsCount,
}: UseGetXvsVaultPoolsInput): UseGetXvsVaultPoolsOutput => {
  const { chainId } = useChainId();

  const xvsVaultContract = useGetXvsVaultContract();

  const xvs = useGetToken({
    symbol: 'XVS',
  });

  const isReady = !!xvsVaultContract && !!xvs;

  const FIVE_MINUTES_MS = 5 * 60 * 1000;

  return useQuery<BatchedXvsVaultPoolsData>({
    queryKey: [
      FunctionKey.GET_XVS_VAULT_POOL_INFOS,
      { chainId, rewardTokenAddress: xvs?.address, poolsCount, accountAddress },
    ],
    enabled: isReady,
    staleTime: FIVE_MINUTES_MS,
    gcTime: FIVE_MINUTES_MS,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
    queryFn: async () => {

      const infoPromises: Promise<GetXvsVaultPoolInfoOutput>[] = [];
      const pendingPromises: Promise<GetXvsVaultPendingWithdrawalsBalanceOutput>[] = [];
      const userInfoPromises: Array<Promise<GetXvsVaultUserInfoOutput> | undefined> = [];
      const userPendingBeforePromises: Array<
        Promise<GetXvsVaultUserPendingWithdrawalsFromBeforeUpgradeOutput> | undefined
      > = [];

      for (let poolIndex = 0; poolIndex < poolsCount; poolIndex++) {
        infoPromises.push(
          callOrThrow({ xvsVaultContract, xvs }, params =>
            getXvsVaultPoolInfo({
              ...params,
              rewardTokenAddress: params.xvs.address,
              poolIndex,
            }),
          ),
        );

        pendingPromises.push(
          callOrThrow({ xvsVaultContract, xvs }, params =>
            getXvsVaultPendingWithdrawalsBalance({
              ...params,
              rewardTokenAddress: params.xvs.address,
              poolIndex,
            }),
          ),
        );

        if (accountAddress) {
          userInfoPromises.push(
            callOrThrow({ xvsVaultContract, xvs }, params =>
              getXvsVaultUserInfo({
                ...params,
                rewardTokenAddress: params.xvs.address,
                poolIndex,
                accountAddress,
              }),
            ),
          );

          userPendingBeforePromises.push(
            callOrThrow({ xvsVaultContract, xvs }, params =>
              getXvsVaultUserPendingWithdrawalsFromBeforeUpgrade({
                ...params,
                rewardTokenAddress: params.xvs.address,
                poolIndex,
                accountAddress,
              }),
            ),
          );
        } else {
          userInfoPromises.push(undefined);
          userPendingBeforePromises.push(undefined);
        }
      }

      let poolInfos: GetXvsVaultPoolInfoOutput[] = [];
      let pendingWithdrawals: GetXvsVaultPendingWithdrawalsBalanceOutput[] = [];

      poolInfos = await Promise.all(infoPromises);

      pendingWithdrawals = await Promise.all(pendingPromises);

      const userInfos: Array<GetXvsVaultUserInfoOutput | undefined> = await Promise.all(
        userInfoPromises.map(p => (p ? p : Promise.resolve(undefined))),
      );

      const userPendingBeforeUpgrade: Array<
        GetXvsVaultUserPendingWithdrawalsFromBeforeUpgradeOutput | undefined
      > = await Promise.all(
        userPendingBeforePromises.map(p => (p ? p : Promise.resolve(undefined))),
      );

      const result = {
        poolInfos,
        pendingWithdrawals,
        userInfos,
        userPendingBeforeUpgrade,
      };


      return result;
    },
  });
};

export default useGetXvsVaultPools;
