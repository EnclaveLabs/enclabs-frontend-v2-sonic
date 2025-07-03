import { useMemo } from "react";

import { useProvider, useSigner } from "libs/wallet";
import type { NFT } from "types";
import { getNFTContract } from "../../utilities/getNFTContract";

export interface UseGetNftContractInput {
  nft: NFT;
  passSigner?: boolean;
}

export const useGetNftContract = ({
  nft,
  passSigner = false,
}: UseGetNftContractInput) => {
  const { provider } = useProvider();
  const { signer } = useSigner();
  const signerOrProvider = passSigner ? signer : provider;

  return useMemo(
    () =>
      signerOrProvider ? getNFTContract({ nft, signerOrProvider }) : undefined,
    [signerOrProvider, nft]
  );
};
