import { z } from "zod";

// =============================================================================
// ECharts Component Definitions (SVG Renderer)
// Supports: LineChart, PieChart, BarChart
// =============================================================================

/**
 * ECharts component definitions for json-render catalogs.
 *
 * These can be used directly or extended with custom components.
 * All charts use SVG renderer for better quality and flexibility.
 */
export const echartsComponentDefinitions = {
  // ==========================================================================
  // Line Chart
  // ==========================================================================

  LineChart: {
    props: z.object({
      // Data
      xAxisData: z.array(z.union([z.string(), z.number()])),
      series: z.array(
        z.object({
          name: z.string(),
          data: z.array(z.union([z.number(), z.null()])),
          color: z.string().optional(),
          smooth: z.boolean().optional(),
          areaStyle: z.boolean().optional(),
          symbol: z.enum(["circle", "rect", "triangle", "diamond", "pin", "arrow", "none"]).optional(),
          symbolSize: z.number().optional(),
          lineStyle: z.object({
            width: z.number().optional(),
            type: z.enum(["solid", "dashed", "dotted"]).optional(),
          }).optional(),
        })
      ),
      // Layout
      width: z.union([z.number(), z.string()]).optional(),
      height: z.union([z.number(), z.string()]).optional(),
      // Title
      title: z.string().optional(),
      titleSubtext: z.string().optional(),
      // Legend
      showLegend: z.boolean().optional(),
      legendPosition: z.enum(["top", "bottom", "left", "right"]).optional(),
      // Tooltip
      showTooltip: z.boolean().optional(),
      // Axis
      xAxisName: z.string().optional(),
      yAxisName: z.string().optional(),
      showXAxis: z.boolean().optional(),
      showYAxis: z.boolean().optional(),
      showXAxisLine: z.boolean().optional(),
      showYAxisLine: z.boolean().optional(),
      // Grid
      gridContainLabel: z.boolean().optional(),
      // Animation
      animation: z.boolean().optional(),
      animationDuration: z.number().optional(),
    }),
    events: ["click", "legendselectchanged"],
    description:
      "Line charts display data trends over time or categories. Supports area fills, stacking, smooth curves, and symbol customization. Multiple series can share the same coordinate system. Use smooth=true for curved lines, areaStyle=true for filled regions. Customize symbols, line styles, and item styles for visual distinction.",
    example: {
      xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      series: [
        { name: "Sales", data: [120, 200, 150, 80, 70], smooth: true },
        { name: "Cost", data: [80, 100, 120, 60, 50] }
      ],
      title: "Weekly Report"
    }
  },

  // ==========================================================================
  // Pie Chart
  // ==========================================================================

  PieChart: {
    props: z.object({
      // Data
      data: z.array(
        z.object({
          name: z.string(),
          value: z.number(),
          color: z.string().optional(),
        })
      ),
      // Pie type
      pieType: z.enum(["pie", "rose"]).optional(),
      radius: z.union([
        z.number(),
        z.string(),
        z.tuple([z.union([z.number(), z.string()]), z.union([z.number(), z.string()])])
      ]).optional(),
      center: z.tuple([
        z.union([z.number(), z.string()]),
        z.union([z.number(), z.string()])
      ]).optional(),
      // Layout
      width: z.union([z.number(), z.string()]).optional(),
      height: z.union([z.number(), z.string()]).optional(),
      // Title
      title: z.string().optional(),
      titleSubtext: z.string().optional(),
      // Legend
      showLegend: z.boolean().optional(),
      legendPosition: z.enum(["top", "bottom", "left", "right"]).optional(),
      legendOrient: z.enum(["horizontal", "vertical"]).optional(),
      // Tooltip
      showTooltip: z.boolean().optional(),
      // Label
      showLabel: z.boolean().optional(),
      labelPosition: z.enum(["outside", "inside", "center"]).optional(),
      labelFormatter: z.string().optional(),
      // Animation
      animation: z.boolean().optional(),
      animationDuration: z.number().optional(),
      animationType: z.enum(["expansion", "scale"]).optional(),
      // Others
      selectedMode: z.enum(["single", "multiple"]).optional(),
      selectedOffset: z.number().optional(),
    }),
    events: ["click", "legendselectchanged"],
    description:
      "Pie and donut charts showing data proportions and percentages. Use radius property with [inner, outer] to create donut charts. Supports Nightingale rose charts via pieType='rose' with 'radius' mode (central angle shows percentage, radius shows size) or 'area' mode (same angle, radius shows size). Labels can be positioned outside (connected via visual guide line), inside/inner (within sectors), or center. Enable selectedMode for interactive selection.",
    example: {
      data: [
        { name: "Category A", value: 335 },
        { name: "Category B", value: 310 },
        { name: "Category C", value: 234 }
      ],
      title: "Distribution",
      radius: ["40%", "70%"]
    }
  },

  // ==========================================================================
  // Bar Chart
  // ==========================================================================

  BarChart: {
    props: z.object({
      // Data
      xAxisData: z.array(z.union([z.string(), z.number()])),
      series: z.array(
        z.object({
          name: z.string(),
          data: z.array(z.union([z.number(), z.null()])),
          color: z.string().optional(),
          barWidth: z.union([z.number(), z.string()]).optional(),
          barMaxWidth: z.union([z.number(), z.string()]).optional(),
          barMinWidth: z.union([z.number(), z.string()]).optional(),
          stack: z.string().optional(),
          showBackground: z.boolean().optional(),
          backgroundStyle: z.object({
            color: z.string().optional(),
          }).optional(),
        })
      ),
      // Bar layout
      horizontal: z.boolean().optional(),
      // Layout
      width: z.union([z.number(), z.string()]).optional(),
      height: z.union([z.number(), z.string()]).optional(),
      // Title
      title: z.string().optional(),
      titleSubtext: z.string().optional(),
      // Legend
      showLegend: z.boolean().optional(),
      legendPosition: z.enum(["top", "bottom", "left", "right"]).optional(),
      // Tooltip
      showTooltip: z.boolean().optional(),
      // Axis
      xAxisName: z.string().optional(),
      yAxisName: z.string().optional(),
      showXAxis: z.boolean().optional(),
      showYAxis: z.boolean().optional(),
      showXAxisLine: z.boolean().optional(),
      showYAxisLine: z.boolean().optional(),
      // Grid
      gridContainLabel: z.boolean().optional(),
      // Animation
      animation: z.boolean().optional(),
      animationDuration: z.number().optional(),
      animationEasing: z.enum([
        "linear", "quadraticIn", "quadraticOut", "quadraticInOut",
        "cubicIn", "cubicOut", "cubicInOut", "quarticIn", "quarticOut",
        "quarticInOut", "quinticIn", "quinticOut", "quinticInOut",
        "sinusoidalIn", "sinusoidalOut", "sinusoidalInOut", "exponentialIn",
        "exponentialOut", "exponentialInOut", "circularIn", "circularOut",
        "circularInOut", "elasticIn", "elasticOut", "elasticInOut",
        "backIn", "backOut", "backInOut", "bounceIn", "bounceOut", "bounceInOut"
      ]).optional(),
    }),
    events: ["click", "legendselectchanged"],
    description:
      "Bar charts featuring stacked series, background bars, and custom styling. Supports stacking multiple series with stack property, custom bar widths, rounded corners via itemStyle.borderRadius, and background bars with showBackground and backgroundStyle. Use horizontal=true for horizontal bars. Multiple series can share the same coordinate system for effective comparison across categories.",
    example: {
      xAxisData: ["Product A", "Product B", "Product C"],
      series: [
        { name: "Sales", data: [320, 332, 301] },
        { name: "Marketing", data: [120, 132, 101] }
      ],
      title: "Sales Report",
      showTooltip: true
    }
  },
};

// =============================================================================
// Types
// =============================================================================

/**
 * Type for a component definition
 */
export type ComponentDefinition = {
  props: z.ZodType;
  slots?: string[];
  events?: string[];
  description: string;
  example?: Record<string, unknown>;
};

/**
 * Infer the props type for an echarts component by name.
 * Derives the TypeScript type directly from the Zod schema,
 * so component implementations stay in sync with catalog definitions.
 *
 * @example
 * ```ts
 * type LineChartProps = EChartsProps<"LineChart">;
 * // { xAxisData: (string | number)[]; series: {...}; ... }
 * ```
 */
export type EChartsProps<K extends keyof typeof echartsComponentDefinitions> =
  z.output<(typeof echartsComponentDefinitions)[K]["props"]>;

/**
 * Bindings configuration for state binding paths.
 * Used for two-way data binding with state management.
 */
export type BindingsConfig = {
  [key: string]: string | undefined;
};

/**
 * Event emit function type
 */
export type EmitFunction = (eventName: string) => void;