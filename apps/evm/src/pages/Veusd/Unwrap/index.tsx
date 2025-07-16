import { Token } from "../../../types";
import UnwrapForm from "./UnwrapForm";
import { useGetBalanceOf } from "../../../clients/api";
import { useAccountAddress } from "../../../libs/wallet";
import { useGetEnclabsTreveeVeManagerContract } from "../../../libs/contracts";

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
  const enclabsVeManagerContract = useGetEnclabsTreveeVeManagerContract();

  return (
    !!tokenUsedToUnwrapBalance &&
    !!enclabsVeManagerContract?.address && (
      <UnwrapForm
        tokenUsedToUnwrap={tokenUsedToUnwrap}
        limitTokensMantissa={tokenUsedToUnwrapBalance.balanceMantissa}
        enclabsVeManagerContract={enclabsVeManagerContract}
        onSubmitSuccess={() => Promise.resolve()}
      />
    )
  );
};
