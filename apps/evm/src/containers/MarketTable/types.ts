import type { Asset, Pool } from 'types';

export type ColumnKey =
  | 'asset'
  | 'supplyApy'
  | 'labeledSupplyApy'
  | 'ltv'
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
  | 'type'
  | 'points'
  | 'borrowPoints';

export interface PoolAsset extends Asset {
  pool: Pool;
}
