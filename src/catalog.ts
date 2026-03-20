import { z } from "zod";

// =============================================================================
// Recharts Component Definitions
// Supports: LineChart, AreaChart, PieChart, BarChart, ScatterChart, RadarChart
// Built with React and D3 for declarative, composable charting
// =============================================================================

/**
 * Recharts component definitions for json-render catalogs.
 *
 * These can be used directly or extended with custom components.
 * All charts are rendered as declarative React components.
 */
export const rechartsComponentDefinitions = {
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
          symbol: z.enum(["circle", "square", "triangle", "diamond", "none"]).optional(),
          symbolSize: z.number().optional(),
          lineStyle: z.object({
            width: z.number().optional(),
            type: z.enum(["solid", "dashed", "dotted"]).optional(),
          }).optional(),
        })
      ),
      // Layout
      margin: z.object({
        top: z.number().optional(),
        right: z.number().optional(),
        left: z.number().optional(),
        bottom: z.number().optional(),
      }).optional(),
      // Style
      style: z.record(z.string(), z.any()).optional(),
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
      showGrid: z.boolean().optional(),
      // Animation
      animation: z.boolean().optional(),
      animationDuration: z.number().optional(),
    }),
    events: ["click", "legendClick"],
    description:
      "Line charts display data trends over time or categories using Recharts' ComposedChart with Line and Area components. Supports smooth monotone interpolation curves, customizable line styles (solid, dashed, dotted), and point markers (circle, square, triangle, diamond). Multiple series can share the same coordinate system for effective comparison. Use smooth=true for curved lines, areaStyle=true to fill the area beneath lines. Each series can have custom colors and line widths.",
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
      // Pie dimensions
      innerRadius: z.union([z.number(), z.string()]).optional(),
      outerRadius: z.union([z.number(), z.string()]).optional(),
      cx: z.union([z.number(), z.string()]).optional(),
      cy: z.union([z.number(), z.string()]).optional(),
      // Layout
      margin: z.object({
        top: z.number().optional(),
        right: z.number().optional(),
        left: z.number().optional(),
        bottom: z.number().optional(),
      }).optional(),
      // Style
      style: z.record(z.string(), z.any()).optional(),
      // Title
      title: z.string().optional(),
      titleSubtext: z.string().optional(),
      // Legend
      showLegend: z.boolean().optional(),
      legendPosition: z.enum(["top", "bottom", "left", "right"]).optional(),
      // Tooltip
      showTooltip: z.boolean().optional(),
      // Label
      showLabel: z.boolean().optional(),
      // Animation
      animation: z.boolean().optional(),
      animationDuration: z.number().optional(),
    }),
    events: ["click", "legendClick"],
    description:
      "Pie and donut charts showing proportional data as circular sectors using Recharts' PieChart with Pie and Cell components. Ideal for displaying composition and part-to-whole relationships. Use innerRadius (e.g., '40%') to create donut charts where the center is hollow. Each slice can have a custom color via the Cell component. Supports labels, tooltips, and smooth animated transitions. Use cx/cy props to position the chart center (defaults to '50%').",
    example: {
      data: [
        { name: "Category A", value: 335 },
        { name: "Category B", value: 310 },
        { name: "Category C", value: 234 }
      ],
      title: "Distribution",
      innerRadius: "40%",
      outerRadius: "70%"
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
          barSize: z.number().optional(),
          maxBarSize: z.number().optional(),
          stack: z.string().optional(),
          background: z.boolean().optional(),
          backgroundColor: z.string().optional(),
        })
      ),
      // Bar layout
      horizontal: z.boolean().optional(),
      // Layout
      margin: z.object({
        top: z.number().optional(),
        right: z.number().optional(),
        left: z.number().optional(),
        bottom: z.number().optional(),
      }).optional(),
      // Style
      style: z.record(z.string(), z.any()).optional(),
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
      showGrid: z.boolean().optional(),
      // Animation
      animation: z.boolean().optional(),
      animationDuration: z.number().optional(),
    }),
    events: ["click", "legendClick"],
    description:
      "Bar charts displaying categorical data as rectangular bars using Recharts' BarChart with Bar components. Supports stacked bars via the stack prop (bars with the same stack value are stacked), horizontal layout via horizontal=true (uses layout='vertical' with swapped axis types), and custom bar sizes. Multiple series can share the same coordinate system for effective comparison. Use background=true to show a background bar behind each data bar with optional backgroundColor.",
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

  // ==========================================================================
  // Area Chart
  // ==========================================================================

  AreaChart: {
    props: z.object({
      // Data
      xAxisData: z.array(z.union([z.string(), z.number()])),
      series: z.array(
        z.object({
          name: z.string(),
          data: z.array(z.union([z.number(), z.null()])),
          color: z.string().optional(),
          smooth: z.boolean().optional(),
          fillOpacity: z.number().optional(),
          stackId: z.string().optional(),
        })
      ),
      // Layout
      margin: z.object({
        top: z.number().optional(),
        right: z.number().optional(),
        left: z.number().optional(),
        bottom: z.number().optional(),
      }).optional(),
      // Style
      style: z.record(z.string(), z.any()).optional(),
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
      showGrid: z.boolean().optional(),
      // Animation
      animation: z.boolean().optional(),
      animationDuration: z.number().optional(),
    }),
    events: ["click", "legendClick"],
    description:
      "Area charts display data as filled areas beneath lines, ideal for visualizing cumulative data over time. Supports stacked areas via stackId (areas with the same stackId are stacked), smooth curves via smooth=true, and custom fill opacity. Use fillOpacity (0-1) to control area transparency. Multiple series can share the same coordinate system for effective comparison of cumulative values.",
    example: {
      xAxisData: ["Jan", "Feb", "Mar", "Apr", "May"],
      series: [
        { name: "Revenue", data: [4000, 3000, 2000, 2780, 1890], fillOpacity: 0.6 },
        { name: "Expenses", data: [2400, 1398, 9800, 3908, 4800], fillOpacity: 0.6 }
      ],
      title: "Financial Overview"
    }
  },

  // ==========================================================================
  // Scatter Chart
  // ==========================================================================

  ScatterChart: {
    props: z.object({
      // Data
      series: z.array(
        z.object({
          name: z.string(),
          data: z.array(
            z.object({
              x: z.number(),
              y: z.number(),
              z: z.number().optional(),
            })
          ),
          color: z.string().optional(),
        })
      ),
      // Layout
      margin: z.object({
        top: z.number().optional(),
        right: z.number().optional(),
        left: z.number().optional(),
        bottom: z.number().optional(),
      }).optional(),
      // Style
      style: z.record(z.string(), z.any()).optional(),
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
      showGrid: z.boolean().optional(),
      // Animation
      animation: z.boolean().optional(),
      animationDuration: z.number().optional(),
    }),
    events: ["click", "legendClick"],
    description:
      "Scatter charts display data as individual points on a two-dimensional coordinate system. Ideal for showing relationships between two variables. Supports bubble charts via the z property (point size). Use x and y for coordinates, and optional z for bubble sizing. Multiple series can share the same coordinate system for comparing distributions.",
    example: {
      series: [
        {
          name: "Group A",
          data: [
            { x: 100, y: 200, z: 200 },
            { x: 120, y: 100, z: 260 },
            { x: 170, y: 300, z: 400 }
          ]
        }
      ],
      title: "Scatter Plot"
    }
  },

  // ==========================================================================
  // Radar Chart
  // ==========================================================================

  RadarChart: {
    props: z.object({
      // Data
      data: z.array(z.record(z.string(), z.any())),
      series: z.array(
        z.object({
          name: z.string(),
          dataKey: z.string(),
          color: z.string().optional(),
          fillOpacity: z.number().optional(),
        })
      ),
      // Layout
      margin: z.object({
        top: z.number().optional(),
        right: z.number().optional(),
        left: z.number().optional(),
        bottom: z.number().optional(),
      }).optional(),
      // Style
      style: z.record(z.string(), z.any()).optional(),
      // Title
      title: z.string().optional(),
      titleSubtext: z.string().optional(),
      // Legend
      showLegend: z.boolean().optional(),
      legendPosition: z.enum(["top", "bottom", "left", "right"]).optional(),
      // Tooltip
      showTooltip: z.boolean().optional(),
      // Animation
      animation: z.boolean().optional(),
      animationDuration: z.number().optional(),
    }),
    events: ["click", "legendClick"],
    description:
      "Radar charts display multivariate data on a spider diagram using polar coordinates. Ideal for comparing multiple quantitative variables across different categories. Each series is represented as a polygon with fillOpacity controlling transparency. Use dataKey in series to specify which property from data array to display.",
    example: {
      data: [
        { name: "Math", A: 120, B: 110 },
        { name: "Chinese", A: 98, B: 130 },
        { name: "English", A: 86, B: 130 }
      ],
      series: [
        { name: "Student A", dataKey: "A", fillOpacity: 0.6 },
        { name: "Student B", dataKey: "B", fillOpacity: 0.6 }
      ],
      title: "Student Performance"
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
 * Infer the props type for a recharts component by name.
 * Derives the TypeScript type directly from the Zod schema,
 * so component implementations stay in sync with catalog definitions.
 *
 * @example
 * ```ts
 * type LineChartProps = RechartsProps<"LineChart">;
 * // { xAxisData: (string | number)[]; series: {...}; ... }
 * ```
 */
export type RechartsProps<K extends keyof typeof rechartsComponentDefinitions> =
  z.output<(typeof rechartsComponentDefinitions)[K]["props"]>;

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
