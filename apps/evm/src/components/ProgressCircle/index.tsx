import { useMemo } from 'react';

import { useTheme } from '@mui/material';
import { cn } from 'utilities';

export interface ProgressCircleProps extends React.HTMLAttributes<SVGElement> {
  value: number;
  strokeWidthPx: number;
  sizePx: number;
  fillColor?: string;
  defs?: React.ReactNode;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  fillColor,
  sizePx,
  strokeWidthPx,
  className,
  defs,
  ...otherProps
}) => {
  const theme = useTheme();

  const { circumference, offset } = useMemo(() => {
    const radius = sizePx / 2;

    const tmpCircumference = 2 * Math.PI * radius;
    const tmpOffset = tmpCircumference * ((100 - value) / 100);

    return {

      circumference: tmpCircumference,
      offset: tmpOffset,
    };
  }, [value, sizePx]);

  return (
    <svg
      width={sizePx}
      height={sizePx}

      className={cn('rotate-90 scale-x-[-1]', className)}
      {...otherProps}
    >
      <circle
        stroke="rgba(0,0,0,0.12)"
        strokeWidth={strokeWidthPx}
        fill="transparent"
        r={sizePx / 2 - strokeWidthPx / 2}
        cx="50%"
        cy="50%"
      />

      {defs && <defs>{defs}</defs>}

      <circle
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        stroke={fillColor || theme.palette.interactive.success}
        strokeWidth={strokeWidthPx}
        fill="transparent"
        r={sizePx / 2 - strokeWidthPx / 2}
        cx="50%"
        cy="50%"
      />
    </svg>
  );
};
