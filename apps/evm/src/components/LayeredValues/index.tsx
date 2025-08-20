import EllipsisText from "components/EllipsisText";

export interface LayeredValuesProps {
  topValue: string | number;
  bottomValue?: string | number;
  className?: string;
  classNameBottomValue?: string;
}

export const LayeredValues: React.FC<LayeredValuesProps> = ({
  topValue,
  bottomValue,
  className,
  classNameBottomValue = 'text-blue'
}) => (
  <div >
    <EllipsisText className={className}>{topValue}</EllipsisText>
    {bottomValue && <p className={classNameBottomValue}>{bottomValue}</p>}
  </div>
);

export default LayeredValues;
