/** @jsxImportSource @emotion/react */
import { type ReactElement, useState } from "react";

import { ButtonGroup } from "../ButtonGroup";
import { useStyles } from "./styles";

export type TabContent = {
  title: string;
  content: ReactElement;
};

export interface TabsProps {
  tabsContent: TabContent[];
  initialActiveTabIndex?: number;
  tokenAddress?: string;
  onTabChange?: (newIndex: number) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Tabs = ({
  tabsContent,
  initialActiveTabIndex = 0,
  tokenAddress = "",
  onTabChange,
  className,
  children,
}: TabsProps) => {
  const styles = useStyles();
  const [activeTabIndex, setActiveTabIndex] = useState(initialActiveTabIndex);

  const handleChange = (index: number) => {
    setActiveTabIndex(index);
    // Only call onTabChange callback if tab clicked isn't currently active
    if (index !== activeTabIndex && onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className={className}>
      <ButtonGroup
        buttonLabels={tabsContent.map(({ title }) => title)}
        css={styles.buttonsContainer}
        activeButtonIndex={activeTabIndex}
        tokenAddress={tokenAddress}
        onButtonClick={handleChange}
        fullWidth
      />

      {children}

      {tabsContent[activeTabIndex].content}
    </div>
  );
};
