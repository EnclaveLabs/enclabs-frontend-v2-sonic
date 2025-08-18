/** @jsxImportSource @emotion/react */
import type BigNumber from "bignumber.js";
import { useUID } from "react-uid";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTranslation } from "libs/translations";
import {
  formatCentsToReadableValue,
  formatPercentageToReadableValue,
} from "utilities";

import type { MarketHistoryPeriodType } from "clients/api";
import TooltipContent from "../TooltipContent";
import { useStyles as useSharedStyles } from "../styles";
import formatToReadableDate from "./formatToReadableDate";
import { useStyles as useLocalStyles } from "./styles";
import { format as formatDate } from "date-fns/format";

export interface ApyChartItem {
  apyPercentage: number;
  timestampMs: number;
  balanceCents: BigNumber;
}

export interface ApyChartProps {
  data: ApyChartItem[];
  type: "supply" | "borrow";
  selectedPeriod: MarketHistoryPeriodType;
  className?: string;
}

export const ApyChart: React.FC<ApyChartProps> = ({
  className,
  data,
  type,
  selectedPeriod,
}) => {
  const sharedStyles = useSharedStyles();
  const localStyles = useLocalStyles();

  const chartColor =
    type === "supply"
      ? localStyles.supplyChartColor
      : localStyles.borrowChartColor;
  const { t } = useTranslation();

  // Generate base ID that won't change between renders but will be incremented
  // automatically every time it is used (so multiple charts can be rendered
  // using unique ids)
  const baseId = useUID();
  const gradientId = `gradient-${baseId}`;

  const average = data.length
    ? data.reduce((sum, item) => sum + item.apyPercentage, 0) / data.length
    : undefined;

  return (
    <div css={sharedStyles.container} className={className}>
      <ResponsiveContainer>
        <AreaChart margin={sharedStyles.chartMargin} data={data}>
          {/* Gradient used as filler */}
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColor} stopOpacity={0.6} />
              <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke={sharedStyles.gridLineColor} />

          <XAxis
            dataKey="timestampMs"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatDate(new Date(value), "dd.MM")}
            stroke={sharedStyles.accessoryColor}
            tickMargin={sharedStyles.tickMargin}
            style={sharedStyles.axis}
          />
          <YAxis
            dataKey="apyPercentage"
            axisLine={false}
            tickLine={false}
            tickFormatter={formatPercentageToReadableValue}
            tickMargin={sharedStyles.tickMargin}
            tickCount={6}
            stroke={sharedStyles.accessoryColor}
            style={sharedStyles.axis}
          />
          <Tooltip
            isAnimationActive={false}
            cursor={sharedStyles.cursor}
            content={({ payload }) =>
              payload?.[0] ? (
                <TooltipContent
                  items={[
                    {
                      label: t("apyChart.tooltipItemLabels.date"),
                      value: formatToReadableDate(
                        (payload[0].payload as ApyChartItem).timestampMs,
                        selectedPeriod
                      ),
                    },
                    {
                      label:
                        type === "supply"
                          ? t("apyChart.tooltipItemLabels.supplyApy")
                          : t("apyChart.tooltipItemLabels.borrowApy"),
                      value: formatPercentageToReadableValue(
                        (payload[0].payload as ApyChartItem).apyPercentage
                      ),
                    },
                    {
                      label:
                        type === "supply"
                          ? t("apyChart.tooltipItemLabels.totalSupply")
                          : t("apyChart.tooltipItemLabels.totalBorrow"),
                      value: formatCentsToReadableValue({
                        value: (payload[0].payload as ApyChartItem)
                          .balanceCents,
                      }),
                    },
                  ]}
                />
              ) : null
            }
          />
          <Area
            isAnimationActive={false}
            dataKey="apyPercentage"
            stroke={chartColor}
            strokeWidth={sharedStyles.lineStrokeWidth}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            activeDot={localStyles.areaActiveDot}
          />
          {typeof average === "number" && (
            <ReferenceLine
              y={average}
              stroke={localStyles.referenceLineColor}
              strokeWidth={2}
              strokeDasharray="6 4"
              label={({ viewBox }) => {
                const yCoord = (viewBox as any)?.y ?? 0;
                // Push bubble to the right to avoid overlapping Y-axis ticks
                const xCoord = 56;
                const bubblePaddingX = 6;
                const bubblePaddingY = 4;
                const text = `Avg: ${formatPercentageToReadableValue(average)}`;
                const fontSize = 12;
                const fontWeight = 500;
                // Measure text width safely; fallback to an estimate
                let textWidth = text.length * 7;
                try {
                  if (typeof document !== "undefined") {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                      ctx.font = `${fontWeight} ${fontSize}px sans-serif`;
                      textWidth = ctx.measureText(text).width;
                    }
                  }
                } catch (e) {
                  // ignore
                }
                const bubbleWidth = Math.ceil(textWidth + bubblePaddingX * 2);
                const bubbleHeight = Math.ceil(fontSize + bubblePaddingY * 2);
                const rx = 8;
                return (
                  <g
                    transform={`translate(${xCoord}, ${
                      yCoord - bubbleHeight - 6
                    })`}
                  >
                    <rect
                      width={bubbleWidth}
                      height={bubbleHeight}
                      rx={rx}
                      ry={rx}
                      fill={localStyles.bubble.backgroundFill}
                      stroke={localStyles.bubble.borderStroke}
                    />
                    <text
                      x={bubbleWidth / 2}
                      y={bubbleHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={localStyles.bubble.textFill}
                      fontSize={fontSize}
                      fontWeight={fontWeight}
                    >
                      {text}
                    </text>
                  </g>
                );
              }}
              isFront
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SupplyApyChart: React.FC<Omit<ApyChartProps, "type">> = (
  props
) => <ApyChart type="supply" {...props} />;
export const BorrowApyChart: React.FC<Omit<ApyChartProps, "type">> = (
  props
) => <ApyChart type="borrow" {...props} />;
