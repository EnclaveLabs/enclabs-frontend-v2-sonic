import { type Cell, CellGroup } from "components";
import { useTranslation } from "libs/translations";
import { useMemo } from "react";
import useConvertMantissaToReadableTokenString from "../../../hooks/useConvertMantissaToReadableTokenString";
import { useGetToken } from "../../../libs/tokens";
import { useGetVeNFT } from "../../../libs/venfts";
import { useGetBalanceOf, useNftGetBalanceOf } from "../../../clients/api";
import { useAccountAddress } from "../../../libs/wallet";

export const VeUSDDashboard: React.FC = ({ ...otherProps }) => {
  const { accountAddress } = useAccountAddress();
  const { t } = useTranslation();
  const scUSD = useGetToken({ symbol: "scUSD" });
  const veUSD = useGetVeNFT({ symbol: "veUSD" });
  const enclabsVeUsd = useGetToken({ symbol: "Enclabs Trevee veUSD" })!;

  const { data: scUsdBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: scUSD,
  });
  const { data: veUsdBalance } = useNftGetBalanceOf({
    accountAddress: `${accountAddress}`,
    nft: veUSD,
  });
  const { data: enclabsVeUsdBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: enclabsVeUsd,
  });

  const isFetching = !scUsdBalance || !veUsdBalance || !enclabsVeUsdBalance;

  if (isFetching) return <></>;

  const scUsdBalanceReadable = useConvertMantissaToReadableTokenString({
    value: scUsdBalance.balanceMantissa,
    token: scUSD,
  });
  const enclabsVeUsdBalanceReadable = useConvertMantissaToReadableTokenString({
    value: enclabsVeUsdBalance.balanceMantissa,
    token: enclabsVeUsd,
  });

  const cells: Cell[] = useMemo(
    () => [
      {
        label: t("veusd.dashboard.scUsdBalance"),
        value: scUsdBalanceReadable,
      },
      {
        label: t("veusd.dashboard.veUsdBalance"),
        value: `${veUsdBalance.balance} veNFT(s)`,
      },
      {
        label: t("veusd.dashboard.enclabsVeUsdBalance"),
        value: enclabsVeUsdBalanceReadable,
      },
    ],
    [scUsdBalanceReadable, veUsdBalance.balance, enclabsVeUsdBalanceReadable]
  );

  return (
    <CellGroup
      className={"xl:shadow-lg xl:rounded-xl"}
      cells={cells}
      {...otherProps}
    />
  );
};
