import BigNumber from "bignumber.js";
import { Spinner } from "../../../components";
import { useAccountAddress, useChainId } from "../../../libs/wallet";
import { VeUsdListItem } from "../VeUsdListItem";

export interface VeUsdWrapProps {
  balance: BigNumber | undefined;
}

export const VeUsdWrap: React.FC<VeUsdWrapProps> = ({ balance }) => {
  const { accountAddress } = useAccountAddress();
  const { chainId } = useChainId();

  if (balance === undefined) {
    return (
      <div className={"flex flex-grow justify-center py-4"}>
        <Spinner variant="small" />
      </div>
    );
  }

  const balanceAsNb = balance.toNumber();

  return Array.from({ length: balanceAsNb }, (_, i) => i).map((tokenIndex) => (
    <VeUsdListItem
      key={tokenIndex}
      tokenIndex={tokenIndex}
      accountAddress={`${accountAddress}`}
      chainId={chainId}
    />
  ));
};
