import type BigNumber from "bignumber.js";

import { handleError } from "libs/errors";
import type { Token } from "types";
import type { FormErrorCode, FormValues } from "./types";
import useFormValidation from "./useFormValidation";
import { FormError } from "../../../../Market/Market/OperationForm/types";
import { convertMantissaToTokens } from "../../../../../utilities";

export * from "./types";

export interface UseFormInput {
  token: Token;
  limitTokensMantissa: BigNumber;
  onSubmit: (input: {
    fromToken: Token;
    fromTokenAmountTokens: string;
  }) => Promise<unknown>;
  formValues: FormValues;
  setFormValues: (
    setter: (currentFormValues: FormValues) => FormValues | FormValues
  ) => void;
  onSubmitSuccess?: () => void;
}

interface UseFormOutput {
  handleSubmit: (e?: React.SyntheticEvent) => Promise<void>;
  isFormValid: boolean;
  formError?: FormError<FormErrorCode>;
}

const useForm = ({
  token,
  limitTokensMantissa,
  onSubmitSuccess,
  formValues,
  setFormValues,
  onSubmit,
}: UseFormInput): UseFormOutput => {
  const { isFormValid, formError } = useFormValidation({
    limitTokensMantissa: convertMantissaToTokens({
      token,
      value: limitTokensMantissa,
    }),
    formValues,
  });

  const handleSubmit = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();

    if (!isFormValid) {
      return;
    }

    try {
      await onSubmit({
        fromTokenAmountTokens: formValues.amountTokens,
        fromToken: formValues.fromToken,
      });

      // Reset form and close modal on success only
      setFormValues(() => ({
        fromToken: token,
        amountTokens: "",
      }));
      onSubmitSuccess?.();
    } catch (error) {
      handleError({ error });
    }
  };

  return {
    handleSubmit,
    isFormValid,
    formError,
  };
};

export default useForm;
