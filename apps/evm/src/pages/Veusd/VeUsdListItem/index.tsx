import { useGetVeUsdTokenOfOwnerByIndex } from "../../../clients/api";
import { ChainId } from "types";

interface VeUsdListItemProps {
  tokenIndex: number;
  accountAddress: string;
  chainId: ChainId;
}

export const VeUsdListItem: React.FC<VeUsdListItemProps> = ({
  accountAddress,
  tokenIndex,
  chainId,
}) => {
  const { data: VeUsdData, isLoading: VeUsdDataLoading } =
    useGetVeUsdTokenOfOwnerByIndex({
      accountAddress,
      tokenIndex,
      chainId,
    });

  return <p>{VeUsdData ? JSON.stringify(VeUsdData) : "mhhhh"}</p>;
};
