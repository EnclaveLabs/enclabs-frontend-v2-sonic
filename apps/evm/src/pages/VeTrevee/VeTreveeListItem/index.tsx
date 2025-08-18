import {
  useApproveNft,
  useDetachVeNft,
  useGetVeNftTokenAttached,
  useGetVeNftTokenLocked,
  useGetVeNftTokenVoted,
  useNftGetApproved,
  useResetVeNft,
  useWrapVeNft,
} from "../../../clients/api";
import { TreveeVeNFT, TreveeWraping } from "types";
import BigNumber from "bignumber.js";
import {
  Button,
  Delimiter,
  Icon,
  LabeledInlineContent,
  Spinner,
  TokenIcon,
  Tooltip,
} from "../../../components";
import { Card } from "@mui/material";
import formatToReadableDate from "../../../components/charts/ApyChart/formatToReadableDate";
import { useGetToken } from "../../../libs/tokens";
import useConvertMantissaToReadableTokenString from "../../../hooks/useConvertMantissaToReadableTokenString";
import Checked from "../../../components/Icon/icons/checked";
import Close from "../../../components/Icon/icons/close";
import { useGetVeNFT } from "../../../libs/venfts";
import { useMemo } from "react";

interface VeTreveeListItemInfoProps {
  veNftContract: TreveeVeNFT;
  tokenId: BigNumber;
  treveeWraping: TreveeWraping;
}

interface VeTreveeListItemProps {
  veNftContract: TreveeVeNFT;
  tokenId: BigNumber;
  treveeWraping: TreveeWraping;
}

interface VeTreveeListItemActionsProps {
  tokenId: BigNumber;
  isNftApprovedForManager: boolean;
  isVoted: boolean;
  isAttached: boolean;
  treveeWraping: TreveeWraping;
  veNftContract: TreveeVeNFT;
}

const VeTreveeListItemActions: React.FC<VeTreveeListItemActionsProps> = ({
  tokenId,
  isNftApprovedForManager,
  isVoted,
  isAttached,
  veNftContract,
  treveeWraping,
}) => {
  const needToBeReset = isVoted;
  const treveeVeNft = useGetVeNFT({ symbol: treveeWraping.treveeVeNftSymbol })!;
  const { mutateAsync: resetVeNft, isPending: isResetVeNftLoading } =
    useResetVeNft(
      { tokenId, veNftVoterContract: treveeWraping.voter },
      { waitForConfirmation: true }
    );
  const { mutateAsync: detachVeNft, isPending: isDetachVeNftLoading } =
    useDetachVeNft({ tokenId, veNftContract }, { waitForConfirmation: true });
  const { mutateAsync: wrapVeNft, isPending: wrapVeNftLoading } = useWrapVeNft(
    {
      tokenId: tokenId.toString(),
      treveeWraping,
    },
    { waitForConfirmation: true }
  );

  const {
    mutateAsync: approveTreveeVeNft,
    isPending: isApproveTreveeVeNftLoading,
  } = useApproveNft(
    { nft: treveeVeNft },
    {
      waitForConfirmation: true,
      /*onSuccess: () =>
          wrapVeNft({
            tokenId: tokenId.toString(),
            enclabsTreveeVeManager: treveeWraping.manager,
          }),*/
    }
  );

  const actionText = useMemo(() => {
    if (needToBeReset) {
      return "Reset";
    } else if (isAttached) {
      return "Detach";
    } else if (!isNftApprovedForManager) {
      return "Approve";
    } else {
      return "Wrap";
    }
  }, [needToBeReset, isAttached, isNftApprovedForManager]);

  const action = () => {
    if (needToBeReset) {
      return resetVeNft({ tokenId: tokenId.toString() });
    } else if (isAttached) {
      return detachVeNft({ tokenId: tokenId.toString() });
    } else if (!isNftApprovedForManager) {
      return approveTreveeVeNft({
        approvedAddress: treveeWraping.manager.address || "",
        tokenId: tokenId.toString(),
      });
    } else {
      return wrapVeNft({
        tokenId: tokenId.toString(),
        enclabsTreveeVeManager: treveeWraping.manager,
      });
    }
  };

  const needAction = needToBeReset || isAttached || !isNftApprovedForManager;
  const isLoading =
    isResetVeNftLoading || isDetachVeNftLoading || isApproveTreveeVeNftLoading;

  return (
    <div className={"flex mt-4 gap-x-4"}>
      {needAction ? (
        <div className={"flex items-center flex-grow"}>
          <Button
            variant="secondary"
            loading={isLoading}
            className="h-auto flex flex-grow"
            onClick={() => action()}
          >
            {actionText}
          </Button>
          <Tooltip
            className={"ml-2 flex-shrink"}
            title={`If your ${treveeWraping.treveeVeNftSymbol} has been used to vote, you need to reset/detach it first before wrapping it.`}
          >
            <Icon className="cursor-help" name="info" size={"24"} />
          </Tooltip>
        </div>
      ) : (
        <Button
          className="h-auto flex flex-grow"
          loading={wrapVeNftLoading}
          onClick={() =>
            wrapVeNft({
              tokenId: tokenId.toString(),
              enclabsTreveeVeManager: treveeWraping.manager,
            })
          }
        >
          Wrap
        </Button>
      )}
    </div>
  );
};

export const VeTreveeListItemInfos: React.FC<VeTreveeListItemInfoProps> = ({
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
  const { data: VeNftIsAttached } = useGetVeNftTokenAttached({
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

  if (!VeNftLockedData || !veNftApproval || !tokenId) return <Spinner />;

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
          label={"Attached"}
          iconSrc={"copy"}
        >
          {!!VeNftIsAttached?.isAttached ? (
            <Checked height={16} width={16} />
          ) : (
            <Close height={16} width={16} />
          )}
          <Tooltip
            className={"ml-1"}
            title={`If your ${treveeVeNft.symbol} is attached, you need to detach it before wrapping it.`}
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

      <LabeledInlineContent className="flex-1" label={"You will receive"}>
        <p className={"font-bold"}>{amountReceived}</p>
        <TokenIcon
          token={enclabsStakedToken!}
          className="-mt-[2px] ml-2 h-6 w-6"
        />
      </LabeledInlineContent>

      <VeTreveeListItemActions
        treveeWraping={treveeWraping}
        veNftContract={veNftContract}
        tokenId={tokenId}
        isNftApprovedForManager={isNftApprovedForManager}
        isVoted={!!VeNftIsVoted?.isVoted}
        isAttached={!!VeNftIsAttached?.isAttached}
      />
    </Card>
  ) : (
    <></>
  );
};
