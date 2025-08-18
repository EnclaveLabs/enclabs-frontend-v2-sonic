/** @jsxImportSource @emotion/react */
import {
  CartesianGrid,
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useUID } from "react-uid";
import { useTranslation } from "libs/translations";
import {
  formatCentsToReadableValue,
  formatPercentageToReadableValue,
  shortenValueWithSuffix,
} from "utilities";

import TooltipContent from "../TooltipContent";
import { useStyles as useSharedStyles } from "../styles";
import { useStyles as useLocalStyles } from "./styles";
import BigNumber from "bignumber.js";
import type { MarketHistoryPeriodType } from "clients/api";
import formatToReadableDate from "../ApyChart/formatToReadableDate";
import { format as formatDate } from "date-fns/format";

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

interface ConvertedLiquidityItem {
  totalSupply: number;
  totalLiquidity: number;
  timestampMs: number;
}

function convertLiquidityItems(
  data: LiquidityItem[]
): ConvertedLiquidityItem[] {
  return data.map((item) => ({
    totalSupply: item.totalSupply.toNumber(),
    totalLiquidity: item.totalLiquidity.toNumber(),
    timestampMs: item.timestampMs,
  }));
}

export const LiquidityChart: React.FC<LiquidityChartProps> = ({
  className,
  selectedPeriod,
  data,
}) => {
  const sharedStyles = useSharedStyles();
  const localStyles = useLocalStyles();

  const supplyBaseId = useUID();
  const supplyGradientId = `gradient-${supplyBaseId}`;
  const supplyChartColor = localStyles.lineSupplyApyColor;

  const liquidityBaseId = useUID();
  const liquidityGradientId = `gradient-${liquidityBaseId}`;
  const liquidityChartColor = localStyles.lineLiquidityApyColor;

  const { t } = useTranslation();

  const convertedNumberData = convertLiquidityItems(data);

  // Average reference lines intentionally not shown for liquidity metrics per product requirement

  return (
    <div css={sharedStyles.container} className={className}>
      <ResponsiveContainer>
        <AreaChart margin={sharedStyles.chartMargin} data={convertedNumberData}>
          {/* Gradient used as filler */}
          <defs>
            <linearGradient id={supplyGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={supplyChartColor}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={supplyChartColor}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient
              id={liquidityGradientId}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={liquidityChartColor}
                stopOpacity={0.8}
              />
              <stop
                offset="100%"
                stopColor={liquidityChartColor}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="timestampMs"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatDate(new Date(value), "dd.MM")}
            stroke={sharedStyles.accessoryColor}
            tickMargin={sharedStyles.tickMargin}
            style={sharedStyles.axis}
            tickCount={5}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) =>
              shortenValueWithSuffix({ value: new BigNumber(value) })
            }
            tickMargin={sharedStyles.tickMargin}
            stroke={sharedStyles.accessoryColor}
            style={sharedStyles.axis}
            tickCount={6}
          />
          {/* No average ReferenceLines for liquidity charts */}
          <Tooltip
            isAnimationActive={false}
            cursor={sharedStyles.cursor}
            content={({ payload }) =>
              payload?.[0] ? (
                <TooltipContent
                  items={[
                    {
                      label: t("liquidityChart.tooltipItemLabels.totalSupply"),
                      value: (payload[0].payload as LiquidityItem).totalSupply
                        .toFixed(2)
                        .toString(),
                    },
                    {
                      label: t(
                        "liquidityChart.tooltipItemLabels.totalLiquidity"
                      ),
                      value: (
                        payload[0].payload as LiquidityItem
                      ).totalLiquidity
                        .toFixed(2)
                        .toString(),
                    },
                    {
                      label: t("liquidityChart.tooltipItemLabels.date"),
                      value: formatToReadableDate(
                        (payload[0].payload as LiquidityItem).timestampMs
                      ),
                    },
                  ]}
                />
              ) : null
            }
          />

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

          <Area
            isAnimationActive={false}
            dataKey="totalSupply"
            stroke={supplyChartColor}
            strokeWidth={sharedStyles.lineStrokeWidth}
            fillOpacity={1}
            fill={`url(#${supplyGradientId})`}
            activeDot={localStyles.areaActiveDot}
          />
          <Area
            isAnimationActive={false}
            dataKey="totalLiquidity"
            stroke={liquidityChartColor}
            strokeWidth={sharedStyles.lineStrokeWidth}
            fillOpacity={1}
            fill={`url(#${liquidityGradientId})`}
            activeDot={localStyles.areaActiveDot}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
