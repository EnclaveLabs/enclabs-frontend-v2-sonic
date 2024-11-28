import { useParams } from 'react-router';

import { useGetAsset } from 'clients/api';
import { useGetChainMetadata } from 'hooks/useGetChainMetadata';
import { useImageAccentColor } from 'hooks/useImageAccentColor';
import { cn } from 'utilities';
import { MarketInfo } from './MarketInfo';
import { TopBar } from './TopBar';
import { useIsOnLidoMarketPage } from './useIsOnLidoMarketPage';
import { useIsOnMarketPage } from './useIsOnMarketPage';
import { getTokenType } from 'components/Tag';
import { tokenTypeInfo} from 'constants/tokenType';
import { useMemo } from 'react';

export const Header: React.FC = () => {
  const isOnMarketPage = useIsOnMarketPage();
  const isOnLidoMarketPage = useIsOnLidoMarketPage();
  const { lstPoolVWstEthContractAddress } = useGetChainMetadata();

  const { vTokenAddress = '' } = useParams();

  const { data: getAssetData } = useGetAsset({
    vTokenAddress: isOnLidoMarketPage ? lstPoolVWstEthContractAddress : vTokenAddress,
  });
  const asset = getAssetData?.asset;

  let { color: gradientAccentColor } = useImageAccentColor({
    imagePath: asset?.vToken.underlyingToken.asset,
  });

  gradientAccentColor = useMemo(
    () => {
      const tokenType = getTokenType(asset?.vToken.underlyingToken.address!);
      return tokenTypeInfo[tokenType].borderColor;
    },
    [asset],
  );

  return (
    <header
      className={cn(
        // The gradient will only be visible when a background color is applied. It is built this
        // way to support gradient background using a solid background color
        'transition-all duration-500 bg-gradient-to-b from-background/40 to-background',
      )}
      style={
        isOnMarketPage && gradientAccentColor
          ? {
              backgroundColor: gradientAccentColor,
            }
          : undefined
      }
    >
      <TopBar />
    
      {isOnMarketPage && <MarketInfo />}
    </header>
  );
};
