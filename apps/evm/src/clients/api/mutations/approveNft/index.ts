import type { ERC721 } from "libs/contracts";
import type { ContractTxData } from "types";

export interface ApproveNftInput {
  nftContract: ERC721;
  approvedAddress: string;
  tokenId: string;
}

type ContractsWithApprove = ERC721;

export type ApproveNftOutput = ContractTxData<ContractsWithApprove, "approve">;

const approveNft = ({
  nftContract,
  approvedAddress,
  tokenId,
}: ApproveNftInput): ApproveNftOutput => ({
  contract: nftContract,
  methodName: "approve",
  args: [approvedAddress, tokenId],
});

export default approveNft;
