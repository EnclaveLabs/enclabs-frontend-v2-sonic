/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';

import { ApproveTokenSteps, type ApproveTokenStepsProps, PrimaryButton } from 'components';
import { HIGH_PRICE_IMPACT_THRESHOLD_PERCENTAGE } from 'constants/swap';
import { useTranslation } from 'libs/translations';
import type { Swap, Token } from 'types';
import { cn } from 'utilities';
import { getTokenType } from 'components/Tag';
import { tokenTypeInfo} from 'constants/tokenType';

import SwapSummary from '../../SwapSummary';

export interface SubmitSectionProps {
  isFormValid: boolean;
  isFormSubmitting: boolean;
  isUsingSwap: boolean;
  fromToken: Token;
  isSwapLoading: boolean;
  isFromTokenApproved: ApproveTokenStepsProps['isTokenApproved'];
  approveFromToken: ApproveTokenStepsProps['approveToken'];
  isApproveFromTokenLoading: ApproveTokenStepsProps['isApproveTokenLoading'];
  isFromTokenWalletSpendingLimitLoading: ApproveTokenStepsProps['isWalletSpendingLimitLoading'];
  isRevokeFromTokenWalletSpendingLimitLoading: boolean;
  swap?: Swap;
  tokenAddress?: string;
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({
  isFormValid,
  isFormSubmitting,
  isUsingSwap,
  fromToken,
  isFromTokenApproved,
  approveFromToken,
  isApproveFromTokenLoading,
  isFromTokenWalletSpendingLimitLoading,
  isRevokeFromTokenWalletSpendingLimitLoading,
  swap,
  isSwapLoading,
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


  const isSwappingWithHighPriceImpact = useMemo(
    () =>
      !!swap?.priceImpactPercentage &&
      swap?.priceImpactPercentage >= HIGH_PRICE_IMPACT_THRESHOLD_PERCENTAGE,
    [swap?.priceImpactPercentage],
  );

  const submitButtonLabel = useMemo(() => {
    if (!isFormValid) {
      return t('operationForm.submitButtonLabel.enterValidAmount');
    }

    return t('operationForm.submitButtonLabel.repay');
  }, [isFormValid, t]);

  return (
    <ApproveTokenSteps
      token={fromToken}
      isUsingSwap={isUsingSwap}
      hideTokenEnablingStep={!isFormValid}
      isTokenApproved={isFromTokenApproved}
      approveToken={approveFromToken}
      isApproveTokenLoading={isApproveFromTokenLoading}
      isWalletSpendingLimitLoading={isFromTokenWalletSpendingLimitLoading}
      secondStepButtonLabel={submitButtonLabel}
    >
      <PrimaryButton
        type="submit"
        loading={isFormSubmitting}
        className={cn('w-full',`${tokenTypeInfos.buttonClassName}`, isSwappingWithHighPriceImpact && 'border-red bg-red')}
        disabled={
          !isFormValid ||
          isFormSubmitting ||
          isSwapLoading ||
          isFromTokenWalletSpendingLimitLoading ||
          isRevokeFromTokenWalletSpendingLimitLoading ||
          !isFromTokenApproved
        }
      >
        {submitButtonLabel}
      </PrimaryButton>

      {isFormValid && !isSwapLoading && !isFromTokenWalletSpendingLimitLoading && (
        <SwapSummary swap={swap} type="repay" />
      )}
    </ApproveTokenSteps>
  );
};

export default SubmitSection;
