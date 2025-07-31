import { type Cell, CellGroup } from "components";
import { useTranslation } from "libs/translations";
import { useMemo } from "react";
import useConvertMantissaToReadableTokenString from "../../../hooks/useConvertMantissaToReadableTokenString";
import { useGetToken } from "../../../libs/tokens";
import { useGetVeNFT } from "../../../libs/venfts";
import { useGetBalanceOf, useNftGetBalanceOf } from "../../../clients/api";
import { useAccountAddress } from "../../../libs/wallet";
import { TreveeWraping } from "../../../types";

interface VeTreveeDashboardProps {
  treveeWraping: TreveeWraping;
}

export const VeTreveeDashboard: React.FC<VeTreveeDashboardProps> = ({
  treveeWraping,
  ...otherProps
}) => {
  const { accountAddress } = useAccountAddress();
  const { t } = useTranslation();
  const treeveToken = useGetToken({ symbol: treveeWraping.treeveTokenSymbol })!;
  const treveeVeNft = useGetVeNFT({ symbol: treveeWraping.treveeVeNftSymbol })!;
  const enclabsStakedToken = useGetToken({
    symbol: treveeWraping.enclabsStakedTokenSymbol,
  })!;

  const { data: treeveTokenBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: treeveToken,
  });
  const { data: treveeVeNftBalance } = useNftGetBalanceOf({
    accountAddress: `${accountAddress}`,
    nft: treveeVeNft,
  });
  const { data: enclabsStakedTokenBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: enclabsStakedToken,
  });

  const readableTreeveTokenBalance = useConvertMantissaToReadableTokenString({
    value: treeveTokenBalance?.balanceMantissa,
    token: treeveToken,
  });
  const readableEnclabsStakedTokenBalance =
    useConvertMantissaToReadableTokenString({
      value: enclabsStakedTokenBalance?.balanceMantissa,
      token: enclabsStakedToken,
    });

  const cells: Cell[] = useMemo(
    () => [
      {
        label: `${treeveToken.symbol} balance`,
        value: readableTreeveTokenBalance,
      },
      {
        label: `${treveeVeNft.symbol} balance`,
        value: `${treveeVeNftBalance?.balance ?? "-"} ${treveeVeNft.symbol}(s)`,
      },
      {
        label: `${enclabsStakedToken.symbol} balance`,
        value: readableEnclabsStakedTokenBalance,
      },
    ],
    [
      readableTreeveTokenBalance,
      treveeVeNftBalance?.balance,
      readableEnclabsStakedTokenBalance,
    ]
  );

  return (
    <CellGroup
      className={"xl:shadow-lg xl:rounded-xl"}
      cells={cells}
      {...otherProps}
    />
  );
};
