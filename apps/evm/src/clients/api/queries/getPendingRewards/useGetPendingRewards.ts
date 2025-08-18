import { type QueryObserverOptions, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import FunctionKey from "constants/functionKey";
import { useGetPoolLensContract, useGetResilientOracleContract, useGetVenusLensContract } from "libs/contracts";
import { useGetTokens } from "libs/tokens";
import { useChainId } from "libs/wallet";
import type { ChainId } from "types";
import { callOrThrow, generatePseudoRandomRefetchInterval } from "utilities";

import getPendingRewards from ".";
import { useGetPools } from "../useGetPools";
import type { GetPendingRewardsInput, GetPendingRewardsOutput } from "./types";

type TrimmedGetPendingRewardsInput = Omit<
  GetPendingRewardsInput,
  | "venusLensContract"
  | "poolLensContract"
  | "vaiVaultContract"
  | "xvsVaultContract"
  | "resilientOracleContract"
  | "legacyPoolComptrollerContractAddress"
  | "isolatedPoolComptrollerAddresses"
  | "xvsVestingVaultPoolCount"
  | "xvsTokenAddress"
  | "tokens"
>;

export type UseGetPendingRewardsQueryKey = [
  FunctionKey.GET_PENDING_REWARDS,
  TrimmedGetPendingRewardsInput & {
    chainId: ChainId;
  }
];

type Options = QueryObserverOptions<
  GetPendingRewardsOutput,
  Error,
  GetPendingRewardsOutput,
  GetPendingRewardsOutput,
  UseGetPendingRewardsQueryKey
>;

const refetchInterval = generatePseudoRandomRefetchInterval();

const useGetPendingRewards = (
  input: TrimmedGetPendingRewardsInput,
  options?: Partial<Options>
) => {
  const { chainId } = useChainId();
  const resilientOracleContract = useGetResilientOracleContract();
  const venusLensContract = useGetVenusLensContract();
  const poolLensContract = useGetPoolLensContract();

  const tokens = useGetTokens();

  // Get Comptroller addresses of isolated pools
  const { data: getPoolsData, isLoading: isGetPoolsLoading } = useGetPools({
    accountAddress: input.accountAddress || undefined,
  });

  const isolatedPoolComptrollerAddresses = useMemo(
    () =>
      (getPoolsData?.pools || []).reduce<string[]>(
        (acc, pool) =>
          pool.isIsolated ? [...acc, pool.comptrollerAddress] : acc,
        []
      ),
    [getPoolsData?.pools]
  );

  // XVS vesting vault data not used in this implementation

  // Sort addresses to output the same data when providing them in a different
  // order. This prevents unnecessary queries
  const sortedIsolatedPoolComptrollerAddresses = [
    ...isolatedPoolComptrollerAddresses,
  ].sort();

  return useQuery({
    queryKey: [FunctionKey.GET_PENDING_REWARDS, { ...input, chainId }],
    queryFn: () =>
      callOrThrow(
        {
          resilientOracleContract,
          poolLensContract,
        },
        (params) =>
          getPendingRewards({
            venusLensContract,
            isolatedPoolComptrollerAddresses:
              sortedIsolatedPoolComptrollerAddresses,
            tokens,
            ...input,
            ...params,
          })
      ),
    refetchInterval,
    ...options,
    enabled:
      (!options || options.enabled) &&
      !isGetPoolsLoading,
  });
};

export default useGetPendingRewards;
