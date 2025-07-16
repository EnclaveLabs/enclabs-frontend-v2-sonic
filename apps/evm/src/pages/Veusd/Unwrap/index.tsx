import { Token } from "../../../types";
import UnwrapForm from "./UnwrapForm";
import { useGetBalanceOf } from "../../../clients/api";
import { useAccountAddress } from "../../../libs/wallet";

interface VeUsdUnwrapInput {
  tokenUsedToUnwrap: Token;
}

export const VeUsdUnwrap: React.FC<VeUsdUnwrapInput> = ({
  tokenUsedToUnwrap,
}) => {
  const { accountAddress } = useAccountAddress();
  const { data: tokenUsedToUnwrapBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: tokenUsedToUnwrap,
  });

  return (
    !!tokenUsedToUnwrapBalance && (
      <UnwrapForm
        tokenUsedToUnwrap={tokenUsedToUnwrap}
        limitTokensMantissa={tokenUsedToUnwrapBalance.balanceMantissa}
        onSubmitSuccess={() => Promise.resolve()}
      />
    )
  );
};
