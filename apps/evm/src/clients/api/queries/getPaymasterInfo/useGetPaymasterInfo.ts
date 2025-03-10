import { type QueryObserverOptions, useQuery } from '@tanstack/react-query';

import FunctionKey from 'constants/functionKey';
import { zyFiWalletAddresses } from 'constants/gasLess';
import { useGetZyFiVaultContract } from 'libs/contracts';
import type { ChainId } from 'types';
import { callOrThrow } from 'utilities';
import { type GetPaymasterInfoOutput, getPaymasterInfo } from '.';

type UseGetPaymasterInfoInput = {
  chainId: ChainId;
};

export type UseGetPaymasterInfoQueryKey = [
  FunctionKey.GET_PAYMASTER_INFO,
  UseGetPaymasterInfoInput,
];

type Options = QueryObserverOptions<
  GetPaymasterInfoOutput,
  Error,
  GetPaymasterInfoOutput,
  GetPaymasterInfoOutput,
  UseGetPaymasterInfoQueryKey
>;

const useGetPaymasterInfo = ({ chainId }: UseGetPaymasterInfoInput, options?: Partial<Options>) => {
  const zyFiVaultContract = useGetZyFiVaultContract({ chainId });
  const zyFiWalletAddress = zyFiWalletAddresses[chainId];

  return useQuery({
    queryKey: [FunctionKey.GET_PAYMASTER_INFO, { chainId }],
    queryFn: () => callOrThrow({ zyFiVaultContract, zyFiWalletAddress }, getPaymasterInfo),
    ...options,
    enabled:
      (options?.enabled === undefined || options?.enabled) &&
      !!zyFiVaultContract &&
      !!zyFiWalletAddress,
  });
};

export default useGetPaymasterInfo;
