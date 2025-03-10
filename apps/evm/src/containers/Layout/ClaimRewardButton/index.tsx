import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { type Claim, useClaimRewards } from 'clients/api';
import { type ButtonProps, Checkbox, Modal, PrimaryButton } from 'components';
import { useGetChainMetadata } from 'hooks/useGetChainMetadata';
import { VError, handleError } from 'libs/errors';
import { useTranslation } from 'libs/translations';
import { useAccountAddress } from 'libs/wallet';
import { cn, formatCentsToReadableValue } from 'utilities';

import TEST_IDS from '../testIds';
import { RewardGroup } from './RewardGroup';
import type { Group } from './types';
import useGetGroups from './useGetGroups';

export interface ClaimRewardButtonUiProps extends ClaimRewardButtonProps {
  isModalOpen: boolean;
  isClaimingRewards: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onClaimReward: () => Promise<unknown>;
  onToggleAllGroups: () => void;
  onToggleGroup: (toggledGroup: Group) => void;
  chainLogoSrc: string;
  chainName: string;
  groups: Group[];
}

export const ClaimRewardButtonUi: React.FC<ClaimRewardButtonUiProps> = ({
  isModalOpen,
  isClaimingRewards,
  onOpenModal,
  onCloseModal,
  onClaimReward,
  onToggleAllGroups,
  onToggleGroup,
  groups,
  chainLogoSrc,
  chainName,
  variant,
  className,
  ...otherButtonProps
}) => {
  const { t } = useTranslation();

  const totalRewardsCents = useMemo(
    () =>
      groups?.reduce<BigNumber>(
        (groupsAcc, g) =>
          groupsAcc.plus(
            g.pendingRewards.reduce<BigNumber>(
              (acc, r) => acc.plus(r.rewardAmountCents || new BigNumber(0)),
              new BigNumber(0),
            ),
          ),
        new BigNumber(0),
      ),
    [groups],
  );

  const handleClaimReward = async () => {
    try {
      await onClaimReward();
      onCloseModal();
    } catch (error) {
      handleError({ error });
    }
  };

  const isSubmitDisabled = !groups.some(group => group.isChecked);

  if (!groups.length) {
    return null;
  }

  return (
    <>
      <PrimaryButton
        data-testid={TEST_IDS.claimRewardOpenModalButton}
        onClick={onOpenModal}
        className={cn(
          className,
          variant === 'secondary' &&
            'border-transparent bg-lightBlack text-background hover:border-transparent hover:bg-grey active:bg-grey active:border-transparent',
        )}
        {...otherButtonProps}
      >
        {t('claimReward.openModalButton.label', {
          rewardAmount: formatCentsToReadableValue({
            value: totalRewardsCents,
          }),
        })}
      </PrimaryButton>

      <Modal
        isOpen={isModalOpen}
        handleClose={onCloseModal}
        title={
          <div className="flex items-center">
            <img src={chainLogoSrc} alt={chainName} className="mr-3 w-6" />

            {t('claimReward.modal.title', {
              chainName,
            })}
          </div>
        }
      >
        <>
          <div className="border-lightGrey mb-4 flex items-center justify-between border-b pb-4">
            <p className="text-lg">{t('claimReward.modal.selectAll')}</p>

            <Checkbox
              onChange={onToggleAllGroups}
              value={groups.every(group => group.isChecked || group.isDisabled)}
              data-testid={TEST_IDS.claimRewardSelectAllCheckbox}
            />
          </div>

          <div data-testid={TEST_IDS.claimRewardBreakdown}>
            {groups.map(group => (
              <RewardGroup
                group={group}
                onCheckChange={() => onToggleGroup(group)}
                key={`claim-reward-modal-reward-group-${group.id}`}
              />
            ))}
          </div>

          <PrimaryButton
            onClick={handleClaimReward}
            className="w-full"
            disabled={isSubmitDisabled}
            data-testid={TEST_IDS.claimRewardSubmitButton}
            loading={isClaimingRewards}
          >
            {isSubmitDisabled
              ? t('claimReward.modal.claimButton.disabledLabel')
              : t('claimReward.modal.claimButton.enabledLabel')}
          </PrimaryButton>
        </>
      </Modal>
    </>
  );
};

export interface ClaimRewardButtonProps extends Omit<ButtonProps, 'onClick' | 'variant'> {
  variant?: 'primary' | 'secondary';
}

export const ClaimRewardButton: React.FC<ClaimRewardButtonProps> = props => {
  const { accountAddress } = useAccountAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const chainMetadata = useGetChainMetadata();

  const [uncheckedGroupIds, setUncheckedGroupIds] = useState<string[]>([]);
  const groups = useGetGroups({
    uncheckedGroupIds,
  });

  const { mutateAsync: claimRewards, isPending: isClaimingRewards } = useClaimRewards();

  const handleClaimReward = async () => {
    if (!accountAddress) {
      throw new VError({ type: 'unexpected', code: 'somethingWentWrong' });
    }

    // Extract all claims from checked groups
    const claims = groups.reduce<Claim[]>(
      (acc, group) => (group.isChecked && !group.isDisabled ? acc.concat(group.claims) : acc),
      [],
    );

    return claimRewards({
      claims,
      accountAddress,
    });
  };

  const handleOpenModal = () => {
    // Select all claimable rewards
    setUncheckedGroupIds([]);
    // Open modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleToggleGroup = (toggledGroup: Group) =>
    setUncheckedGroupIds(currentUncheckedGroupIds =>
      toggledGroup.isChecked
        ? [...currentUncheckedGroupIds, toggledGroup.id]
        : currentUncheckedGroupIds.filter(
            currentCheckedGroupName => currentCheckedGroupName !== toggledGroup.id,
          ),
    );

  const handleToggleAllGroups = () =>
    setUncheckedGroupIds(currentUncheckedGroupIds =>
      currentUncheckedGroupIds.length > 0 ? [] : groups.map(group => group.id),
    );

  return (
    <ClaimRewardButtonUi
      groups={groups}
      isClaimingRewards={isClaimingRewards}
      isModalOpen={isModalOpen}
      onOpenModal={handleOpenModal}
      onCloseModal={handleCloseModal}
      onClaimReward={handleClaimReward}
      onToggleGroup={handleToggleGroup}
      onToggleAllGroups={handleToggleAllGroups}
      chainLogoSrc={chainMetadata.logoSrc}
      chainName={chainMetadata.name}
      {...props}
    />
  );
};

export default ClaimRewardButton;
