/** @jsxImportSource @emotion/react */
import { pointType } from "../../constants/points";
import { pointTypeInfo } from 'constants/points';
import { Icon, Tooltip } from 'components';
import { Link } from 'containers/Link';

interface PointsProps {
  address: string;
  iconSize?: number;
  displayMultiplier?: boolean;
}


export const getTokenPoints = (address: string) => {
    const pointsTypeInfos = [];
  for (const [category, addresses] of Object.entries(pointType)) {
      if (addresses.map(a => a.toLocaleLowerCase()).includes(address?.toLowerCase())) {
        pointsTypeInfos.push(pointTypeInfo[category]);   
      }
    }
    return pointsTypeInfos.length > 0 ? pointsTypeInfos : ''; 
  };

const ProgramDetails = ({point}: {point: ReturnType<typeof getTokenPoints>}) => {
  return 
}

export const Points = ({ address, iconSize = 5, displayMultiplier }: PointsProps) => {
    const tokenPoints = getTokenPoints(address);

    if (displayMultiplier) {
      return <div className="flex gap-2"> 
          {Array.isArray(tokenPoints) ? (
            tokenPoints.map((point, index) => (
        <Tooltip
        placement="top"
          title={ 
          <div className="space-y-2">
            <p className='text-white'>{point.tooltiptext}</p>
            <p className='text-white'>Learn more about this point program: <Link target="_blank" href={point.tooltipLink} onClick={e => e.stopPropagation()} className="text-white underline">here</Link></p>
            </div>
          }
          className="inline-flex"
        >
             <div key={index} className="flex items-center space-x-2 justify-start xl:justify-end lg:justify-end">     
          <p className='text-'>{point.multiplier}</p>
          <img src={point.logo} className={`w-${iconSize} max-w-none flex-none`} />
          </div>
        </Tooltip>
))) : ( 
            <p>{tokenPoints}</p>
          )
        }
      </div>
    }

    return <Tooltip placement="right" title={<div className="flex flex-col gap-1"> 
          {Array.isArray(tokenPoints) ? (
            tokenPoints.map((point, index) => (
              <div key={index} className="flex items-center space-x-2 justify-start xl:justify-end lg:justify-end">     
          <p className='text-white'>{point.multiplier}</p>
          <img src={point.logo} className={`w-${iconSize} max-w-none flex-none`} />
        
        <Tooltip
        placement="right"
          title={ 
          <div className="space-y-2">
            <p className='text-white'>{point.tooltiptext}</p>
            <p className='text-white'>Learn more about this point program: <Link target="_blank" href={point.tooltipLink} onClick={e => e.stopPropagation()} className="text-white underline">here</Link></p>
            </div>
          }
          className="inline-flex"
        >
          <Icon name="info" className="reverse-color" />
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
          <img src={point.logo} className={`w-${iconSize - 1} max-w-none flex-none`} />
          </div>
        }) : <p>{tokenPoints}</p>
      }
      </div>
    </Tooltip>
};