import { Slot } from '@radix-ui/react-slot';

import { cn } from 'utilities';

import { Spinner } from '../Spinner';
import { getTokenType } from 'components/Tag';
import { tokenTypeInfo} from 'constants/tokenType';

export type Variant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'quinary'
  | 'senary'
  | 'text';

const getVariantClasses = ({ variant, active, tokenAddress = '' }: { variant: Variant; active: boolean; tokenAddress: string | undefined }) => {

  let tokenType;
  let tokenTypeInfos;
  if(tokenAddress){
    tokenType = getTokenType(tokenAddress!);
    tokenTypeInfos = tokenTypeInfo[tokenType];
  }
  
  switch (variant) {
    // Connect button when connected
    case 'secondary':
      return cn(
        'border-mediumBlue hover:border-blue hover:bg-primary hover:text-white active:border-mediumBlue active:bg-mediumBlue disabled:border-lightGrey disabled:bg-transparent',
        active && 'border-blue bg-primary',
      );
    // Buttons in token view
    case 'tertiary':
      return cn(
        tokenTypeInfos?.buttonClassName,
        `active:border-grey active:bg-grey disabled:bg-lightGrey h-10 px-3 disabled:border-transparent`,
      );
    // Group buttons (Amount %, Supplied/Borrow)
    case 'quaternary':
      return cn(
        tokenTypeInfos?.buttonClassName,
        'active:text-grey h-8 rounded-full px-2 py-1 disabled:bg-lightGrey disabled:border-transparent',
      );
    case 'quinary':
      // Filter group buttons
      return cn(
        'border-cards border-lightGrey bg-cards active:border-blue active:bg-primary disabled:border-background disabled:bg-background h-8 rounded-full px-5 py-1',
        active ? 'border-blue bg-primary text-white' : 'hover:border-blue hover:bg-primary hover:text-white',
      );
    case 'senary':
      return cn(
        'border-lightGrey bg-cards hover:border-blue hover:border-blue hover:bg-lightGrey disabled:border-lightGrey disabled:bg-cards h-8 px-2 py-1',
        active && 'border-blue bg-lightGrey',
      );
    case 'text':
      return cn(
        'active:mediumBlue text-primary hover:text-mediumBlue bg-transparent p-0',
        active && 'text-mediumBlue',
      );
    // primary
    default:
      // Connect button
      return cn(
        'border-blue bg-primary text-white active:border-darkBlue active:bg-darkBlue disabled:border-lightGrey disabled:bg-lightGrey',
        active ? 'border-mediumBlue bg-mediumBlue' : 'hover:border-mediumBlue hover:bg-mediumBlue',
      );
  }
};

export interface ButtonWrapperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  active?: boolean;
  variant?: Variant;
  children?: React.ReactNode;
  tokenAddress?: string;
}

export const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  asChild,
  variant = 'primary',
  active = false,
  className,
  type = 'button',
  tokenAddress = '',
  ...otherProps
}) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'disabled:text-grey inline-flex h-12 cursor-pointer items-center justify-center rounded-lg border border-transparent px-6 py-2 font-semibold transition-all duration-[250ms] disabled:cursor-default',
        getVariantClasses({ variant, active, tokenAddress }),
        className,
      )}
      type={type}
      {...otherProps}
    />
  );
};

export interface ButtonProps extends Omit<ButtonWrapperProps, 'asChild'> {
  loading?: boolean;
  contentClassName?: string;
}

export const Button = ({
  loading,
  disabled = false,
  variant = 'primary',
  children,
  contentClassName,
  tokenAddress,
  ...otherProps
}: ButtonProps) => (
  <ButtonWrapper disabled={loading || disabled} type="button" variant={variant} tokenAddress={tokenAddress} {...otherProps} >
    {loading && (
      <div className="mr-2">
        <Spinner variant="small" />
      </div>
    )}

    <span
      className={cn(
        'inline-flex items-center text-inherit color-white',
        variant !== 'primary' && variant !== 'secondary' && 'text-sm',
        contentClassName,
      )}
    >
      {children}
    </span>
  </ButtonWrapper>
);

export const PrimaryButton = (props: ButtonProps) => <Button variant="primary" {...props} />;
export const SecondaryButton = (props: ButtonProps) => <Button variant="secondary" {...props} />;
export const TertiaryButton = (props: ButtonProps) => <Button variant="tertiary" {...props} />;
export const QuaternaryButton = (props: ButtonProps) => <Button variant="quaternary" {...props} />;
export const QuinaryButton = (props: ButtonProps) => <Button variant="quinary" {...props} />;
export const SenaryButton = (props: ButtonProps) => <Button variant="senary" {...props} />;
export const TextButton = (props: ButtonProps) => <Button variant="text" {...props} />;
