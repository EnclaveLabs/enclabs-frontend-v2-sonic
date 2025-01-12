import type { TokenMapping } from 'libs/tokens/types';
import { ChainId } from 'types';

import { tokens as sonicMainnetTokens } from './sonicMainnet';

export const tokens: TokenMapping = {
  [ChainId.SONIC_MAINNET]: sonicMainnetTokens,
};
