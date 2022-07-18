import { QueryObserverOptions, useQuery } from 'react-query';

import getXvsVaultPoolsCount, {
  GetXvsVaultPoolsCountOutput,
} from 'clients/api/queries/getXvsVaultPoolsCount';
import { useXvsVaultProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetXvsVaultPoolsCountOutput,
  Error,
  GetXvsVaultPoolsCountOutput,
  GetXvsVaultPoolsCountOutput,
  FunctionKey.GET_XVS_VAULT_POOLS_COUNT
>;

const useGetXvsVaultPoolsCount = (options?: Options) => {
  const xvsVaultContract = useXvsVaultProxyContract();

  return useQuery(
    FunctionKey.GET_XVS_VAULT_POOLS_COUNT,
    () => getXvsVaultPoolsCount({ xvsVaultContract }),
    options,
  );
};

export default useGetXvsVaultPoolsCount;
