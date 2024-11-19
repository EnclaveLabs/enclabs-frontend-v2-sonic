/** @jsxImportSource @emotion/react */
import { tokenType } from "../../constants/tokenType";
import { TagProps } from './types';
import { tokenTypeInfo } from 'constants/tokenType';


export const getTokenType = (address: string) : string => {
    for (const [category, addresses] of Object.entries(tokenType)) {
      if (addresses.map(a => a.toLocaleLowerCase()).includes(address.toLowerCase())) {
        return category;
      }
    }
    return 'Unknown'; 
  };

export const Tag = ({ text }: TagProps) => {

    const tokenType = getTokenType(text);
    const tokenTypeStyle = tokenTypeInfo[tokenType];

    return (
        <div className="flex items-center space-x-2 justify-end">
            <p
                style={{
                    color: tokenTypeStyle.color,
                    borderColor: tokenTypeStyle.borderColor,
                    backgroundColor: tokenTypeStyle.backgroundColor,
                    border: `0px solid ${tokenTypeStyle.borderColor}`,
                    borderRadius: '8px',
                    padding: '4px 8px',
                }}
            >{getTokenType(text)}</p>
        </div>
    );
};