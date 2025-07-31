import {
  useApproveNft,
  useGetVeNftTokenOfOwnerByIndex,
  useGetVeNftTokenVoted,
  useNftGetApproved,
  useResetVeNft,
  useWrapVeNft,
} from "../../../clients/api";
import { ChainId, TreveeVeNFT, TreveeWraping } from "types";
import useGetVeNftTokenLocked from "../../../clients/api/queries/getVeNftTokenLocked/useGetVeNftTokenLocked";
import BigNumber from "bignumber.js";
import {
  Button,
  Delimiter,
  Icon,
  LabeledInlineContent,
  Spinner,
  Tooltip,
} from "../../../components";
import { Card } from "@mui/material";
import formatToReadableDate from "../../../components/charts/ApyChart/formatToReadableDate";
import { useGetToken } from "../../../libs/tokens";
import useConvertMantissaToReadableTokenString from "../../../hooks/useConvertMantissaToReadableTokenString";
import Checked from "../../../components/Icon/icons/checked";
import Close from "../../../components/Icon/icons/close";
import { useGetVeNFT } from "../../../libs/venfts";
import {
  useGetTreveeVeETHContract,
  useGetTreveeVeUSDContract,
} from "../../../libs/contracts";

interface VeTreveeListItemInfoProps {
  veNftContract: TreveeVeNFT;
  tokenId: BigNumber;
  treveeWraping: TreveeWraping;
}

interface VeTreveeListItemProps {
  tokenIndex: number;
  accountAddress: string;
  chainId: ChainId;
  treveeWraping: TreveeWraping;
}

interface VeTreveeListItemActionsProps {
  tokenId: BigNumber;
  isNftApprovedForManager: boolean;
  isVoted: boolean;
  treveeWraping: TreveeWraping;
}

const VeTreveeListItemActions: React.FC<VeTreveeListItemActionsProps> = ({
  tokenId,
  isNftApprovedForManager,
  isVoted,
  treveeWraping,
}) => {
  const needToBeReset = isVoted;
  const actionText = isNftApprovedForManager ? "Wrap" : "Approve and wrap";
  const treveeVeNft = useGetVeNFT({ symbol: treveeWraping.treveeVeNftSymbol })!;
  const { mutateAsync: resetVeNft, isPending: isResetVeNftLoading } =
    useResetVeNft({ tokenId });
  const { mutateAsync: wrapVeNft, isPending: wrapVeNftLoading } = useWrapVeNft(
    {
      tokenId: tokenId.toString(),
      treveeWraping,
    },
    { waitForConfirmation: true }
  );

  const { mutateAsync: approveTreveeVeNft, isPending: isApproveTreveeVeNft } =
    useApproveNft(
      { nft: treveeVeNft },
      {
        waitForConfirmation: true,
        onSuccess: () =>
          wrapVeNft({
            tokenId: tokenId.toString(),
            enclabsTreveeVeManager: treveeWraping.manager,
          }),
      }
    );

  return (
    <div className={"flex mt-4 gap-x-4"}>
      {needToBeReset ? (
        <div className={"flex items-center flex-grow"}>
          <Button
            variant="secondary"
            loading={isResetVeNftLoading}
            className="h-auto flex flex-grow"
            onClick={() => resetVeNft({ tokenId: tokenId.toString() })}
          >
            Reset
          </Button>
          <Tooltip
            className={"ml-2 flex-shrink"}
            title={`If your ${treveeWraping.treveeVeNftSymbol} has been used to vote, you need to reset it first before wrapping it.`}
          >
            <Icon className="cursor-help" name="info" size={"24"} />
          </Tooltip>
        </div>
      ) : (
        <Button
          className="h-auto flex flex-grow"
          loading={
            isNftApprovedForManager ? wrapVeNftLoading : isApproveTreveeVeNft
          }
          onClick={() =>
            isNftApprovedForManager
              ? wrapVeNft({
                  tokenId: tokenId.toString(),
                  enclabsTreveeVeManager: treveeWraping.manager,
                })
              : approveTreveeVeNft({
                  approvedAddress: treveeWraping.manager.address || "",
                  tokenId: tokenId.toString(),
                })
          }
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

const VeTreveeListItemInfos: React.FC<VeTreveeListItemInfoProps> = ({
  veNftContract,
  tokenId,
  treveeWraping,
}) => {
  const { data: VeNftLockedData } = useGetVeNftTokenLocked({
    veNftContract,
    tokenId,
  });
  const { data: VeNftIsVoted } = useGetVeNftTokenVoted({
    veNftContract,
    tokenId,
  });

  const readableTokenId = tokenId.toNumber();
  const treeveToken = useGetToken({ symbol: treveeWraping.treeveTokenSymbol })!;
  const treveeVeNft = useGetVeNFT({ symbol: treveeWraping.treveeVeNftSymbol })!;
  const enclabsStakedToken = useGetToken({
    symbol: treveeWraping.enclabsStakedTokenSymbol,
  });
  const endDate = VeNftLockedData
    ? formatToReadableDate(VeNftLockedData.end.toNumber() * 1000, "month")
    : "-";
  const readableLockedAmount = useConvertMantissaToReadableTokenString({
    value: VeNftLockedData?.amount,
    token: treeveToken,
  });
  const amountReceived = useConvertMantissaToReadableTokenString({
    value: VeNftLockedData?.amount,
    token: enclabsStakedToken,
  });
  const { data: veNftApproval } = useNftGetApproved({
    tokenId: tokenId.toString(),
    nft: treveeVeNft,
  });

  if (!VeNftLockedData || !veNftApproval) return <Spinner />;

  const isNftApprovedForManager =
    veNftApproval.approvedAddress.toLowerCase() ===
    treveeWraping.manager.address.toLowerCase();

  return VeNftLockedData ? (
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
          iconSrc={treeveToken}
        >
          {readableLockedAmount}
        </LabeledInlineContent>
        <LabeledInlineContent
          className="flex-1"
          label={"Voted"}
          iconSrc={"document"}
        >
          {!!VeNftIsVoted?.isVoted ? (
            <Checked height={16} width={16} />
          ) : (
            <Close height={16} width={16} />
          )}
          <Tooltip
            className={"ml-1"}
            title={`If your ${treveeVeNft.symbol} has been used to vote, you need to reset it before wrapping it.`}
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
            title={`You need to approve your ${treveeVeNft.symbol} for Enclabs to be able to wrap it.`}
          >
            <Icon className="cursor-help" name="info" />
          </Tooltip>
        </LabeledInlineContent>
      </div>

      <Delimiter className={"mb-2"} />

      <LabeledInlineContent
        className="flex-1"
        label={"Received"}
        iconSrc={enclabsStakedToken}
      >
        <p className={"text-green"}>{amountReceived}</p>
      </LabeledInlineContent>

      <VeTreveeListItemActions
        treveeWraping={treveeWraping}
        tokenId={tokenId}
        isNftApprovedForManager={isNftApprovedForManager}
        isVoted={!!VeNftIsVoted?.isVoted}
      />
    </Card>
  ) : (
    <></>
  );
};

export const VeTreveeListItem: React.FC<VeTreveeListItemProps> = ({
  accountAddress,
  tokenIndex,
  chainId,
  treveeWraping,
}) => {
  const treveeVeETH = useGetTreveeVeETHContract()!;
  const treveeVeUSD = useGetTreveeVeUSDContract()!;
  const veNftContract =
    treveeWraping.treveeVeNftSymbol === "veUSD" ? treveeVeUSD : treveeVeETH;
  const { data: VeNftData, isLoading: VeUsdDataLoading } =
    useGetVeNftTokenOfOwnerByIndex({
      veNftContract,
      accountAddress,
      tokenIndex,
      chainId,
    });

  return VeNftData ? (
    <VeTreveeListItemInfos
      veNftContract={veNftContract}
      treveeWraping={treveeWraping}
      tokenId={VeNftData.tokenId}
    />
  ) : (
    <></>
  );
};
