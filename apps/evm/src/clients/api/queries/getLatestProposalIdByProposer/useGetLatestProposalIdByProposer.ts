import { type QueryObserverOptions, useQuery } from 'react-query';

import getLatestProposalIdByProposer, {
  type GetLatestProposalIdByProposerInput,
  type GetLatestProposalIdByProposerOutput,
} from 'clients/api/queries/getLatestProposalIdByProposer';
import FunctionKey from 'constants/functionKey';
import { useGetChainMetadata } from 'hooks/useGetChainMetadata';
import { useGetGovernorBravoDelegateContract } from 'libs/contracts';
import { governanceChain } from 'libs/wallet';
import { callOrThrow } from 'utilities';

type Options = QueryObserverOptions<
  GetLatestProposalIdByProposerOutput,
  Error,
  GetLatestProposalIdByProposerOutput,
  GetLatestProposalIdByProposerOutput,
  [FunctionKey.GET_LATEST_PROPOSAL_ID_BY_PROPOSER, string]
>;

const useGetLatestProposalIdByProposer = (
  { accountAddress }: Omit<GetLatestProposalIdByProposerInput, 'governorBravoDelegateContract'>,
  options?: Options,
) => {
  const { blockTimeMs } = useGetChainMetadata();

  const governorBravoDelegateContract = useGetGovernorBravoDelegateContract({
    chainId: governanceChain.id,
  });

  return useQuery(
    [FunctionKey.GET_LATEST_PROPOSAL_ID_BY_PROPOSER, accountAddress],
    () =>
      callOrThrow({ governorBravoDelegateContract }, params =>
        getLatestProposalIdByProposer({
          accountAddress,
          ...params,
        }),
      ),
    {
      staleTime: blockTimeMs,
      ...options,
    },
  );
};

export default useGetLatestProposalIdByProposer;
