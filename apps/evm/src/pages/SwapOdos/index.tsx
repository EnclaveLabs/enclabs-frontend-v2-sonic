/** @jsxImportSource @emotion/react */
import { useGetVaults } from 'clients/api';
import { Page, Spinner } from 'components';
import { useAccountAddress } from 'libs/wallet';
import { OdosSwapWidget } from "odos-widgets";
import { useStyles } from './styles';


  

const SwapOdosPage: React.FC = () => {
  const { accountAddress } = useAccountAddress();
  const theme = {
    maxWidth: 1500,
    fontFamily: "ProximaNova, Arial, sans-serif",
    textColor100: "#001F3F",
    textColor200: "#4F5B66",
    accentTextColor: "#FFFFFF",
    accentColor: "#004AAD",//button
    successColor: "#24B47E",
    errorColor: "#FF4D4F",
    warningColor: "#FFA500",
    textColor300: "#7D899B",
    backgroundColor100: "#FFFFFF",
    backgroundColor200: "#FFFFFF",
    backgroundColor300: "#FFFFFF", //inputs
    backgroundColor400: "#FCF9F1",
    wcThemeMode: "dark",
    
    };
  return (
    <Page indexWithSearchEngines={false}>
      <OdosSwapWidget
      theme={theme}
      />
    </Page>
  );
};

export default SwapOdosPage;
