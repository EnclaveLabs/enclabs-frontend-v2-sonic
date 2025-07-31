import { Card, Page, TabContent, Tabs } from "components";
import { useStyles } from "../VoterLeaderboard/styles";
import { cn } from "../../utilities";
import { useTranslation } from "react-i18next";
import { VeTreveeWrap } from "./Wrap";
import { VeTreveUnwrap } from "./Unwrap";
import { VeTreveeDashboard } from "./Dashboard";
import { TreveeWraping } from "../../types";
import {
  useGetEnclabsVeETHTreveeVeManagerContract,
  useGetTreveeVeETHVoterContract,
} from "../../libs/contracts";

const VeTrevee: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const enclabsVeEthTreeveeVeManager =
    useGetEnclabsVeETHTreveeVeManagerContract({ passSigner: true })!;
  const treveeVoter = useGetTreveeVeETHVoterContract({ passSigner: true })!;

  const treveeWraping: TreveeWraping = {
    manager: enclabsVeEthTreeveeVeManager,
    voter: treveeVoter,
    treeveTokenSymbol: "scETH",
    treveeVeNftSymbol: "veETH",
    treveeStakedTokenSymbol: "stkscETH",
    enclabsStakedTokenSymbol: "Enclabs Trevee veETH",
  };

  const tabsContent: TabContent[] = [
    {
      title: "Wrap",
      content: <VeTreveeWrap treveeWraping={treveeWraping} />,
    },
    {
      title: "Unwrap",
      content: <VeTreveUnwrap treveeWraping={treveeWraping} />,
    },
  ];

  return (
    <Page indexWithSearchEngines={false}>
      <div css={styles.root}>
        <VeTreveeDashboard treveeWraping={treveeWraping} />
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

export default VeTrevee;
