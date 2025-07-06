import {
  ButtonWrapper,
  Delimiter,
  LabeledInlineContent,
  Spinner,
} from "../../../components";
import { useAccountAddress, useChainId } from "../../../libs/wallet";
import { VeUsdListItem } from "../VeUsdListItem";
import { Link } from "../../../containers/Link";
import { getToken, useGetToken } from "../../../libs/tokens";
import useConvertMantissaToReadableTokenString from "../../../hooks/useConvertMantissaToReadableTokenString";
import { useGetBalanceOf } from "../../../clients/api";

export interface VeUsdWrapProps {
  veUsdBalance: string;
}

export const VeUsdWrap: React.FC<VeUsdWrapProps> = ({ veUsdBalance }) => {
  const { accountAddress } = useAccountAddress();
  const { chainId } = useChainId();
  const scUSD = getToken({ chainId, symbol: "scUSD" });
  const veUSD = getToken({ chainId, symbol: "veUSD" });
  const enclabsVeUSD = getToken({ chainId, symbol: "Enclabs Trevee veUSD" });
  const stkscUSD = useGetToken({ symbol: "stkscUSD" });
  const { data: scUsdBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: scUSD,
  });
  const { data: stkscUSDBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: stkscUSD,
  });
  const { data: enclabsVeUsdBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: enclabsVeUSD,
  });
  const readableScUsdBalance = useConvertMantissaToReadableTokenString({
    value: scUsdBalance?.balanceMantissa,
    token: scUSD,
  });
  const readableStkscUSDBalance = useConvertMantissaToReadableTokenString({
    value: stkscUSDBalance?.balanceMantissa,
    token: stkscUSD,
  });
  const readableEnclabsVeUsdBalance = useConvertMantissaToReadableTokenString({
    value: enclabsVeUsdBalance?.balanceMantissa,
    token: enclabsVeUSD,
  });

  if (!scUsdBalance || !stkscUSDBalance) {
    return (
      <div className={"flex flex-grow justify-center py-4"}>
        <Spinner variant="small" />
      </div>
    );
  }

  const balanceAsNb = +veUsdBalance;
  const hasVeUSD = !!balanceAsNb;
  const emptyScUsdBalance = scUsdBalance.balanceMantissa.isZero();
  const emptyStkscUSDBalance = stkscUSDBalance.balanceMantissa.isZero();

  if (!hasVeUSD) {
    return (
      <>
        <LabeledInlineContent
          className="flex-1"
          label={"You don't have any VeUSD."}
          iconSrc={veUSD}
        >
          <></>
        </LabeledInlineContent>
        <Delimiter className={"mt-2"} />
        <LabeledInlineContent
          className="flex-1"
          label={readableScUsdBalance}
          iconSrc={scUSD}
        >
          <ButtonWrapper variant="tertiary" asChild>
            {emptyScUsdBalance ? (
              <Link to={"/swap-odos"}>Get some</Link>
            ) : (
              <Link href={"https://earn.trevee.xyz/earn/stake/stake/"}>
                Stake it
              </Link>
            )}
          </ButtonWrapper>
        </LabeledInlineContent>
        <LabeledInlineContent
          className="flex-1"
          label={readableStkscUSDBalance}
          iconSrc={stkscUSD}
        >
          <ButtonWrapper variant="tertiary" asChild>
            {emptyStkscUSDBalance ? (
              <Link href={"https://earn.trevee.xyz/earn/stake/stake/"}>
                Stake scUSD
              </Link>
            ) : (
              <Link href={"https://earn.trevee.xyz/vote/manage-lock/"}>
                Lock it
              </Link>
            )}
          </ButtonWrapper>
        </LabeledInlineContent>
        <Delimiter className={"mb-2"} />
        <LabeledInlineContent
          className="flex-1"
          label={readableEnclabsVeUsdBalance}
          iconSrc={enclabsVeUSD}
        >
          <></>
        </LabeledInlineContent>
      </>
    );
  }

  return Array.from({ length: balanceAsNb }, (_, i) => i).map((tokenIndex) => (
    <div className={"flex flex-col gap-y-4"}>
      <VeUsdListItem
        key={tokenIndex}
        tokenIndex={tokenIndex}
        accountAddress={`${accountAddress}`}
        chainId={chainId}
      />
    </div>
  ));
};
