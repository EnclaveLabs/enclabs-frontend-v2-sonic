/** @jsxImportSource @emotion/react */
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useTranslation } from 'libs/translations';
import { formatCentsToReadableValue, formatPercentageToReadableValue } from 'utilities';

import TooltipContent from '../TooltipContent';
import { useStyles as useSharedStyles } from '../styles';
import { useStyles as useLocalStyles } from './styles';
import BigNumber from 'bignumber.js';
import type { MarketHistoryPeriodType } from 'clients/api';
import formatToReadableDate from '../ApyChart/formatToReadableDate';

export interface LiquidityItem {
  totalSupply: BigNumber;
  totalLiquidity: BigNumber;
  timestampMs: number;
}

export interface LiquidityChartProps {
  data: LiquidityItem[];
  selectedPeriod: MarketHistoryPeriodType;
  className?: string;
}

export const LiquidityChart: React.FC<LiquidityChartProps> = ({
  className,
  selectedPeriod,
  data,
}) => {
  const sharedStyles = useSharedStyles();
  const localStyles = useLocalStyles();

  const { t } = useTranslation();

  return (
    <div css={sharedStyles.container} className={className}>
      <ResponsiveContainer>
        <LineChart data={data} margin={sharedStyles.chartMargin}>
          <XAxis
            dataKey="timestampMs"
            axisLine={false}
            tickLine={false}
            tickFormatter={value => formatToReadableDate(value)}
            stroke={sharedStyles.accessoryColor}
            tickMargin={sharedStyles.tickMargin}
            tickCount={data.length}
            interval={data.length < 5 ? 5 : data.length}
            style={sharedStyles.axis}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={value => formatCentsToReadableValue({value})}
            tickMargin={sharedStyles.tickMargin}
            stroke={sharedStyles.accessoryColor}
            style={sharedStyles.axis}
            tickCount={10}
          />
          {/* <Tooltip
            isAnimationActive={false}
            cursor={sharedStyles.cursor}
            content={({ payload }) =>
              payload?.[0] ? (
                <TooltipContent
                  items={[
                    {
                      label: t('interestRateChart.tooltipItemLabels.utilizationRate'),
                      value: formatPercentageToReadableValue(
                        (payload[0].payload as InterestRateItem).utilizationRatePercentage,
                      ),
                    },
                    {
                      label: t('interestRateChart.tooltipItemLabels.borrowApy'),
                      value: formatPercentageToReadableValue(
                        (payload[0].payload as InterestRateItem).borrowApyPercentage,
                      ),
                    },
                    {
                      label: t('interestRateChart.tooltipItemLabels.supplyApy'),
                      value: formatPercentageToReadableValue(
                        (payload[0].payload as InterestRateItem).supplyApyPercentage,
                      ),
                    },
                  ]}
                />
              ) : null
            }
          /> */}
          <CartesianGrid vertical={false} stroke={sharedStyles.gridLineColor} />
          <Line
            type="monotone"
            dataKey="totalSupply"
            stroke={localStyles.lineSupplyApyColor}
            strokeWidth={sharedStyles.lineStrokeWidth}
            isAnimationActive={false}
            activeDot={localStyles.lineActiveDot}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="totalLiquidity"
            stroke={localStyles.lineLiquidityApyColor}
            strokeWidth={sharedStyles.lineStrokeWidth}
            activeDot={localStyles.lineActiveDot}
            isAnimationActive={false}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
