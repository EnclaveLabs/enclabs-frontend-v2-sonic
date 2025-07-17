import BigNumber from "bignumber.js";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useGetBalanceOf, useUnwrapVeNft } from "clients/api";
import {
  Delimiter,
  LabeledInlineContent,
  PrimaryButton,
  Spinner,
  TokenTextField,
} from "components";
import useFormatTokensToReadableValue from "hooks/useFormatTokensToReadableValue";
import { VError } from "libs/errors";
import { useTranslation } from "libs/translations";
import { useAccountAddress, useChainId } from "libs/wallet";
import type { Token } from "types";
import useForm, { type FormValues, type UseFormInput } from "./useForm";
import { getToken } from "../../../../libs/tokens";
import { convertMantissaToTokens } from "../../../../utilities";
import useTokenApproval from "../../../../hooks/useTokenApproval";
import convertTokensToMantissa from "../../../../utilities/convertTokensToMantissa";
import { EnclabsTreveeVeManager } from "../../../../libs/contracts";

export interface UnwrapFormUiProps {
  isUserConnected: boolean;
  tokenUsedToUnwrap: Token;
  onSubmit: UseFormInput["onSubmit"];
  isSubmitting: boolean;
  setFormValues: (
    setter: (currentFormValues: FormValues) => FormValues
  ) => void;
  formValues: FormValues;
  isApproved: boolean | undefined;
  onSubmitSuccess?: () => void;
  limitTokensMantissa: BigNumber;
}

export const UnwrapFormUi: React.FC<UnwrapFormUiProps> = ({
  isUserConnected,
  onSubmitSuccess,
  tokenUsedToUnwrap,
  setFormValues,
  formValues,
  onSubmit,
  isSubmitting,
  isApproved,
  limitTokensMantissa,
}) => {
  const { t } = useTranslation();
  const { handleSubmit, isFormValid, formError } = useForm({
    token: tokenUsedToUnwrap,
    limitTokensMantissa,
    onSubmitSuccess,
    onSubmit,
    formValues,
    setFormValues,
  });
  const { chainId } = useChainId();
  const veUSD = getToken({ chainId, symbol: "veUSD" });
  const readableUnwrappableAmountLimitReadable = useMemo(
    () =>
      limitTokensMantissa &&
      convertMantissaToTokens({
        value: limitTokensMantissa,
        token: tokenUsedToUnwrap,
      }),
    [limitTokensMantissa, tokenUsedToUnwrap]
  );
  const handleRightMaxButtonClick = useCallback(() => {
    // Update field value to correspond to user's wallet balance
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      amountTokens: readableUnwrappableAmountLimitReadable.toString(),
    }));
  }, [limitTokensMantissa, setFormValues]);

  const readableUnwrappableAmountTokens = useFormatTokensToReadableValue({
    value: limitTokensMantissa,
    token: formValues.fromToken,
  });

  if (!tokenUsedToUnwrap) {
    return <></>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LabeledInlineContent
        label={`${readableUnwrappableAmountLimitReadable} veUSD available to be unwrapped`}
        tooltip={
          "You need to deposit your Enclabs Trevee veUSD to unwrap your Trevee veUSD."
        }
        iconSrc={veUSD}
      >
        <></>
      </LabeledInlineContent>
      <TokenTextField
        label={"Enclabs veUSD amount used to unwrap"}
        name="amountTokens"
        placeholder={`0.00 - ${readableUnwrappableAmountLimitReadable.toFixed(
          2
        )}`}
        token={tokenUsedToUnwrap}
        value={formValues.amountTokens}
        onChange={(amountTokens) =>
          setFormValues((currentFormValues) => ({
            ...currentFormValues,
            amountTokens,
          }))
        }
        disabled={!isUserConnected || isSubmitting}
        rightMaxButton={{
          label: t("operationForm.rightMaxButtonLabel"),
          onClick: handleRightMaxButtonClick,
        }}
        hasError={
          isUserConnected &&
          !isSubmitting &&
          !!formError &&
          Number(formValues.amountTokens) > 0
        }
        description={
          isUserConnected && !isSubmitting && !!formError?.message ? (
            <p className="text-red">{formError.message}</p>
          ) : undefined
        }
      />
      <>
        {/*<LabeledInlineContent label={t("operationForm.UnwrapableAmount")}>
            {readableUnwrapableAmountTokens}
            <Tooltip
              className="ml-2 inline-flex items-center"
              title={limitTokens.toString()}
            >
              <Icon className="cursor-help" name="info" />
            </Tooltip>
          </LabeledInlineContent>*/}

        <Delimiter />

        <PrimaryButton
          type="submit"
          loading={isSubmitting}
          className={"w-full"}
          disabled={!isFormValid || isSubmitting}
        >
          {isApproved
            ? `Unwrap ${formValues.amountTokens} veUSD`
            : `Approve ${formValues.amountTokens} Enclabs veUSD`}
        </PrimaryButton>
      </>
    </form>
  );
};

export interface UnwrapFormProps {
  tokenUsedToUnwrap: Token;
  limitTokensMantissa: BigNumber;
  onSubmitSuccess?: () => void;
  enclabsVeManagerContract: EnclabsTreveeVeManager;
}

const UnwrapForm: React.FC<UnwrapFormProps> = ({
  tokenUsedToUnwrap,
  limitTokensMantissa,
  onSubmitSuccess,
  enclabsVeManagerContract,
}) => {
  const { accountAddress } = useAccountAddress();
  const initialFormValues: FormValues = useMemo(
    () => ({
      amountTokens: "",
      fromToken: tokenUsedToUnwrap,
    }),
    [tokenUsedToUnwrap]
  );

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const {
    approveToken: approveFromToken,
    isApproveTokenLoading: isApproveFromTokenLoading,
    isWalletSpendingLimitLoading: isFromTokenWalletSpendingLimitLoading,
    walletSpendingLimitTokens: fromTokenWalletSpendingLimitTokens,
    revokeWalletSpendingLimit: revokeFromTokenWalletSpendingLimit,
    isRevokeWalletSpendingLimitLoading:
      isRevokeFromTokenWalletSpendingLimitLoading,
  } = useTokenApproval({
    token: tokenUsedToUnwrap,
    spenderAddress: enclabsVeManagerContract.address,
    accountAddress,
  });
  // Reset form when user disconnects their wallet
  useEffect(() => {
    if (!accountAddress) {
      setFormValues(initialFormValues);
    }
  }, [accountAddress, initialFormValues]);

  const { data: getTokenBalanceData } = useGetBalanceOf(
    {
      accountAddress: accountAddress || "",
      token: tokenUsedToUnwrap,
    },
    {
      enabled: !!accountAddress,
    }
  );
  const vTokenBalanceMantissa = getTokenBalanceData?.balanceMantissa;

  const formTokenAmountMantissa = useMemo(() => {
    return convertTokensToMantissa({
      token: tokenUsedToUnwrap,
      value: new BigNumber(formValues.amountTokens),
    });
  }, [formValues.amountTokens]);

  const { mutateAsync: unwrapVeNft, isPending: unwrapVeNftIsLoading } =
    useUnwrapVeNft(
      {
        amountMantissa: formTokenAmountMantissa,
      },
      {
        waitForConfirmation: true,
      }
    );
  {
    /*const { mutateAsync: withdraw, isPending: isWithdrawLoading } = useWithdraw({
    poolName: pool.name,
    poolComptrollerAddress: pool.comptrollerAddress,
    vToken: asset.vToken,
  });*/
  }

  const onSubmit: UseFormInput["onSubmit"] = async ({
    fromToken,
    fromTokenAmountTokens,
  }) => {
    const withdrawFullSupply = limitTokensMantissa.isEqualTo(
      fromTokenAmountTokens
    );

    // This case should never be reached, but just in case we throw a generic
    // internal error
    if (!tokenUsedToUnwrap || (withdrawFullSupply && !vTokenBalanceMantissa)) {
      throw new VError({
        type: "unexpected",
        code: "somethingWentWrong",
      });
    }

    if (isApproved) {
      console.log(">>>", formTokenAmountMantissa.toFixed());
      return unwrapVeNft({
        amountMantissa: formTokenAmountMantissa,
      }).then(() => {
        setFormValues(() => ({
          fromToken: tokenUsedToUnwrap,
          amountTokens: "",
        }));
      });
    } else {
      return approveFromToken(formTokenAmountMantissa.toString());
    }

    /*{return approveToken({
      withdrawFullSupply,
      unwrap: formValues.receiveNativeToken,
      amountMantissa: withdrawFullSupply
        ? vTokenBalanceMantissa!
        : convertTokensToMantissa({
            value: new BigNumber(fromTokenAmountTokens),
            token: fromToken,
          }),
    });*/
  };

  const pageLoading = isFromTokenWalletSpendingLimitLoading;

  const isApproved = useMemo(() => {
    if (!fromTokenWalletSpendingLimitTokens) return false;
    return (
      formValues.amountTokens <= fromTokenWalletSpendingLimitTokens.toString()
    );
  }, [formTokenAmountMantissa, fromTokenWalletSpendingLimitTokens]);

  return pageLoading ? (
    <Spinner />
  ) : (
    <UnwrapFormUi
      isUserConnected={!!accountAddress}
      onSubmitSuccess={onSubmitSuccess}
      tokenUsedToUnwrap={tokenUsedToUnwrap}
      limitTokensMantissa={limitTokensMantissa}
      formValues={formValues}
      setFormValues={setFormValues}
      onSubmit={onSubmit}
      isSubmitting={isApproveFromTokenLoading || unwrapVeNftIsLoading}
      isApproved={isApproved}
    />
  );
};

export default UnwrapForm;
