import { useMemo } from "react";

import { useGetPools, useGetVaults } from "clients/api";
import { Spinner } from "components";
import { useAccountAddress } from "libs/wallet";

import AccountPlaceholder from "./AccountPlaceholder";
import PoolsBreakdown from "./PoolsBreakdown";
import VaultsBreakdown from "./VaultsBreakdown";

const Account: React.FC = () => {
  const { accountAddress } = useAccountAddress();
  const { data: getPoolsData } = useGetPools({ accountAddress });
  const pools = getPoolsData?.pools || [];

  const { data: getVaultsData } = useGetVaults({ accountAddress });
  const vaults = getVaultsData || [];

  const isCriticalFetching = false;

  // Filter out vaults user has not staked in
  const filteredVaults = useMemo(
    () => vaults.filter((vault) => vault.userStakedMantissa?.isGreaterThan(0)),
    [vaults]
  );

  // Filter out pools user has not supplied in or borrowed from, unless they have assets enabled as
  // collateral in that pool
  const filteredPools = useMemo(
    () =>
      pools.filter((pool) =>
        pool.assets.some(
          (asset) =>
            asset.userSupplyBalanceTokens.isGreaterThan(0) ||
            asset.userBorrowBalanceTokens.isGreaterThan(0) ||
            asset.isCollateralOfUser
        )
      ),
    [pools]
  );

  if (isCriticalFetching) {
    return <Spinner />;
  }

  const hasPositions = filteredPools.length > 0 || filteredVaults.length > 0;

  if (!hasPositions) {
    return <AccountPlaceholder />;
  }

  return (
    <div className="flex-auto space-y-6 lg:space-y-10">
      {filteredVaults.length > 0 && <VaultsBreakdown vaults={filteredVaults} />}

      {filteredPools.length > 0 && <PoolsBreakdown pools={filteredPools} />}
    </div>
  );
};

export default Account;
