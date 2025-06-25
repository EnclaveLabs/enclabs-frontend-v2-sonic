/** @jsxImportSource @emotion/react */
import { Page } from "components";
import { useStyles } from "../VoterLeaderboard/styles";

const VeUSD: React.FC = () => {
  const styles = useStyles();

  return (
    <Page indexWithSearchEngines={false}>
      <div css={styles.root}>
        <p>hey</p>
      </div>
    </Page>
  );
};

export default VeUSD;
