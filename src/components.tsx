"use client";

import { useEffect, useRef } from "react";
import echarts from "echarts";
import type { EChartsProps } from "./catalog";
import type { BaseComponentProps } from "@json-render/react";

// =============================================================================
// Helper Functions
// =============================================================================

function getLegendPosition(position?: "top" | "bottom" | "left" | "right") {
  switch (position) {
    case "top":
      return { top: "top" };
    case "bottom":
      return { bottom: "bottom" };
    case "left":
      return { left: "left", orient: "vertical" as const };
    case "right":
      return { right: "right", orient: "vertical" as const };
    default:
      return { top: "top" };
  }
}

function parseSize(size: number | string | undefined): number | string {
  if (typeof size === "number") {
    return size;
  }
  return size ?? "auto";
}

// =============================================================================
// ECharts Component Implementations
// =============================================================================

/**
 * ECharts component implementations for json-render.
 *
 * Pass to `defineRegistry()` from `@json-render/react` to create a
 * component registry for rendering JSON specs with ECharts charts.
 *
 * @example
 * ```ts
 * import { defineRegistry } from "@json-render/react";
 * import { echartsComponents } from "@json-render/echarts";
 *
 * const { registry } = defineRegistry(catalog, {
 *   components: {
 *     LineChart: echartsComponents.LineChart,
 *     PieChart: echartsComponents.PieChart,
 *     BarChart: echartsComponents.BarChart,
 *   },
 * });
 * ```
 */
export const echartsComponents = {
  // ==========================================================================
  // Line Chart
  // ==========================================================================

  LineChart: ({
    props,
    emit,
  }: BaseComponentProps<EChartsProps<"LineChart">>) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
      if (!chartRef.current) return;

      // Initialize chart with SVG renderer
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current, undefined, {
          renderer: "svg",
        });
      }

      const chart = chartInstance.current;

      // Build series configuration
      const seriesData = props.series.map((s) => ({
        name: s.name,
        type: "line" as const,
        data: s.data,
        smooth: s.smooth ?? false,
        itemStyle: s.color ? { color: s.color } : undefined,
        areaStyle: s.areaStyle ? {} : undefined,
        symbol: s.symbol ?? "circle",
        symbolSize: s.symbolSize ?? 4,
        lineStyle: s.lineStyle
          ? {
              width: s.lineStyle.width,
              type: s.lineStyle.type,
            }
          : undefined,
      }));

      // Build option
      const option: echarts.EChartsOption = {
        title: props.title
          ? {
              text: props.title,
              subtext: props.titleSubtext,
              left: "center",
            }
          : undefined,
        tooltip: props.showTooltip !== false
          ? {
              trigger: "axis",
            }
          : undefined,
        legend:
          props.showLegend !== false && seriesData.length > 1
            ? {
                ...getLegendPosition(props.legendPosition),
                data: seriesData.map((s) => s.name),
              }
            : undefined,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: props.gridContainLabel !== false,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: props.xAxisData,
          name: props.xAxisName,
          show: props.showXAxis !== false,
          axisLine: {
            show: props.showXAxisLine !== false,
          },
        },
        yAxis: {
          type: "value",
          name: props.yAxisName,
          show: props.showYAxis !== false,
          axisLine: {
            show: props.showYAxisLine !== false,
          },
        },
        series: seriesData,
        animation: props.animation !== false,
        animationDuration: props.animationDuration ?? 1000,
      };

      chart.setOption(option, true);

      // Handle resize
      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);

      // Event handlers
      chart.on("click", () => {
        emit("click");
      });

      chart.on("legendselectchanged", () => {
        emit("legendselectchanged");
      });

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [props, emit]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        chartInstance.current?.dispose();
        chartInstance.current = null;
      };
    }, []);

    return (
      <div
        ref={chartRef}
        style={{
          width: parseSize(props.width ?? "100%"),
          height: parseSize(props.height ?? 400),
        }}
      />
    );
  },

  // ==========================================================================
  // Pie Chart
  // ==========================================================================

  PieChart: ({
    props,
    emit,
  }: BaseComponentProps<EChartsProps<"PieChart">>) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
      if (!chartRef.current) return;

      // Initialize chart with SVG renderer
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current, undefined, {
          renderer: "svg",
        });
      }

      const chart = chartInstance.current;

      // Build series data with colors
      const seriesData = props.data.map((item) => ({
        name: item.name,
        value: item.value,
        itemStyle: item.color ? { color: item.color } : undefined,
      }));

      // Parse radius
      let radius: string | number | (string | number)[];
      if (props.radius === undefined) {
        radius = "50%";
      } else if (Array.isArray(props.radius)) {
        radius = props.radius;
      } else {
        radius = props.radius;
      }

      // Build option
      const option: echarts.EChartsOption = {
        title: props.title
          ? {
              text: props.title,
              subtext: props.titleSubtext,
              left: "center",
            }
          : undefined,
        tooltip: props.showTooltip !== false
          ? {
              trigger: "item",
              formatter: props.labelFormatter ?? "{a} <br/>{b}: {c} ({d}%)",
            }
          : undefined,
        legend:
          props.showLegend !== false
            ? {
                ...getLegendPosition(props.legendPosition),
                orient: props.legendOrient ?? "horizontal",
                data: seriesData.map((d) => d.name),
              }
            : undefined,
        series: [
          {
            name: props.title ?? "Pie",
            type: "pie",
            radius: radius,
            center: props.center ?? ["50%", "50%"],
            data: seriesData,
            roseType: props.pieType === "rose" ? "radius" : false,
            label: {
              show: props.showLabel !== false,
              position: props.labelPosition ?? "outside",
              formatter: props.labelFormatter ?? "{b}: {d}%",
            },
            selectedMode: props.selectedMode,
            selectedOffset: props.selectedOffset ?? 10,
            animation: props.animation !== false,
            animationDuration: props.animationDuration ?? 1000,
            animationType: props.animationType ?? "expansion",
          },
        ],
      };

      chart.setOption(option, true);

      // Handle resize
      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);

      // Event handlers
      chart.on("click", () => {
        emit("click");
      });

      chart.on("legendselectchanged", () => {
        emit("legendselectchanged");
      });

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [props, emit]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        chartInstance.current?.dispose();
        chartInstance.current = null;
      };
    }, []);

    return (
      <div
        ref={chartRef}
        style={{
          width: parseSize(props.width ?? "100%"),
          height: parseSize(props.height ?? 400),
        }}
      />
    );
  },

  // ==========================================================================
  // Bar Chart
  // ==========================================================================

  BarChart: ({
    props,
    emit,
  }: BaseComponentProps<EChartsProps<"BarChart">>) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
      if (!chartRef.current) return;

      // Initialize chart with SVG renderer
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current, undefined, {
          renderer: "svg",
        });
      }

      const chart = chartInstance.current;

      // Build series configuration
      const seriesData = props.series.map((s) => ({
        name: s.name,
        type: "bar" as const,
        data: s.data,
        itemStyle: s.color ? { color: s.color } : undefined,
        barWidth: s.barWidth,
        barMaxWidth: s.barMaxWidth,
        barMinWidth: s.barMinWidth,
        stack: s.stack,
        showBackground: s.showBackground,
        backgroundStyle: s.backgroundStyle,
      }));

      // Determine axis types based on horizontal flag
      const isHorizontal = props.horizontal === true;

      // Build option
      const option: echarts.EChartsOption = {
        title: props.title
          ? {
              text: props.title,
              subtext: props.titleSubtext,
              left: "center",
            }
          : undefined,
        tooltip: props.showTooltip !== false
          ? {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            }
          : undefined,
        legend:
          props.showLegend !== false && seriesData.length > 1
            ? {
                ...getLegendPosition(props.legendPosition),
                data: seriesData.map((s) => s.name),
              }
            : undefined,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: props.gridContainLabel !== false,
        },
        xAxis: {
          type: isHorizontal ? "value" : "category",
          data: isHorizontal ? undefined : props.xAxisData,
          name: isHorizontal ? props.yAxisName : props.xAxisName,
          show: props.showXAxis !== false,
          axisLine: {
            show: props.showXAxisLine !== false,
          },
        },
        yAxis: {
          type: isHorizontal ? "category" : "value",
          data: isHorizontal ? props.xAxisData : undefined,
          name: isHorizontal ? props.xAxisName : props.yAxisName,
          show: props.showYAxis !== false,
          axisLine: {
            show: props.showYAxisLine !== false,
          },
        },
        series: seriesData,
        animation: props.animation !== false,
        animationDuration: props.animationDuration ?? 1000,
        animationEasing: props.animationEasing ?? "cubicOut",
      };

      chart.setOption(option, true);

      // Handle resize
      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);

      // Event handlers
      chart.on("click", () => {
        emit("click");
      });

      chart.on("legendselectchanged", () => {
        emit("legendselectchanged");
      });

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [props, emit]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        chartInstance.current?.dispose();
        chartInstance.current = null;
      };
    }, []);

    return (
      <div
        ref={chartRef}
        style={{
          width: parseSize(props.width ?? "100%"),
          height: parseSize(props.height ?? 400),
        }}
      />
    );
  },
};