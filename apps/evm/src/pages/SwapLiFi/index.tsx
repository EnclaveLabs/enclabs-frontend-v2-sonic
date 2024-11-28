/** @jsxImportSource @emotion/react */
import { useGetVaults } from 'clients/api';
import { Page, Spinner } from 'components';
import { useAccountAddress } from 'libs/wallet';
import { LiFiWidget, WidgetConfig } from '@lifi/widget';
import { useStyles } from './styles';


  

const SwapLiFiPage: React.FC = () => {
  const { accountAddress } = useAccountAddress();
  const widgetConfig: WidgetConfig = {
    integrator: 'Enclabs',
    theme: {
      container: {
        border: '1px solid rgb(234, 234, 234)',
        borderRadius: '16px',
      },
      palette: {
        primary: { main: '#004aad' },
        secondary: { main: '#004aad' },
      },
    },
    variant: 'wide',
    // It can be either compact, wide, or drawer
    
  };

  return (
    <Page indexWithSearchEngines={false}>
      <LiFiWidget integrator="Enclabs" config={widgetConfig} />
    </Page>
  );
};

export default SwapLiFiPage;
