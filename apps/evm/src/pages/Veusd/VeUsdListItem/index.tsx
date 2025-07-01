import { useGetVeUsdTokenOfOwnerByIndex } from "../../../clients/api";
import { ChainId } from "types";
import useGetVeUsdTokenLocked from "../../../clients/api/queries/getVeUsdTokenLocked/useGetVeUsdTokenLocked";
import BigNumber from "bignumber.js";
import { Delimiter, LabeledInlineContent } from "../../../components";
import { Card } from "@mui/material";
import formatToReadableDate from "../../../components/charts/ApyChart/formatToReadableDate";
import { getToken } from "../../../libs/tokens";
import useConvertMantissaToReadableTokenString from "../../../hooks/useConvertMantissaToReadableTokenString";

interface VeUsdListItemInfoProps {
  tokenId: BigNumber;
  chainId: ChainId;
}

interface VeUsdListItemProps {
  tokenIndex: number;
  accountAddress: string;
  chainId: ChainId;
}

const VeUsdListItemInfos: React.FC<VeUsdListItemInfoProps> = ({
  tokenId,
  chainId,
}) => {
  const { data: VeUsdLockedData, isLoading: VeUsdLockedLoading } =
    useGetVeUsdTokenLocked({
      tokenId,
    });

  const readableTokenId = tokenId.toNumber();
  const scUSD = getToken({ chainId, symbol: "scUSD" });

  const endDate = VeUsdLockedData
    ? formatToReadableDate(VeUsdLockedData.end.toNumber() * 1000, "month")
    : "-";
  const readableLockedAmount = useConvertMantissaToReadableTokenString({
    value: VeUsdLockedData?.amount,
    token: scUSD,
  });

  if (!VeUsdLockedData) return <></>;

  return VeUsdLockedData ? (
    <Card>
      <h4 className="font-semibold">#{readableTokenId}</h4>
      <div className="my-2 space-y-1">
        <LabeledInlineContent className="flex-1" label={"Locked end date"}>
          {endDate}
        </LabeledInlineContent>
        <LabeledInlineContent
          className="flex-1"
          label={"Amount locked"}
          iconSrc={scUSD}
        >
          {readableLockedAmount}
        </LabeledInlineContent>
      </div>

      <Delimiter />
    </Card>
  ) : (
    <></>
  );
};

export const VeUsdListItem: React.FC<VeUsdListItemProps> = ({
  accountAddress,
  tokenIndex,
  chainId,
}) => {
  const { data: VeUsdData, isLoading: VeUsdDataLoading } =
    useGetVeUsdTokenOfOwnerByIndex({
      accountAddress,
      tokenIndex,
      chainId,
    });

  return VeUsdData ? (
    <VeUsdListItemInfos chainId={chainId} tokenId={VeUsdData.tokenId} />
  ) : (
    <></>
  );
};
