/** @jsxImportSource @emotion/react */
import { pointType } from "../../constants/points";
import { PointsProps } from './types';
import { pointTypeInfo } from 'constants/points';


export const getTokenPoints = (address: string) => {
    const pointsTypeInfos = [];
  for (const [category, addresses] of Object.entries(pointType)) {
      if (addresses.map(a => a.toLocaleLowerCase()).includes(address?.toLowerCase())) {
        pointsTypeInfos.push(pointTypeInfo[category]);   
      }
    }
    return pointsTypeInfos.length > 0 ? pointsTypeInfos : ''; 
  };

export const Points = ({ text }: PointsProps) => {
    const tokenPoints = getTokenPoints(text);
    
    return (
        <div> 
          {Array.isArray(tokenPoints) ? (
            tokenPoints.map((point, index) => (
              <div key={index} className="flex items-center space-x-2 justify-start xl:justify-end lg:justify-end">  
               <p>{point.multiplier}</p>
                <img src={point.logo} className="w-5 max-w-none flex-none" />
              </div>
            ))
          ) : (
          
            <p>{tokenPoints}</p>
          )}
        </div>
      );
};