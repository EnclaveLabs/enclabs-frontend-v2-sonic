import { Card, Page, TabContent, Tabs } from "components";
import { useStyles } from "../VoterLeaderboard/styles";
import { cn } from "../../utilities";
import { useTranslation } from "react-i18next";
import { useAccountAddress, useChainId } from "../../libs/wallet";
import { useGetBalanceOf, useNftGetBalanceOf } from "../../clients/api";
import { useGetVeNFT } from "../../libs/venfts";
import { useGetToken } from "../../libs/tokens";
import { VeUSDDashboardCtn } from "./Dashboard";
import { VeUsdWrap } from "./Wrap";
import { VeUsdUnwrap } from "./Unwrap";

const VeUSD: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { chainId } = useChainId();
  const { accountAddress } = useAccountAddress();
  const scUSD = useGetToken({ chainId, symbol: "scUSD" });
  const veUSD = useGetVeNFT({ chainId, symbol: "veUSD" });
  const enclabsVeUsd = useGetVeNFT({ chainId, symbol: "Enclabs_veUSD" });

  const { data: scUsdBalance } = useGetBalanceOf({
    accountAddress: `${accountAddress}`,
    token: scUSD,
  });
  const { data: veUsdBalance } = useNftGetBalanceOf({
    accountAddress: `${accountAddress}`,
    nft: veUSD,
  });
  const { data: enclabsVeUsdBalance } = useNftGetBalanceOf({
    accountAddress: `${accountAddress}`,
    nft: enclabsVeUsd,
  });

  const tabsContent: TabContent[] = [
    {
      title: t("veusd.wrap"),
      content: <VeUsdWrap balance={veUsdBalance?.balance} />,
    },
    {
      title: t("veusd.unwrap"),
      content: <VeUsdUnwrap />,
    },
  ];

  return (
    <Page indexWithSearchEngines={false}>
      <div css={styles.root}>
        <VeUSDDashboardCtn
          scUsdBalance={scUsdBalance?.balanceMantissa}
          veUsdBalance={veUsdBalance?.balance}
          enclabsVeUsdBalance={enclabsVeUsdBalance?.balance}
        />
        <div className={"mt-4 flex justify-center"}>
          <Card
            className={cn(
              "w-auto shrink-0 overflow-x-auto lg:order-2 lg:sticky lg:w-[400px] lg:top-6 lg:max-h-[calc(100vh-48px)]"
            )}
          >
            <Tabs tabsContent={tabsContent} initialActiveTabIndex={0} />
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default VeUSD;
