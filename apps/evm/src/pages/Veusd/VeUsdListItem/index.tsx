import {
  useGetVeUsdTokenOfOwnerByIndex,
  useGetVeUsdTokenVoted,
  useNftGetApproved,
} from "../../../clients/api";
import { ChainId } from "types";
import useGetVeUsdTokenLocked from "../../../clients/api/queries/getVeUsdTokenLocked/useGetVeUsdTokenLocked";
import BigNumber from "bignumber.js";
import {
  Button,
  Delimiter,
  Icon,
  LabeledInlineContent,
  Tooltip,
} from "../../../components";
import { Card } from "@mui/material";
import formatToReadableDate from "../../../components/charts/ApyChart/formatToReadableDate";
import { getToken } from "../../../libs/tokens";
import useConvertMantissaToReadableTokenString from "../../../hooks/useConvertMantissaToReadableTokenString";
import Checked from "../../../components/Icon/icons/checked";
import Close from "../../../components/Icon/icons/close";
import { useGetEnclabsTreveeVeManagerContractAddress } from "../../../libs/contracts";

interface VeUsdListItemInfoProps {
  tokenId: BigNumber;
  chainId: ChainId;
}

interface VeUsdListItemProps {
  tokenIndex: number;
  accountAddress: string;
  chainId: ChainId;
}

interface VeUsdListItemActionsProps {
  isNftApprovedForManager: boolean;
  isVoted: boolean;
}

const VeUsdListItemActions: React.FC<VeUsdListItemActionsProps> = ({
  isNftApprovedForManager,
  isVoted,
}) => {
  const needToBeReset = isVoted;
  const actionText = isNftApprovedForManager ? "Wrap" : "Approve and wrap";

  return (
    <div className={"flex mt-4 gap-x-4"}>
      {needToBeReset ? (
        <Button
          variant="secondary"
          className="h-auto flex flex-grow"
          onClick={() => {}}
        >
          Reset
        </Button>
      ) : (
        <Button className="h-auto flex flex-grow" onClick={() => {}}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

const VeUsdListItemInfos: React.FC<VeUsdListItemInfoProps> = ({
  tokenId,
  chainId,
}) => {
  const { data: VeUsdLockedData, isLoading: VeUsdLockedLoading } =
    useGetVeUsdTokenLocked({
      tokenId,
    });
  const { data: VeUsdIsVoted, isLoading: VeUsdIsVotedLoading } =
    useGetVeUsdTokenVoted({
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
  const { data: approvedAddress } = useNftGetApproved({
    tokenId,
    nft: scUSD,
  });
  const enclabsVeManagerAddress = useGetEnclabsTreveeVeManagerContractAddress();

  if (!VeUsdLockedData) return <></>;

  const isNftApprovedForManager = approvedAddress === enclabsVeManagerAddress;

  return VeUsdLockedData ? (
    <Card className={"max-w-[500px] border-lightGrey border rounded-sm"}>
      <h4 className="font-semibold">#{readableTokenId}</h4>
      <div className="my-2 space-y-1">
        <LabeledInlineContent
          className="flex-1"
          label={"Locked end date"}
          iconSrc={"countdown"}
        >
          {endDate}
        </LabeledInlineContent>
        <LabeledInlineContent
          className="flex-1"
          label={"Amount locked"}
          iconSrc={scUSD}
        >
          {readableLockedAmount}
        </LabeledInlineContent>
        <LabeledInlineContent
          className="flex-1"
          label={"Voted"}
          iconSrc={"document"}
        >
          {!!VeUsdIsVoted?.isVoted ? (
            <Checked height={16} width={16} />
          ) : (
            <Close height={16} width={16} />
          )}
          <Tooltip
            className={"ml-1"}
            title={
              "If your VeUSD has been used to vote, you need to reset it before wrapping it."
            }
          >
            <Icon className="cursor-help" name="info" />
          </Tooltip>
        </LabeledInlineContent>
        <LabeledInlineContent
          className="flex-1"
          label={"Enclabs approval"}
          iconSrc={"vote"}
        >
          {isNftApprovedForManager ? (
            <Checked height={16} width={16} />
          ) : (
            <Close height={16} width={16} />
          )}
          <Tooltip
            className={"ml-1"}
            title={
              "You need to approve your VeUSD for Enclabs to be able to wrap it."
            }
          >
            <Icon className="cursor-help" name="info" />
          </Tooltip>
        </LabeledInlineContent>
      </div>

      <Delimiter />

      <VeUsdListItemActions />
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
