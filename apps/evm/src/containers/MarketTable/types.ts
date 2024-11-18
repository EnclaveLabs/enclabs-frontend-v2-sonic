import type { Asset, Pool } from 'types';

export type ColumnKey =
  | 'asset'
  | 'supplyApyLtv'
  | 'labeledSupplyApyLtv'
  | 'borrowApy'
  | 'labeledBorrowApy'
  | 'pool'
  | 'collateral'
  | 'userSupplyBalance'
  | 'userBorrowBalance'
  | 'borrowBalance'
  | 'supplyBalance'
  | 'liquidity'
  | 'userPercentOfLimit'
  | 'userWalletBalance'
  | 'type';

export interface PoolAsset extends Asset {
  pool: Pool;
}
