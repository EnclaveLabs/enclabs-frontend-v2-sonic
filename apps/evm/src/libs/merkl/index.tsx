import {
  merkl,
  useGetMerkl,
} from "../../clients/api/queries/getMerkl/useGetMerkl";
import { Asset, MerklDistribution } from "../../types";

export type MerklAction = "LEND" | "BORROW";

export type Merkl = Awaited<ReturnType<typeof merkl.opportunities.index.get>>;

export interface getMerklDistributionsInput {
  merklChainData: Merkl['data'];
  asset: Asset;
}

export interface getMerklDistributionsOutput {
  supplyDistribution?: MerklDistribution;
  borrowDistribution?: MerklDistribution;
}

export interface EnclapsMerklWrapperProps {
  children?: React.ReactNode;
}

const EnclapsMerklWrapper = ({ children }: EnclapsMerklWrapperProps) => {
  const _ = useGetMerkl();

  return children;
};

export default EnclapsMerklWrapper;
