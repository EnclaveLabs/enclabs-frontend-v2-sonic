import { useMemo } from "react";

import { routes } from "constants/routing";
import { useIsFeatureEnabled } from "hooks/useIsFeatureEnabled";
// import { useAccountAddress } from "libs/wallet";

import { useGetChainMetadata } from "hooks/useGetChainMetadata";
import type { MenuItem } from "./types";

const useGetMenuItems = () => {
  // const { accountAddress } = useAccountAddress();
  const { lstPoolComptrollerContractAddress, lstPoolVWstEthContractAddress } =
    useGetChainMetadata();
  const swapRouteEnabled = useIsFeatureEnabled({ name: "swapRoute" });
  const vaiRouteEnabled = useIsFeatureEnabled({ name: "vaiRoute" });
  const bridgeRouteEnabled = useIsFeatureEnabled({ name: "bridgeRoute" });
  const isolatedPoolsRouteEnabled = useIsFeatureEnabled({
    name: "isolatedPools",
  });
  const isRewardsRouteEnabled = useIsFeatureEnabled({
    name: "rewards",
  });
  const isSwapOdosRouteEnabled = useIsFeatureEnabled({
    name: "swapOdos",
  });
  const isTreveeRouteEnabled = useIsFeatureEnabled({
    name: "trevee",
  });

  // Keep currently unused flags/addresses referenced to satisfy linter without changing behavior
  const __keep = {
    swapRouteEnabled,
    vaiRouteEnabled,
    bridgeRouteEnabled,
    lstPoolVWstEthContractAddress,
    lstPoolComptrollerContractAddress,
  };
  void __keep;

  return useMemo(() => {
    const menuItems: MenuItem[] = [];
    // 1) Account (always visible)
    menuItems.push({
      to: routes.account.path,
      // Translation key: do not remove this comment
      // t('layout.menuItems.account')
      i18nKey: "layout.menuItems.account",
      iconName: "dashboard",
    });

    // 2) Markets (formerly Dashboard)
    menuItems.push({
      to: routes.dashboard.path,
      // Translation key: do not remove this comment
      // t('layout.menuItems.dashboard')
      i18nKey: "layout.menuItems.dashboard",
      iconName: "market",
    });

    // 3) Earn
    menuItems.push({
      to: routes.earn.path,
      // Translation key: do not remove this comment
      // t('layout.menuItems.earn')
      i18nKey: "layout.menuItems.earn",
      iconName: "vault",
    });

    // Other items follow
    if (isolatedPoolsRouteEnabled) {
      menuItems.push({
        to: routes.isolatedPools.path,
        // Translation key: do not remove this comment
        // t('layout.menuItems.isolatedPools')
        i18nKey: "layout.menuItems.isolatedPools",
        iconName: "fourDots",
      });
    }

    isRewardsRouteEnabled && menuItems.push({
      to: routes.rewards.path,
      // Translation key: do not remove this comment
      // t('layout.menuItems.account')
      i18nKey: "layout.menuItems.rewards",
      iconName: "rewards",
    });

    /*isSwapOdosRouteEnabled && menuItems.push({
      to: routes.swapodos.path,
      // Translation key: do not remove this comment
      // t('layout.menuItems.account')
      i18nKey: "layout.menuItems.swap",
      iconName: "convert",
    });*/

    isTreveeRouteEnabled && menuItems.push({
      to: routes.veTrevee.path,
      // Translation key: do not remove this comment
      // t('layout.menuItems.account')
      i18nKey: "veTrevee",
      iconName: "treeve",
    });

    // if (lstPoolComptrollerContractAddress && lstPoolVWstEthContractAddress) {
    //   menuItems.push({
    //     to: routes.lidoMarket.path,
    //     // Translation key: do not remove this comment
    //     // t('layout.menuItems.lidoMarket')
    //     i18nKey: 'layout.menuItems.lidoMarket',
    //     iconName: 'lido',
    //   });
    // }

    // menuItems.push({
    //   to: routes.corePool.path,
    //   // Translation key: do not remove this comment
    //   // t('layout.menuItems.corePool')
    //   i18nKey: 'layout.menuItems.corePool',
    //   iconName: 'venus',
    // });

    // menuItems.push({
    //   to: routes.vaults.path,
    //   // Translation key: do not remove this comment
    //   // t('layout.menuItems.vaults')
    //   i18nKey: 'layout.menuItems.vaults',
    //   iconName: 'vault',
    // });

    // if (swapRouteEnabled) {
    //   menuItems.push({
    //     to: routes.swap.path,
    //     // Translation key: do not remove this comment
    //     // t('layout.menuItems.swap')
    //     i18nKey: 'layout.menuItems.swap',
    //     iconName: 'convert',
    //   });
    // }

    // menuItems.push({
    //   to: routes.governance.path,
    //   // Translation key: do not remove this comment
    //   // t('layout.menuItems.governance')
    //   i18nKey: 'layout.menuItems.governance',
    //   iconName: 'market',
    // });

    // if (vaiRouteEnabled) {
    //   menuItems.push({
    //     to: routes.vai.path,
    //     // Translation key: do not remove this comment
    //     // t('layout.menuItems.vai')
    //     i18nKey: 'layout.menuItems.vai',
    //     iconName: 'vaiOutline',
    //   });
    // }

    // if (bridgeRouteEnabled) {
    //   menuItems.push({
    //     to: routes.bridge.path,
    //     // Translation key: do not remove this comment
    //     // t('layout.menuItems.bridge')
    //     i18nKey: 'layout.menuItems.bridge',
    //     iconName: 'bridge',
    //   });
    // }

    return menuItems;
  }, [isolatedPoolsRouteEnabled, isRewardsRouteEnabled, isSwapOdosRouteEnabled, isTreveeRouteEnabled]);
};

export default useGetMenuItems;
