/** @jsxImportSource @emotion/react */
import { useMemo, useState } from "react";

import { type Tag, TagGroup } from "components";
import { useTranslation } from "libs/translations";
import type { Pool } from "types";

import Section from "../../Section";
import Summary from "../Summary";
import { PoolTagContent } from "./PoolTagContent";
import Tables from "./Tables";
import { useStyles } from "./styles";

export interface PoolsBreakdownProps {
  pools: Pool[];
  className?: string;
}

export const PoolsBreakdown: React.FC<PoolsBreakdownProps> = ({
  pools,
  className,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [selectedPoolIndex, setSelectedPoolIndex] = useState<number>(0);
  const selectedPool = useMemo(
    () => (selectedPoolIndex > 0 ? pools[selectedPoolIndex - 1] : undefined),
    [pools, selectedPoolIndex]
  );

  const allTag: Tag = useMemo(() => ({ id: "all", content: "All" }), []);

  const tags: Tag[] = useMemo(
    () => [
      allTag,
      ...pools.map((pool) => ({
        id: pool.comptrollerAddress,
        content: <PoolTagContent pool={pool} />,
      })),
    ],
    [pools, allTag]
  );

  return (
    <Section className={className} title={t("account.poolsBreakdown.title")}>
      {pools.length > 0 && (
        <TagGroup
          css={styles.tags}
          tags={tags}
          activeTagIndex={selectedPoolIndex}
          onTagClick={setSelectedPoolIndex}
        />
      )}

      <Summary
        pools={
          selectedPoolIndex === 0 ? pools : selectedPool ? [selectedPool] : []
        }
        displayAccountHealth
        css={styles.summary}
      />

      <Tables
        pools={
          selectedPoolIndex === 0 ? pools : selectedPool ? [selectedPool] : []
        }
      />
    </Section>
  );
};

export default PoolsBreakdown;
