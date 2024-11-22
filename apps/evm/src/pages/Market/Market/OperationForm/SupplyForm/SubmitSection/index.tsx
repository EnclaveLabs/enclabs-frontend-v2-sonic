/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';

import { ApproveTokenSteps, type ApproveTokenStepsProps, PrimaryButton } from 'components';
import { HIGH_PRICE_IMPACT_THRESHOLD_PERCENTAGE } from 'constants/swap';
import { useTranslation } from 'libs/translations';
import type { Swap, Token } from 'types';
import { cn } from 'utilities';

import SwapSummary from '../../SwapSummary';
import type { FormError } from '../../types';
import type { FormErrorCode } from '../useForm/types';
import { getTokenType } from 'components/Tag';
import { tokenTypeInfo} from 'constants/tokenType';

export interface SubmitSectionProps {
  isFormValid: boolean;
  isFormSubmitting: boolean;
  fromToken: Token;
  fromTokenAmountTokens: string;
  isSwapLoading: boolean;
  isFromTokenApproved: ApproveTokenStepsProps['isTokenApproved'];
  approveFromToken: ApproveTokenStepsProps['approveToken'];
  isApproveFromTokenLoading: ApproveTokenStepsProps['isApproveTokenLoading'];
  isFromTokenWalletSpendingLimitLoading: ApproveTokenStepsProps['isWalletSpendingLimitLoading'];
  isRevokeFromTokenWalletSpendingLimitLoading: boolean;
  swap?: Swap;
  formError?: FormError<FormErrorCode>;
  isUsingSwap: boolean;
  tokenAddress?: string;
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({
  isFormValid,
  isFormSubmitting,
  fromToken,
  isFromTokenApproved,
  approveFromToken,
  isApproveFromTokenLoading,
  isFromTokenWalletSpendingLimitLoading,
  isRevokeFromTokenWalletSpendingLimitLoading,
  swap,
  isSwapLoading,
  isUsingSwap,
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

    return t('operationForm.submitButtonLabel.supply');
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
        disabled={
          !isFormValid ||
          isFormSubmitting ||
          isSwapLoading ||
          isFromTokenWalletSpendingLimitLoading ||
          isRevokeFromTokenWalletSpendingLimitLoading ||
          !isFromTokenApproved
        }
        className={cn('w-full', `${tokenTypeInfos.buttonClassName}` , isSwappingWithHighPriceImpact && 'border-red bg-red')}
      >
        {submitButtonLabel}
      </PrimaryButton>

      {isFormValid && !isSwapLoading && !isFromTokenWalletSpendingLimitLoading && (
        <SwapSummary swap={swap} type="supply" />
      )}
    </ApproveTokenSteps>
  );
};

export default SubmitSection;
