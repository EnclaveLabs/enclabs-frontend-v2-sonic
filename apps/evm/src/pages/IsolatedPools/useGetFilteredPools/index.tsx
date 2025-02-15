import { useGetIsolatedPools } from 'clients/api';
import { useGetChainMetadata } from 'hooks/useGetChainMetadata';
import { useMemo } from 'react';

export const useGetFilteredPools = () => {
  const { data: getPoolsData } = useGetIsolatedPools();
  const chainMetaData = useGetChainMetadata();

  const pools = useMemo(
    () =>
      (getPoolsData?.pools || []),
    [getPoolsData?.pools, chainMetaData.corePoolComptrollerContractAddress],
  );

  return { pools };
};
