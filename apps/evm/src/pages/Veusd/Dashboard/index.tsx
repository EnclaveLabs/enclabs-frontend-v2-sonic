import { type Cell, CellGroup, type CellGroupProps } from "components";
import { useTranslation } from "libs/translations";
import { useMemo } from "react";
import BigNumber from "bignumber.js";
import useConvertMantissaToReadableTokenString from "../../../hooks/useConvertMantissaToReadableTokenString";
import { useGetToken } from "../../../libs/tokens";
import { useChainId } from "libs/wallet";

export interface VeUSDDashboardCtnProps extends Omit<CellGroupProps, "cells"> {
  scUsdBalance: BigNumber | undefined;
  veUsdBalance: BigNumber | undefined;
  enclabsVeUsdBalance: BigNumber | undefined;
}

export interface VeUSDDashboardProps extends Omit<CellGroupProps, "cells"> {
  scUsdBalance: string;
  veUsdBalance: string;
  enclabsVeUsdBalance: string;
}

export const LoadingVeUSDDashboard: React.FC = () => {
  return (
    <VeUSDDashboard
      scUsdBalance={"-"}
      veUsdBalance={"-"}
      enclabsVeUsdBalance={"-"}
    />
  );
};

export const VeUSDDashboardCtn: React.FC<VeUSDDashboardCtnProps> = ({
  scUsdBalance,
  veUsdBalance,
  enclabsVeUsdBalance,
  ...otherProps
}) => {
  const { chainId } = useChainId();
  const scUsd = useGetToken({ chainId, symbol: "scUSD" });
  const scUsdBalanceReadable = useConvertMantissaToReadableTokenString({
    value: scUsdBalance,
    token: scUsd,
  });

  const isFetching = !scUsdBalance || !veUsdBalance || !enclabsVeUsdBalance;

  return isFetching ? (
    <LoadingVeUSDDashboard />
  ) : (
    <VeUSDDashboard
      scUsdBalance={scUsdBalanceReadable}
      veUsdBalance={veUsdBalance.toString()}
      enclabsVeUsdBalance={enclabsVeUsdBalance.toString()}
      {...otherProps}
    />
  );
};

export const VeUSDDashboard: React.FC<VeUSDDashboardProps> = ({
  scUsdBalance,
  veUsdBalance,
  enclabsVeUsdBalance,
  ...otherProps
}) => {
  const { t } = useTranslation();

  const cells: Cell[] = useMemo(
    () => [
      {
        label: t("veusd.dashboard.scUsdBalance"),
        value: scUsdBalance,
      },
      {
        label: t("veusd.dashboard.veUsdBalance"),
        value: veUsdBalance,
      },
      {
        label: t("veusd.dashboard.enclabsVeUsdBalance"),
        value: enclabsVeUsdBalance,
      },
    ],
    []
  );

  return <CellGroup cells={cells} {...otherProps} />;
};
