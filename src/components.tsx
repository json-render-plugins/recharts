"use client";

import {
  ComposedChart,
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  ScatterChart as RechartsScatterChart,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Line,
  Area,
  Bar,
  Pie,
  Scatter,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { RechartsProps } from "./catalog";
import type { BaseComponentProps } from "@json-render/react";

// =============================================================================
// Constants & Helpers
// =============================================================================

const DEFAULT_COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
];

function getColor(color: string | undefined, index: number): string {
  return color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length] ?? "#8884d8";
}

function getStrokeDasharray(type?: "solid" | "dashed" | "dotted"): string | undefined {
  if (type === "dashed") return "5 5";
  if (type === "dotted") return "1 5";
  return undefined;
}

function getDot(
  symbol?: string,
  symbolSize?: number
): boolean | { r: number } {
  if (symbol === "none") return false;
  if (symbolSize !== undefined) return { r: symbolSize / 2 };
  return true;
}

function getLegendProps(position?: "top" | "bottom" | "left" | "right") {
  switch (position) {
    case "top":
      return { verticalAlign: "top" as const, align: "center" as const };
    case "bottom":
      return { verticalAlign: "bottom" as const, align: "center" as const };
    case "left":
      return {
        layout: "vertical" as const,
        verticalAlign: "middle" as const,
        align: "left" as const,
      };
    case "right":
      return {
        layout: "vertical" as const,
        verticalAlign: "middle" as const,
        align: "right" as const,
      };
    default:
      return { verticalAlign: "top" as const, align: "center" as const };
  }
}

/** Convert xAxisData + series arrays into the recharts row-per-point format */
function buildChartData(
  xAxisData: (string | number)[],
  series: { name: string; data: (number | null)[] }[]
): Record<string, string | number | null>[] {
  return xAxisData.map((x, i) => {
    const point: Record<string, string | number | null> = { __x: x };
    series.forEach((s) => {
      point[s.name] = s.data[i] ?? null;
    });
    return point;
  });
}

// =============================================================================
// Recharts Component Implementations
// =============================================================================

/**
 * Recharts component implementations for json-render.
 *
 * Pass to `defineRegistry()` from `@json-render/react` to create a
 * component registry for rendering JSON specs with Recharts charts.
 *
 * @example
 * ```ts
 * import { defineRegistry } from "@json-render/react";
 * import { rechartsComponents } from "@json-render-plugins/recharts";
 *
 * const { registry } = defineRegistry(catalog, {
 *   components: {
 *     LineChart: rechartsComponents.LineChart,
 *     PieChart: rechartsComponents.PieChart,
 *     BarChart: rechartsComponents.BarChart,
 *   },
 * });
 * ```
 */
export const rechartsComponents = {
  // ==========================================================================
  // Line Chart
  // ==========================================================================

  LineChart: ({
    props,
    emit,
  }: BaseComponentProps<RechartsProps<"LineChart">>) => {
    // 如果数据为空，不渲染
    if (!props.xAxisData || props.xAxisData.length === 0 || !props.series || props.series.length === 0) {
      return null;
    }

    const data = buildChartData(props.xAxisData, props.series);
    const showGrid = props.showGrid !== false;
    const hasArea = props.series.some((s) => s.areaStyle);

    const legendProps = getLegendProps(props.legendPosition);

    return (
      <ResponsiveContainer width="100%" aspect={1.618}>
        <ComposedChart
          data={data}
          margin={props.margin}
          onClick={() => emit("click")}
        >
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {props.showXAxis !== false && (
              <XAxis
                dataKey="__x"
                label={
                  props.xAxisName
                    ? { value: props.xAxisName, position: "insideBottom", offset: -5 }
                    : undefined
                }
              />
            )}
            {props.showYAxis !== false && (
              <YAxis
                label={
                  props.yAxisName
                    ? { value: props.yAxisName, angle: -90, position: "insideLeft" }
                    : undefined
                }
              />
            )}
            {props.showTooltip !== false && <Tooltip />}
            {props.showLegend !== false && props.series.length > 1 && (
              <Legend {...legendProps} onClick={() => emit("legendClick")} />
            )}
            {props.series.map((s, i) => {
              const color = getColor(s.color, i);
              const lineType = s.smooth ? "monotone" : "linear";
              const dot = getDot(s.symbol, s.symbolSize);
              const strokeDasharray = getStrokeDasharray(s.lineStyle?.type);
              const strokeWidth = s.lineStyle?.width ?? 2;

              if (s.areaStyle) {
                return (
                  <Area
                    key={s.name}
                    type={lineType}
                    dataKey={s.name}
                    stroke={color}
                    fill={color}
                    fillOpacity={0.2}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    dot={dot}
                    isAnimationActive={props.animation !== false}
                    animationDuration={props.animationDuration ?? 1000}
                  />
                );
              }

              return (
                <Line
                  key={s.name}
                  type={lineType}
                  dataKey={s.name}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  dot={dot}
                  isAnimationActive={props.animation !== false}
                  animationDuration={props.animationDuration ?? 1000}
                />
              );
            })}
        </ComposedChart>
      </ResponsiveContainer>
    );
  },

  // ==========================================================================
  // Pie Chart
  // ==========================================================================

  PieChart: ({
    props,
    emit,
  }: BaseComponentProps<RechartsProps<"PieChart">>) => {
    const legendProps = getLegendProps(props.legendPosition);

    // 如果数据为空或没有数据项，不渲染
    if (!props.data || props.data.length === 0) {
      return null;
    }

    return (
      <ResponsiveContainer width="100%" aspect={1.618}>
        <RechartsPieChart
          margin={props.margin}
          onClick={() => emit("click")}
        >
            {props.showTooltip !== false && <Tooltip />}
            {props.showLegend !== false && (
              <Legend {...legendProps} onClick={() => emit("legendClick")} />
            )}
            <Pie
              data={props.data}
              dataKey="value"
              nameKey="name"
              cx={props.cx ?? "50%"}
              cy={props.cy ?? "50%"}
              innerRadius={props.innerRadius ?? 0}
              outerRadius={props.outerRadius ?? "50%"}
              label={props.showLabel !== false}
              isAnimationActive={props.animation !== false}
              animationDuration={props.animationDuration ?? 1000}
            >
              {props.data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColor(entry.color, index)}
                />
              ))}
            </Pie>
          </RechartsPieChart>
      </ResponsiveContainer>
    );
  },

  // ==========================================================================
  // Bar Chart
  // ==========================================================================

  BarChart: ({
    props,
    emit,
  }: BaseComponentProps<RechartsProps<"BarChart">>) => {
    // 如果数据为空，不渲染
    if (!props.xAxisData || props.xAxisData.length === 0 || !props.series || props.series.length === 0) {
      return null;
    }

    const data = buildChartData(props.xAxisData, props.series);
    const isHorizontal = props.horizontal === true;
    const showGrid = props.showGrid !== false;
    const legendProps = getLegendProps(props.legendPosition);

    return (
      <ResponsiveContainer width="100%" aspect={1.618}>
        <RechartsBarChart
          data={data}
          margin={props.margin}
          layout={isHorizontal ? "vertical" : "horizontal"}
          onClick={() => emit("click")}
        >
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {isHorizontal ? (
              <>
                <XAxis
                  type="number"
                  label={
                    props.yAxisName
                      ? { value: props.yAxisName, position: "insideBottom", offset: -5 }
                      : undefined
                  }
                  hide={props.showXAxis === false}
                />
                <YAxis
                  type="category"
                  dataKey="__x"
                  label={
                    props.xAxisName
                      ? { value: props.xAxisName, angle: -90, position: "insideLeft" }
                      : undefined
                  }
                  hide={props.showYAxis === false}
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey="__x"
                  label={
                    props.xAxisName
                      ? { value: props.xAxisName, position: "insideBottom", offset: -5 }
                      : undefined
                  }
                  hide={props.showXAxis === false}
                />
                <YAxis
                  label={
                    props.yAxisName
                      ? { value: props.yAxisName, angle: -90, position: "insideLeft" }
                      : undefined
                  }
                  hide={props.showYAxis === false}
                />
              </>
            )}
            {props.showTooltip !== false && <Tooltip />}
            {props.showLegend !== false && props.series.length > 1 && (
              <Legend {...legendProps} onClick={() => emit("legendClick")} />
            )}
            {props.series.map((s, i) => {
              const color = getColor(s.color, i);
              const background = s.background
                ? { fill: s.backgroundColor ?? "#f5f5f5" }
                : undefined;

              return (
                <Bar
                  key={s.name}
                  dataKey={s.name}
                  fill={color}
                  stackId={s.stack}
                  barSize={s.barSize}
                  maxBarSize={s.maxBarSize}
                  background={background}
                  isAnimationActive={props.animation !== false}
                  animationDuration={props.animationDuration ?? 1000}
                />
              );
            })}
          </RechartsBarChart>
      </ResponsiveContainer>
    );
  },

  // ==========================================================================
  // Area Chart
  // ==========================================================================

  AreaChart: ({
    props,
    emit,
  }: BaseComponentProps<RechartsProps<"AreaChart">>) => {
    // 如果数据为空，不渲染
    if (!props.xAxisData || props.xAxisData.length === 0 || !props.series || props.series.length === 0) {
      return null;
    }

    const data = buildChartData(props.xAxisData, props.series);
    const showGrid = props.showGrid !== false;
    const legendProps = getLegendProps(props.legendPosition);

    return (
      <ResponsiveContainer width="100%" aspect={1.618}>
        <RechartsAreaChart
          data={data}
          margin={props.margin}
          onClick={() => emit("click")}
        >
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {props.showXAxis !== false && (
              <XAxis
                dataKey="__x"
                label={
                  props.xAxisName
                    ? { value: props.xAxisName, position: "insideBottom", offset: -5 }
                    : undefined
                }
              />
            )}
            {props.showYAxis !== false && (
              <YAxis
                label={
                  props.yAxisName
                    ? { value: props.yAxisName, angle: -90, position: "insideLeft" }
                    : undefined
                }
              />
            )}
            {props.showTooltip !== false && <Tooltip />}
            {props.showLegend !== false && props.series.length > 1 && (
              <Legend {...legendProps} onClick={() => emit("legendClick")} />
            )}
            {props.series.map((s, i) => {
              const color = getColor(s.color, i);
              const lineType = s.smooth ? "monotone" : "linear";

              return (
                <Area
                  key={s.name}
                  type={lineType}
                  dataKey={s.name}
                  stroke={color}
                  fill={color}
                  fillOpacity={s.fillOpacity ?? 0.6}
                  stackId={s.stackId}
                  isAnimationActive={props.animation !== false}
                  animationDuration={props.animationDuration ?? 1000}
                />
              );
            })}
          </RechartsAreaChart>
      </ResponsiveContainer>
    );
  },

  // ==========================================================================
  // Scatter Chart
  // ==========================================================================

  ScatterChart: ({
    props,
    emit,
  }: BaseComponentProps<RechartsProps<"ScatterChart">>) => {
    const showGrid = props.showGrid !== false;
    const legendProps = getLegendProps(props.legendPosition);

    // 如果数据为空，不渲染
    if (!props.series || props.series.length === 0) {
      return null;
    }

    return (
      <ResponsiveContainer width="100%" aspect={1.618}>
        <RechartsScatterChart
          margin={props.margin}
          onClick={() => emit("click")}
        >
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {props.showXAxis !== false && (
              <XAxis
                type="number"
                dataKey="x"
                name="x"
                label={
                  props.xAxisName
                    ? { value: props.xAxisName, position: "insideBottom", offset: -5 }
                    : undefined
                }
              />
            )}
            {props.showYAxis !== false && (
              <YAxis
                type="number"
                dataKey="y"
                name="y"
                label={
                  props.yAxisName
                    ? { value: props.yAxisName, angle: -90, position: "insideLeft" }
                    : undefined
                }
              />
            )}
            <ZAxis type="number" dataKey="z" range={[60, 400]} />
            {props.showTooltip !== false && <Tooltip cursor={{ strokeDasharray: "3 3" }} />}
            {props.showLegend !== false && (
              <Legend {...legendProps} onClick={() => emit("legendClick")} />
            )}
            {props.series.map((s, i) => {
              const color = getColor(s.color, i);
              return (
                <Scatter
                  key={s.name}
                  name={s.name}
                  data={s.data}
                  fill={color}
                  isAnimationActive={props.animation !== false}
                  animationDuration={props.animationDuration ?? 1000}
                />
              );
            })}
          </RechartsScatterChart>
      </ResponsiveContainer>
    );
  },

  // ==========================================================================
  // Radar Chart
  // ==========================================================================

  RadarChart: ({
    props,
    emit,
  }: BaseComponentProps<RechartsProps<"RadarChart">>) => {
    const legendProps = getLegendProps(props.legendPosition);

    // 如果数据为空，不渲染
    if (!props.data || props.data.length === 0 || !props.series || props.series.length === 0) {
      return null;
    }

    return (
      <ResponsiveContainer width="100%" aspect={1.618}>
        <RechartsRadarChart
          data={props.data}
          margin={props.margin}
          onClick={() => emit("click")}
        >
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            {props.showTooltip !== false && <Tooltip />}
            {props.showLegend !== false && (
              <Legend {...legendProps} onClick={() => emit("legendClick")} />
            )}
            {props.series.map((s, i) => {
              const color = getColor(s.color, i);
              return (
                <Radar
                  key={s.name}
                  name={s.name}
                  dataKey={s.dataKey}
                  stroke={color}
                  fill={color}
                  fillOpacity={s.fillOpacity ?? 0.6}
                  isAnimationActive={props.animation !== false}
                  animationDuration={props.animationDuration ?? 1000}
                />
              );
            })}
          </RechartsRadarChart>
      </ResponsiveContainer>
    );
  },
};
