import { ChainId } from "types";

import { venfts as sonicMainnetTokens } from "./sonicMainnet";
import { VeNFTMapping } from "../../types";

export const VeNFTs: VeNFTMapping = {
  [ChainId.SONIC_MAINNET]: sonicMainnetTokens,
};
