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
    const onlyOnePointType = Array.isArray(tokenPoints) && tokenPoints.length === 1;

    if (onlyOnePointType) {
      return <Tooltip
        placement="right"
          title={ 
          <div className="space-y-2">
            <p>{tokenPoints[0].tooltiptext}</p>
            <p>Learn more about this point program: <Link target="_blank" href={tokenPoints[0].tooltipLink} onClick={e => e.stopPropagation()} className="text-white underline">here</Link></p>
            </div>
          }
          className="inline-flex"
        >
          <div className="flex items-center space-x-2 justify-start xl:justify-end lg:justify-end">
          <p>{tokenPoints[0].multiplier}</p>
          <img src={tokenPoints[0].logo} className="w-5 max-w-none flex-none" />
          </div>
        </Tooltip>
    } else {
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
          <Icon name="info" className="text-blue" />
        </Tooltip>
      </div>
            ))
          ) : ( 
            <p>{tokenPoints}</p>
          )}
    </div>}>
      <div className={"flex gap-1 justify-end"}>
      {
        Array.isArray(tokenPoints) ? tokenPoints.map((point, index) => {
          return <div key={index} className="flex items-center space-x-2 justify-start xl:justify-end lg:justify-end">
          <img src={point.logo} className="w-5 max-w-none flex-none" />
          {onlyOnePointType && <p>{point.multiplier}</p>}
          </div>
        }) : <p>{tokenPoints}</p>
      }
      </div>
    </Tooltip>
    }
};