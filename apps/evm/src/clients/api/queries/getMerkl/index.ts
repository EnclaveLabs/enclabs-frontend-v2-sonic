import { MerklApi } from "@merkl/api";
const merkl = MerklApi('https://api.merkl.xyz').v4

export const getMerkl = merkl.opportunities.index.get({
      query: { name: 'enclabs' },
    });

