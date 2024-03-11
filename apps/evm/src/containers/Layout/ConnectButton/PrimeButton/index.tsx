import primeLogoSrc from 'assets/img/primeLogo.svg';
import { type ButtonProps, SecondaryButton } from 'components';
import { useTranslation } from 'libs/translations';
import { cn, truncateAddress } from 'utilities';

export interface PrimeButtonProps extends ButtonProps {
  accountAddress: string;
}

export const PrimeButton: React.FC<PrimeButtonProps> = ({
  accountAddress,
  className,
  ...otherProps
}) => {
  const { t } = useTranslation();

  return (
    <SecondaryButton
      className={cn(
        'bg-background hover:bg-cards active:bg-cards relative border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-[1] before:-m-[1px] before:rounded-lg before:bg-gradient-to-r before:from-[#805c4e] before:to-[#e3cdc3] hover:border-transparent active:border-transparent',
        className,
      )}
      {...otherProps}
    >
      <>
        <img className="mr-2 w-5" src={primeLogoSrc} alt={t('PrimeButton.primeLogoAlt')} />

        {truncateAddress(accountAddress)}
      </>
    </SecondaryButton>
  );
};
