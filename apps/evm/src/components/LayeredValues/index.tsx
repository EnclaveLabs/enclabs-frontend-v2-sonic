export interface LayeredValuesProps {
  topValue: string | number;
  bottomValue: string | number;
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
    <p className={className}>{topValue}</p>
    <p className={classNameBottomValue}>{bottomValue}</p>
  </div>
);

export default LayeredValues;
