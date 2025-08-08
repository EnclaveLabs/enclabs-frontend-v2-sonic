import {
  ButtonWrapper,
  Delimiter,
  LabeledInlineContent,
  Spinner,
} from "../../../components";
import { useAccountAddress, useChainId } from "../../../libs/wallet";
import { VeTreveeListItemInfos } from "../VeTreveeListItem";
import { Link } from "../../../containers/Link";
import { useGetToken } from "../../../libs/tokens";
import useConvertMantissaToReadableTokenString from "../../../hooks/useConvertMantissaToReadableTokenString";
import {
  useGetBalanceOf,
  useGetVeNftTokenIdsOfUser,
} from "../../../clients/api";
import { TreveeVeNFT, TreveeWraping } from "../../../types";
import { useGetVeNFT } from "../../../libs/venfts";
import {
  useGetTreveeVeETHContract,
  useGetTreveeVeUSDContract,
} from "../../../libs/contracts";
import BigNumber from "bignumber.js";

export interface VeTreveeWrapProps {
  treveeWraping: TreveeWraping;
}

export const VeTreveeWrap: React.FC<VeTreveeWrapProps> = ({
  treveeWraping,
}) => {
  const { accountAddress } = useAccountAddress();
  const { chainId } = useChainId();
  const treeveToken = useGetToken({
    symbol: treveeWraping.treeveTokenSymbol,
  })!;
  const treveeVeNft = useGetVeNFT({ symbol: treveeWraping.treveeVeNftSymbol })!;

  const enclabsStakedToken = useGetToken({
    symbol: treveeWraping.enclabsStakedTokenSymbol,
  })!;
  const treveeStakedToken = useGetToken({
    symbol: treveeWraping.treveeStakedTokenSymbol,
  })!;

  const { data: treeveTokenBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: treeveToken,
  })!;
  const treveeVeETH = useGetTreveeVeETHContract()!;
  const treveeVeUSD = useGetTreveeVeUSDContract()!;
  const veNftContract: TreveeVeNFT =
    treveeWraping.treveeVeNftSymbol === "veUSD" ? treveeVeUSD : treveeVeETH;
  const { data: treveeTokenIds } = useGetVeNftTokenIdsOfUser({
    accountAddress: `${accountAddress}`,
    veNftContract: veNftContract,
  })!;
  const { data: treveeStakedTokenBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: treveeStakedToken,
  })!;
  const { data: enclabsStakedTokenBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: enclabsStakedToken,
  })!;
  const readableTreeveTokenBalance = useConvertMantissaToReadableTokenString({
    value: treeveTokenBalance?.balanceMantissa,
    token: treeveToken,
  });
  const readableTreveeStakedTokenBalance =
    useConvertMantissaToReadableTokenString({
      value: treveeStakedTokenBalance?.balanceMantissa,
      token: treveeStakedToken,
    });
  const readableEnclabsStakedTokenBalance =
    useConvertMantissaToReadableTokenString({
      value: enclabsStakedTokenBalance?.balanceMantissa,
      token: enclabsStakedToken,
    });

  if (
    !treeveTokenBalance ||
    !treveeTokenIds ||
    !treveeStakedTokenBalance ||
    !enclabsStakedTokenBalance
  ) {
    return (
      <div className={"flex flex-grow justify-center py-4"}>
        <Spinner variant="small" />
      </div>
    );
  }

  const emptyTreveeTokenBalance = treeveTokenBalance.balanceMantissa.isZero();
  const emptyTreveeStakedTokenBalance =
    treveeStakedTokenBalance.balanceMantissa.isZero();

  if (treveeTokenIds.tokenIds.length === 0) {
    return (
      <>
        <LabeledInlineContent
          className="flex-1"
          label={`You don't have any ${treveeWraping.treveeVeNftSymbol}.`}
        >
          <></>
        </LabeledInlineContent>
        <Delimiter className={"mt-2"} />
        <LabeledInlineContent
          className="flex-1"
          label={readableTreeveTokenBalance}
          iconSrc={treeveToken}
        >
          <ButtonWrapper variant="tertiary" asChild>
            {emptyTreveeTokenBalance ? (
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
          label={readableTreveeStakedTokenBalance}
          iconSrc={treveeStakedToken}
        >
          <ButtonWrapper variant="tertiary" asChild>
            {emptyTreveeStakedTokenBalance ? (
              <Link href={"https://earn.trevee.xyz/earn/stake/stake/"}>
                Stake {treeveToken.symbol}
              </Link>
            ) : (
              <Link href={"https://earn.trevee.xyz/vote/manage-lock/"}>
                Lock it to get {treveeVeNft.symbol}
              </Link>
            )}
          </ButtonWrapper>
        </LabeledInlineContent>
        <Delimiter className={"mb-2"} />
        <LabeledInlineContent
          className="flex-1"
          label={readableEnclabsStakedTokenBalance}
          iconSrc={enclabsStakedToken}
        >
          <></>
        </LabeledInlineContent>
      </>
    );
  }

  return (
    <div className={"flex flex-col gap-y-4"}>
      {treveeTokenIds.tokenIds.map((tokenId) => (
        <VeTreveeListItemInfos
          key={tokenId.toString()}
          veNftContract={veNftContract}
          treveeWraping={treveeWraping}
          tokenId={new BigNumber(tokenId.toString())}
        />
      ))}
    </div>
  );
};
