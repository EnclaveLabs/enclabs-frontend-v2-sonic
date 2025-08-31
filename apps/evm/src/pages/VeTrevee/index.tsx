import { Card, Icon, Page, TabContent, Tabs } from "components";
import { useStyles } from "./styles";
import { cn } from "../../utilities";
import { useTranslation } from "react-i18next";
import { VeTreveeWrap } from "./Wrap";
import { VeTreveUnwrap } from "./Unwrap";
import { TreveeVeNftSymbol, TreveeWraping } from "../../types";
import {
  useGetEnclabsVeETHTreveeVeManagerContract,
  useGetEnclabsVeUSDTreveeVeManagerContract,
  useGetTreveeVeETHVoterContract,
  useGetTreveeVeUSDVoterContract,
} from "../../libs/contracts";
import { useEffect, useState } from "react";
import { VeNftSelect } from "./VeNftSelect";
import { useAccountAddress, useSigner } from "libs/wallet";
import { ConnectButton } from "containers/Layout/ConnectButton";
import { GradientBorder } from "components/GradientBorder";

const VeTrevee: React.FC = () => {
  const styles = useStyles();
  const { signer } = useSigner();
  const enclabsVeEthTreeveeVeManager =
    useGetEnclabsVeETHTreveeVeManagerContract({ passSigner: true });
  const enclabsVeUsdTreeveeVeManager =
    useGetEnclabsVeUSDTreveeVeManagerContract({ passSigner: true });
  const treveeVeETHVoter = useGetTreveeVeETHVoterContract({
    passSigner: true,
  });
  const treveeVeUSDVoter = useGetTreveeVeUSDVoterContract({
    passSigner: true,
  });

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
  const [treveeWraping, setTreveeWraping] = useState<TreveeWraping | undefined>(undefined);

  useEffect(() => {
    if (!!enclabsVeUsdTreeveeVeManager && !!treveeVeUSDVoter && !!enclabsVeEthTreeveeVeManager && !!treveeVeETHVoter && !treveeWraping) {
      setTreveeWraping(TreeveNftChoices["veUSD"]);
    }
  }, [enclabsVeUsdTreeveeVeManager, treveeVeUSDVoter, enclabsVeEthTreeveeVeManager, treveeVeETHVoter, treveeWraping, setTreveeWraping])

  const tabsContent: TabContent[] = [
    {
      title: "Wrap",
      content: treveeWraping ? <VeTreveeWrap treveeWraping={treveeWraping} /> : <></>,
    },
    {
      title: "Unwrap",
      content: treveeWraping ? <VeTreveUnwrap treveeWraping={treveeWraping} /> : <></>,
    },
  ];

  return (
    <Page indexWithSearchEngines={false}>
      <div css={styles.root}>
        {/*<VeTreveeDashboard treveeWraping={treveeWraping} />*/}
         <Icon name="info" className="reverse-color" />

        <p className={cn(
            "text-black bg-cards"
          )} css={styles.multicolorBorder}>
          Wrap / Unwrap your Trevee ve NFT and use it as collateral on Enclabs
          to borrow assets.
        </p>
        <Card
          className={cn(
            "w-auto shrink-0 overflow-x-auto lg:order-2 lg:sticky lg:top-6 lg:max-h-[calc(100vh-48px)] mt-4"
          )}
        >
          {!!signer ? <Tabs tabsContent={tabsContent} initialActiveTabIndex={0}>
            <VeNftSelect
              variant={"secondary"}
              buttonClassName={cn(
                "bg-background/40 hover:bg-background/40 active:bg-background/40"
              )}
              className={"mb-4 w-[50%]"}
              value={treveeWraping?.treveeVeNftSymbol || "veUSD"}
              onChange={(value) =>
                setTreveeWraping(TreeveNftChoices[value as TreveeVeNftSymbol])
              }
              label="Select VeNFT"
            />
          </Tabs> : <div className="flex justify-center"><ConnectButton variant={'primary'} /></div>}
        </Card>
      </div>
    </Page>
  );
};

export default VeTrevee;
