/** @jsxImportSource @emotion/react */
import { Card, Page, TabContent, Tabs } from "components";
import { useStyles } from "../VoterLeaderboard/styles";
import { cn } from "../../utilities";
import { useTranslation } from "react-i18next";

const VeUSD: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const tabsContent: TabContent[] = [
    {
      title: t("veusd.deposit"),
      content: <p>deposit</p>,
    },
    {
      title: t("veusd.withdraw"),
      content: <p>withdraw</p>,
    },
  ];

  return (
    <Page indexWithSearchEngines={false}>
      <div css={styles.root}>
        <Card
          className={cn(
            "w-auto shrink-0 overflow-x-auto lg:order-2 lg:sticky lg:w-[400px] lg:top-6 lg:max-h-[calc(100vh-48px)]"
          )}
        >
          <Tabs tabsContent={tabsContent} initialActiveTabIndex={0} />
        </Card>
      </div>
    </Page>
  );
};

export default VeUSD;
