/** @jsxImportSource @emotion/react */
import { TertiaryButton } from '../Button';
import { useStyles } from './styles';

export interface ButtonGroupProps {
  buttonLabels: string[];
  activeButtonIndex: number;
  onButtonClick: (newIndex: number) => void;
  fullWidth?: boolean;
  className?: string;
  tokenAddress?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttonLabels,
  activeButtonIndex = 0,
  onButtonClick,
  fullWidth = false,
  className,
  tokenAddress = '',
}) => {
  const styles = useStyles();

  return (
    <div css={styles.getContainer({ fullWidth })} className={className}>
      {
        buttonLabels.map((label, index) => 
        {
          if(tokenAddress == ''){
            className = index === activeButtonIndex ? 
              'bg-primary text-white':
              '';
          }

          return (
            <TertiaryButton
              key={`button-group-button-${label}`}
              onClick={() => onButtonClick(index)}
              css={styles.getButton({
                active: index === activeButtonIndex,
                last: index === buttonLabels.length - 1,
                fullWidth,
              })}
              tokenAddress={tokenAddress}
              className={className}
            >
              {label}
            </TertiaryButton>
          )
        })
      }
    </div>
  );
};
