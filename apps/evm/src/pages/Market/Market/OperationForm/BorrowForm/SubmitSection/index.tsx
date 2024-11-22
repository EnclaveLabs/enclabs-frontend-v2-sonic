import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { ApproveDelegateSteps, type ApproveDelegateStepsProps, PrimaryButton } from 'components';
import { useTranslation } from 'libs/translations';
import { cn } from 'utilities';
import { getTokenType } from 'components/Tag';
import { tokenTypeInfo} from 'constants/tokenType';

export interface SubmitSectionProps {
  isFormValid: boolean;
  isFormSubmitting: boolean;
  safeLimitTokens: string;
  fromTokenAmountTokens: string;
  approveDelegateAction: ApproveDelegateStepsProps['approveDelegateeAction'];
  isApproveDelegateLoading: ApproveDelegateStepsProps['isApproveDelegateeLoading'];
  isDelegateApproved: ApproveDelegateStepsProps['isDelegateeApproved'];
  isDelegateApprovedLoading: ApproveDelegateStepsProps['isDelegateeApprovedLoading'];
  tokenAddress?: string;
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({
  isFormValid,
  isFormSubmitting,
  safeLimitTokens,
  fromTokenAmountTokens,
  approveDelegateAction,
  isApproveDelegateLoading,
  isDelegateApproved,
  isDelegateApprovedLoading,
  tokenAddress,
}) => {
  const { t } = useTranslation();

  const tokenTypeInfos = useMemo(
    () => {
      const tokenType = getTokenType(tokenAddress!);
      return tokenTypeInfo[tokenType];
    },
    [tokenAddress],
  );


  const isDangerous = useMemo(
    () => new BigNumber(fromTokenAmountTokens).isGreaterThanOrEqualTo(safeLimitTokens),
    [fromTokenAmountTokens, safeLimitTokens],
  );

  const submitButtonLabel = useMemo(() => {
    if (!isFormValid) {
      return t('operationForm.submitButtonLabel.enterValidAmount');
    }

    return t('operationForm.submitButtonLabel.borrow');
  }, [isFormValid, t]);

  return (
    <ApproveDelegateSteps
      approveDelegateeAction={approveDelegateAction}
      isApproveDelegateeLoading={isApproveDelegateLoading}
      isDelegateeApproved={isDelegateApproved}
      isDelegateeApprovedLoading={isDelegateApprovedLoading}
      secondStepButtonLabel={submitButtonLabel}
      hideDelegateeApprovalStep={!isFormValid}
    >
      <PrimaryButton
        type="submit"
        loading={isFormSubmitting}
        disabled={!isFormValid || isFormSubmitting}
        className={cn('w-full', `${tokenTypeInfos.buttonClassName}`, 'bg-red', isDangerous && 'border-red bg-red')}
      >
        {submitButtonLabel}
      </PrimaryButton>
    </ApproveDelegateSteps>
  );
};

export default SubmitSection;
