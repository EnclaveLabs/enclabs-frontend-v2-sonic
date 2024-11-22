import { useMemo } from 'react';

import { ApproveDelegateSteps, type ApproveDelegateStepsProps, PrimaryButton } from 'components';
import { useTranslation } from 'libs/translations';
import { getTokenType } from 'components/Tag';
import { tokenTypeInfo} from 'constants/tokenType';
import { cn } from 'utilities';

export interface SubmitSectionProps {
  isFormValid: boolean;
  isFormSubmitting: boolean;
  approveDelegateAction: ApproveDelegateStepsProps['approveDelegateeAction'];
  isApproveDelegateLoading: ApproveDelegateStepsProps['isApproveDelegateeLoading'];
  isDelegateApproved: ApproveDelegateStepsProps['isDelegateeApproved'];
  isDelegateApprovedLoading: ApproveDelegateStepsProps['isDelegateeApprovedLoading'];
  tokenAddress?: string;
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({
  isFormValid,
  isFormSubmitting,
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


  const submitButtonLabel = useMemo(() => {
    if (!isFormValid) {
      return t('operationForm.submitButtonLabel.enterValidAmount');
    }

    return t('operationForm.submitButtonLabel.withdraw');
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
        className={cn('w-full', `${tokenTypeInfos.buttonClassName}`)}
      >
        {submitButtonLabel}
      </PrimaryButton>
    </ApproveDelegateSteps>
  );
};

export default SubmitSection;
