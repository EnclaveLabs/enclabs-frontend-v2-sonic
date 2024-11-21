import useCopyToClipboard from 'hooks/useCopyToClipboard';
import { useTranslation } from 'libs/translations';
import { useAddTokenToWallet } from 'libs/wallet';
import { ChainId, ChainName, Token } from 'types';
import { cn } from 'utilities';
import { type ButtonProps, TertiaryButton } from '../Button';
import { Icon } from '../Icon';
import { getTokenType } from 'components/Tag';
import { tokenTypeInfo} from 'constants/tokenType';
import { useChainId } from 'libs/wallet/hooks/useChainId';

export interface BuyTokenButtonButtonProps extends Omit<ButtonProps, 'onClick' | 'variant'> {
  isUserConnected: boolean;
  token: Token;
}

export const BuyTokenButton: React.FC<BuyTokenButtonButtonProps> = ({
  className,
  isUserConnected,
  token,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const {chainId} = useChainId();

  const tokenType = getTokenType(token.address);
  const tokenTypeInfos = tokenTypeInfo[tokenType];

  function getChainEnum(chainId: number): ChainId | undefined {
    return (Object.values(ChainId) as ChainId[]).find(value => value === chainId);
  }

  function getChainName(chainId: ChainId): string | undefined {
    const chainKey = Object.keys(ChainId).find(
      (key) => ChainId[key as keyof typeof ChainId] === chainId
    ) as keyof typeof ChainName;
  
    return ChainName[chainKey] || undefined;
  }

  const handleOnClick = (() => {

    const chainEnum = getChainEnum(chainId);
    if(!chainEnum)
      return;

    const chainName = getChainName(chainId);
    if(!chainName)
      return;
    
    const url = tokenTypeInfos.getUrl(token.address, chainName);
    window.open(url, '_blank');
  });

  return (
    <TertiaryButton
      className={cn(
        'p-1 h-8 w-12',
        'border-transparent hover:border-transparent active:border-transparent bg-background hover:bg-background active:bg-background text-grey hover:text-lightBlack active:text-blue',
        className,
      )}
      onClick={handleOnClick}
      {...otherProps}
    >
      {t('layout.header.buy').toUpperCase()}
    </TertiaryButton>
  );
};
