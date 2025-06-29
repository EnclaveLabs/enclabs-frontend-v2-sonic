# Enclabs Protocol - venfts package

This package contains the lists of venfts supported on each chain and exports functions and hooks to
get them.

```typescript
import {useGetVeNFT} from 'libs/tokens';

// Get list of venfts on the currently selected chain
const venfts = useGetVeNFT();
```

## Adding a venft

In order to add a new venft to this package, you need to update the [information files](./infos/) of
all the chains you want this venft to be supported on.