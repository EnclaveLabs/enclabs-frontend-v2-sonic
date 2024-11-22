/** @jsxImportSource @emotion/react */
import { Slot } from '@radix-ui/react-slot';
import { cn } from 'utilities';
import { getTokenType } from 'components/Tag';
import { tokenTypeInfo} from 'constants/tokenType';
import { useStyles } from './styles';
import { css } from '@emotion/react';
import { Children } from 'react';

export interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  tokenAddress?: string;
}


export const GradientBorder: React.FC<GradientBorderProps> = (
  { 
    className,  
    tokenAddress = undefined,
    ...otherProps }) => 
  {
    const style = useStyles();

    let tokenType;
    let tokenTypeInfos;
    if(tokenAddress){
      tokenType = getTokenType(tokenAddress!);
      tokenTypeInfos = tokenTypeInfo[tokenType];
    }

    const gradientStyle = style.gradientBorder

    return (
      <div
        // css={gradientStyle}
        className={cn('block w-full rounded-xl p-1 p-[1px] pr-[1.5px]', className)}
        {...otherProps}
      >
        {otherProps.children}
      </div>
    );
};
