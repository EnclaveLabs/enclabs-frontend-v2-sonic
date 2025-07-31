import BigNumber from "bignumber.js";
import { useMemo } from "react";

import { useTranslation } from "libs/translations";
import type { FormErrorCode, FormValues } from "./types";
import { FormError } from "../../../../Market/Market/OperationForm/types";

interface UseFormValidationInput {
  limitTokensMantissa: BigNumber;
  formValues: FormValues;
}

interface UseFormValidationOutput {
  isFormValid: boolean;
  formError?: FormError<FormErrorCode>;
}

const useFormValidation = ({
  limitTokensMantissa,
  formValues,
}: UseFormValidationInput): UseFormValidationOutput => {
  const { t } = useTranslation();

  const formError = useMemo<FormError<FormErrorCode> | undefined>(() => {
    const fromTokenAmountTokens = formValues.amountTokens
      ? new BigNumber(formValues.amountTokens)
      : undefined;

    if (
      !fromTokenAmountTokens ||
      fromTokenAmountTokens.isLessThanOrEqualTo(0)
    ) {
      return {
        code: "EMPTY_TOKEN_AMOUNT",
      };
    }

    if (fromTokenAmountTokens.isGreaterThan(limitTokensMantissa)) {
      return {
        code: "HIGHER_THAN_UNWRAPPABLE_AMOUNT",
        message: t("operationForm.error.higherThanUnwrappableAmount"),
      };
    }
  }, [limitTokensMantissa, formValues.amountTokens, t]);

  return {
    isFormValid: !formError,
    formError,
  };
};

export default useFormValidation;
