import { Card, Page, Spinner, TabContent, Tabs } from "components";
import { useStyles } from "../VoterLeaderboard/styles";
import { cn } from "../../utilities";
import { useTranslation } from "react-i18next";
import { useAccountAddress } from "../../libs/wallet";
import { useGetBalanceOf, useNftGetBalanceOf } from "../../clients/api";
import { useGetVeNFT } from "../../libs/venfts";
import { useGetToken } from "../../libs/tokens";
import { VeUsdWrap } from "./Wrap";
import { VeUsdUnwrap } from "./Unwrap";
import { VeUSDDashboard } from "./Dashboard";

const VeUSD: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { accountAddress } = useAccountAddress();
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

  const tabsContent: TabContent[] = [
    {
      title: t("veusd.wrap"),
      content: (
        <VeUsdWrap
          veUsdBalance={veUsdBalance ? veUsdBalance.balance.toString() : "0"}
        />
      ),
    },
    {
      title: t("veusd.unwrap"),
      content: <VeUsdUnwrap tokenUsedToUnwrap={enclabsVeUsd} />,
    },
  ];

  if (!scUsdBalance || !veUsdBalance || !enclabsVeUsdBalance) {
    return (
      <div className={"w-full h-full flex justify-center items-center"}>
        <Spinner variant={"large"} />
      </div>
    );
  }

  return (
    <Page indexWithSearchEngines={false}>
      <div css={styles.root}>
        <VeUSDDashboard />
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
