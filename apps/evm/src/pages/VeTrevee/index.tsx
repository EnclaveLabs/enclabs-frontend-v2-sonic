import { Card, Page, TabContent, Tabs } from "components";
import { useStyles } from "../VoterLeaderboard/styles";
import { cn } from "../../utilities";
import { useTranslation } from "react-i18next";
import { VeTreveeWrap } from "./Wrap";
import { VeTreveUnwrap } from "./Unwrap";
import { VeTreveeDashboard } from "./Dashboard";
import { TreveeVeNftSymbol, TreveeWraping } from "../../types";
import {
  useGetEnclabsVeETHTreveeVeManagerContract,
  useGetEnclabsVeUSDTreveeVeManagerContract,
  useGetTreveeVeETHVoterContract,
  useGetTreveeVeUSDVoterContract,
} from "../../libs/contracts";
import { useState } from "react";
import { VeNftSelect } from "./VeNftSelect";

const VeTrevee: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const enclabsVeEthTreeveeVeManager =
    useGetEnclabsVeETHTreveeVeManagerContract({ passSigner: true })!;
  const enclabsVeUsdTreeveeVeManager =
    useGetEnclabsVeUSDTreveeVeManagerContract({ passSigner: true })!;
  const treveeVeETHVoter = useGetTreveeVeETHVoterContract({
    passSigner: true,
  })!;
  const treveeVeUSDVoter = useGetTreveeVeUSDVoterContract({
    passSigner: true,
  })!;

  const TreeveNftChoices: Record<TreveeVeNftSymbol, TreveeWraping> = {
    veUSD: {
      manager: enclabsVeUsdTreeveeVeManager,
      voter: treveeVeUSDVoter,
      treeveTokenSymbol: "scUSD",
      treveeVeNftSymbol: "veUSD",
      treveeStakedTokenSymbol: "stkscUSD",
      enclabsStakedTokenSymbol: "Enclabs Trevee veUSD",
    },
    veETH: {
      manager: enclabsVeEthTreeveeVeManager,
      voter: treveeVeETHVoter,
      treeveTokenSymbol: "scETH",
      treveeVeNftSymbol: "veETH",
      treveeStakedTokenSymbol: "stkscETH",
      enclabsStakedTokenSymbol: "Enclabs Trevee veETH",
    },
  };
  const [treveeWraping, setTreveeWraping] = useState<TreveeWraping>(
    TreeveNftChoices["veUSD"]
  );

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
            <VeNftSelect
              variant={"secondary"}
              buttonClassName={cn(
                "bg-background/40 hover:bg-background/40 active:bg-background/40"
              )}
              className={"mb-4"}
              value={treveeWraping.treveeVeNftSymbol}
              onChange={(value) =>
                setTreveeWraping(TreeveNftChoices[value as TreveeVeNftSymbol])
              }
              label="Select VeNFT"
            />
            <Tabs tabsContent={tabsContent} initialActiveTabIndex={0} />
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default VeTrevee;
