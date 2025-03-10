/** @jsxImportSource @emotion/react */
import { useGetVaults } from 'clients/api';
import { Page, Spinner } from 'components';
import { useAccountAddress } from 'libs/wallet';
import type { Vault } from 'types';

import VaultItem from './VaultItem';
import { useStyles } from './styles';

export interface VaultUiProps {
  vaults: Vault[];
  isInitialLoading: boolean;
}

const generateVaultKey = (vault: Vault) =>
  `vault-${vault.stakedToken.address}-${vault.rewardToken.address}-${vault.lockingPeriodMs || 0}`;

export const VaultUi: React.FC<VaultUiProps> = ({ vaults, isInitialLoading }) => {
  const styles = useStyles();

  if (isInitialLoading || vaults.length === 0) {
    return <Spinner />;
  }

  return (
    <div css={styles.container}>
      {vaults.map(vault => (
        <VaultItem {...vault} key={generateVaultKey(vault)} />
      ))}
    </div>
  );
};

const VaultPage: React.FC = () => {
  const { accountAddress } = useAccountAddress();
  const { data: vaults, isLoading: isGetVaultsLoading } = useGetVaults({
    accountAddress,
  });

  return (
    <Page indexWithSearchEngines={false}>
      <VaultUi vaults={vaults} isInitialLoading={isGetVaultsLoading} />
    </Page>
  );
};

export default VaultPage;
