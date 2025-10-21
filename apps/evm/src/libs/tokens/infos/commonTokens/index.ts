import type { TokenMapping } from 'libs/tokens/types';
import { ChainId } from 'types';

import { tokens as sonicMainnetTokens } from './sonicMainnet';
import { tokens as plasmaMainnetTokens } from './plasmaMainnet';

export const tokens: TokenMapping = {
  [ChainId.SONIC_MAINNET]: sonicMainnetTokens,
  [ChainId.PLASMMA_MAINET]: plasmaMainnetTokens,
};
