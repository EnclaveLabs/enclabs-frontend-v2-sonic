/** @jsxImportSource @emotion/react */
import { pointType } from "../../constants/points";
import { PointsProps } from './types';
import { pointTypeInfo } from 'constants/points';
import { Icon, Tooltip } from 'components';
import { Link } from 'containers/Link';


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

    return <Tooltip placement="right" title={<div className="flex flex-col gap-1"> 
          {Array.isArray(tokenPoints) ? (
            tokenPoints.map((point, index) => (
              <div key={index} className="flex items-center space-x-2 justify-start xl:justify-end lg:justify-end">     
          <p>{point.multiplier}</p>
          <img src={point.logo} className="w-5 max-w-none flex-none" />
        
        <Tooltip
        placement="right"
          title={ 
          <div className="space-y-2">
            <p>{point.tooltiptext}</p>
            <p>Learn more about this point program: <Link target="_blank" href={point.tooltipLink} onClick={e => e.stopPropagation()} className="text-white underline">here</Link></p>
            </div>
          }
          className="inline-flex"
        >
          <Icon name="info" className="text-white" />
        </Tooltip>
      </div>
            ))
          ) : ( 
            <p>{tokenPoints}</p>
          )}
    </div>}>
      <div className={"flex gap-1 justify-start lg:justify-end"}>
      {
        Array.isArray(tokenPoints) ? tokenPoints.map((point, index) => {
          return <div key={index} className="flex items-center space-x-2 justify-start xl:justify-end lg:justify-end">
          <img src={point.logo} className="w-4 max-w-none flex-none" />
          </div>
        }) : <p>{tokenPoints}</p>
      }
      </div>
    </Tooltip>
};