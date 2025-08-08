import BigNumber from "bignumber.js";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useGetBalanceOf, useUnwrapVeNft } from "clients/api";
import {
  Delimiter,
  Icon,
  LabeledInlineContent,
  PrimaryButton,
  Spinner,
  TokenTextField,
  Tooltip,
} from "components";
import { VError } from "libs/errors";
import { useTranslation } from "libs/translations";
import { useAccountAddress } from "libs/wallet";
import type { Token, TreveeWraping } from "types";
import useForm, { type FormValues, type UseFormInput } from "./useForm";
import { useGetToken } from "../../../../libs/tokens";
import { convertMantissaToTokens } from "../../../../utilities";
import useTokenApproval from "../../../../hooks/useTokenApproval";
import convertTokensToMantissa from "../../../../utilities/convertTokensToMantissa";

export interface UnwrapFormUiProps {
  isUserConnected: boolean;
  enclabsStakedToken: Token;
  treveeWraping: TreveeWraping;
  onSubmit: UseFormInput["onSubmit"];
  isSubmitting: boolean;
  setFormValues: (
    setter: (currentFormValues: FormValues) => FormValues
  ) => void;
  formValues: FormValues;
  isApproved: boolean | undefined;
  enclabsStakedTokenBalance: BigNumber;
}

export const UnwrapFormUi: React.FC<UnwrapFormUiProps> = ({
  isUserConnected,
  enclabsStakedToken,
  treveeWraping,
  setFormValues,
  formValues,
  onSubmit,
  isSubmitting,
  isApproved,
  enclabsStakedTokenBalance,
}) => {
  const { t } = useTranslation();
  const { handleSubmit, isFormValid, formError } = useForm({
    token: enclabsStakedToken,
    limitTokensMantissa: enclabsStakedTokenBalance,
    onSubmit,
    formValues,
    setFormValues,
  });
  const treveeVeNft = useGetToken({ symbol: treveeWraping.treveeVeNftSymbol })!;
  const readableUnwrappableAmountLimitReadable = useMemo(
    () =>
      enclabsStakedTokenBalance &&
      convertMantissaToTokens({
        value: enclabsStakedTokenBalance,
        token: enclabsStakedToken,
      }),
    [enclabsStakedTokenBalance, enclabsStakedToken]
  );
  const handleRightMaxButtonClick = useCallback(() => {
    // Update field value to correspond to user's wallet balance
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      amountTokens: readableUnwrappableAmountLimitReadable.toString(),
    }));
  }, [enclabsStakedTokenBalance, setFormValues]);

  const isWednesday = new Date().getUTCDay() === 3; // 3 = mercredi

  if (!enclabsStakedToken) {
    return <></>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LabeledInlineContent
        label={`${readableUnwrappableAmountLimitReadable} ${treveeVeNft.symbol} available to be unwrapped`}
        tooltip={`You need to deposit your ${treveeWraping.enclabsStakedTokenSymbol} to unwrap your ${treveeWraping.treveeVeNftSymbol}.`}
        iconSrc={treveeVeNft}
      >
        <></>
      </LabeledInlineContent>
      <TokenTextField
        label={`${treveeWraping.enclabsStakedTokenSymbol} amount used to unwrap`}
        name="amountTokens"
        placeholder={`0 - ${readableUnwrappableAmountLimitReadable
          .toFixed(enclabsStakedToken.decimals)
          .replace(/^0+(\d)|(\d)0+$/gm, "$1$2")}`}
        token={enclabsStakedToken}
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

        <div className={"flex justify-center items-center"}>
          <PrimaryButton
            type="submit"
            loading={isSubmitting}
            className={"flex flex-grow"}
            disabled={
              !isFormValid || isSubmitting || (isApproved && isWednesday)
            }
          >
            {isApproved
              ? `Unwrap ${formValues.amountTokens} ${treveeWraping.treveeVeNftSymbol}`
              : `Approve ${formValues.amountTokens} ${treveeWraping.enclabsStakedTokenSymbol}`}
          </PrimaryButton>
          {isApproved && isWednesday && (
            <Tooltip
              className={"ml-2 flex-shrink"}
              title={`You cannot unwrap your ${treveeWraping.treveeVeNftSymbol} on Wednesday`}
            >
              <Icon className="cursor-help" name="info" size={"24"} />
            </Tooltip>
          )}
        </div>
      </>
    </form>
  );
};

export interface UnwrapFormProps {
  treveeWraping: TreveeWraping;
}

const UnwrapForm: React.FC<UnwrapFormProps> = ({ treveeWraping }) => {
  const { accountAddress } = useAccountAddress();
  const enclabsStakedToken = useGetToken({
    symbol: treveeWraping.enclabsStakedTokenSymbol,
  })!;
  const initialFormValues: FormValues = useMemo(
    () => ({
      amountTokens: "",
      fromToken: enclabsStakedToken,
    }),
    [enclabsStakedToken]
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
    token: enclabsStakedToken,
    spenderAddress: treveeWraping.manager.address,
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
      token: enclabsStakedToken,
    },
    {
      enabled: !!accountAddress,
    }
  );
  const vTokenBalanceMantissa = getTokenBalanceData?.balanceMantissa;

  const formTokenAmountMantissa = useMemo(() => {
    return convertTokensToMantissa({
      token: enclabsStakedToken,
      value: new BigNumber(formValues.amountTokens),
    });
  }, [formValues.amountTokens]);

  const { mutateAsync: unwrapVeNft, isPending: unwrapVeNftIsLoading } =
    useUnwrapVeNft(
      {
        treveeWraping,
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

  const { data: enclabsStakedTokenBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: enclabsStakedToken,
  });

  const onSubmit: UseFormInput["onSubmit"] = async ({
    fromToken,
    fromTokenAmountTokens,
  }) => {
    const withdrawFullSupply =
      enclabsStakedTokenBalance!.balanceMantissa.isEqualTo(
        fromTokenAmountTokens
      );

    // This case should never be reached, but just in case we throw a generic
    // internal error
    if (!enclabsStakedToken || (withdrawFullSupply && !vTokenBalanceMantissa)) {
      throw new VError({
        type: "unexpected",
        code: "somethingWentWrong",
      });
    }

    if (isApproved) {
      return unwrapVeNft({
        enclabsTreveeVeManager: treveeWraping.manager,
        amountMantissa: formTokenAmountMantissa,
      }).then(() => {
        setFormValues(() => ({
          fromToken: enclabsStakedToken,
          amountTokens: "",
        }));
      });
    } else {
      return approveFromToken(formTokenAmountMantissa.toString());
    }
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
      treveeWraping={treveeWraping}
      enclabsStakedToken={enclabsStakedToken}
      enclabsStakedTokenBalance={enclabsStakedTokenBalance!.balanceMantissa}
      formValues={formValues}
      setFormValues={setFormValues}
      onSubmit={onSubmit}
      isSubmitting={isApproveFromTokenLoading || unwrapVeNftIsLoading}
      isApproved={isApproved}
    />
  );
};

export default UnwrapForm;
