import { useMemo } from "react";

import { useChainId } from "libs/wallet";
import type { ChainId } from "types";
import { getVeNFT } from "../../utilities/getVeNFT";

export interface UseGetTokenInput {
  symbol: string;
  chainId?: ChainId;
}

export const useGetVeNFT = (input: UseGetTokenInput) => {
  const { chainId: currentChainId } = useChainId();
  const chainId = input.chainId || currentChainId;

  return useMemo(
    () => getVeNFT({ chainId, symbol: input.symbol }),
    [chainId, input.symbol]
  );
};
