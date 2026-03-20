# @json-render-plugins/recharts

Recharts component library for [@json-render/core](https://github.com/json-render/core). Transform JSON specifications into beautiful Recharts visualizations using React.

## Features

- **Six Chart Types**: LineChart, AreaChart, PieChart, BarChart, ScatterChart, RadarChart
- **React-Native Rendering**: Declarative, composable chart components
- **Full Customization**: Comprehensive props for styling and behavior
- **Style Support**: All charts support custom `style` prop for container styling
- **Empty Data Handling**: Charts gracefully handle empty data without rendering
- **Type-Safe**: Full TypeScript support with Zod schemas
- **React Integration**: Seamless integration with @json-render/react

## Installation

```bash
npm install @json-render-plugins/recharts recharts react react-dom
# or
pnpm add @json-render-plugins/recharts recharts react react-dom
# or
yarn add @json-render-plugins/recharts recharts react react-dom
```

## Quick Start

### 1. Create a Catalog

Import standard definitions from `@json-render-plugins/recharts/catalog`:

```typescript
import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { rechartsComponentDefinitions } from "@json-render-plugins/recharts/catalog";

const catalog = defineCatalog(schema, {
  components: {
    LineChart: rechartsComponentDefinitions.LineChart,
    AreaChart: rechartsComponentDefinitions.AreaChart,
    PieChart: rechartsComponentDefinitions.PieChart,
    BarChart: rechartsComponentDefinitions.BarChart,
    ScatterChart: rechartsComponentDefinitions.ScatterChart,
    RadarChart: rechartsComponentDefinitions.RadarChart,
  },
  actions: {},
});
```

### 2. Create a Registry

Import implementations from `@json-render-plugins/recharts`:

```typescript
import { defineRegistry } from "@json-render/react";
import { rechartsComponents } from "@json-render-plugins/recharts";

const { registry } = defineRegistry(catalog, {
  components: {
    LineChart: rechartsComponents.LineChart,
    AreaChart: rechartsComponents.AreaChart,
    PieChart: rechartsComponents.PieChart,
    BarChart: rechartsComponents.BarChart,
    ScatterChart: rechartsComponents.ScatterChart,
    RadarChart: rechartsComponents.RadarChart,
  },
});
```

### 3. Render

```tsx
import { Renderer } from "@json-render/react";

function App({ spec }) {
  return <Renderer spec={spec} registry={registry} />;
}
```

## Components

### LineChart

Line charts display data trends over time or categories. Supports area fills, smooth curves, and symbol customization. Multiple series can share the same coordinate system. Use `smooth=true` for curved lines, `areaStyle=true` for filled regions.

```json
{
  "type": "LineChart",
  "props": {
    "xAxisData": ["Jan", "Feb", "Mar", "Apr", "May"],
    "series": [
      {
        "name": "Revenue",
        "data": [120, 200, 150, 80, 70],
        "smooth": true,
        "areaStyle": true
      },
      {
        "name": "Cost",
        "data": [80, 100, 120, 60, 50]
      }
    ],
    "title": "Financial Overview",
    "showTooltip": true,
    "showLegend": true
  }
}
```

**Key Props:**
- `xAxisData`: Array of X-axis labels
- `series`: Array of line series with `name`, `data`, and optional styling
- `smooth`: Enable smooth curves (`monotone` interpolation)
- `areaStyle`: Fill area under line
- `symbol`: Point marker shape — `"circle"`, `"square"`, `"triangle"`, `"diamond"`, `"none"`
- `symbolSize`: Dot radius in pixels
- `lineStyle`: Line style with `width` and `type` (`"solid"`, `"dashed"`, `"dotted"`)

### PieChart

Pie and donut charts showing data proportions and percentages. Use `innerRadius` and `outerRadius` to create donut charts. Each slice can have a custom color.

```json
{
  "type": "PieChart",
  "props": {
    "data": [
      { "name": "Category A", "value": 335 },
      { "name": "Category B", "value": 310 },
      { "name": "Category C", "value": 234 }
    ],
    "title": "Market Share",
    "innerRadius": "40%",
    "outerRadius": "70%",
    "showLabel": true,
    "showTooltip": true
  }
}
```

**Key Props:**
- `data`: Array of slices with `name`, `value`, and optional `color`
- `innerRadius`: Inner radius for donut charts (e.g. `"40%"` or `80`)
- `outerRadius`: Outer radius of the pie (e.g. `"70%"` or `120`); defaults to `"50%"`
- `cx` / `cy`: Center position; defaults to `"50%"` / `"50%"`
- `showLabel`: Show percentage labels on slices (default `true`)

### BarChart

Bar charts featuring stacked series and custom styling. Supports stacking multiple series with the `stack` property, custom bar sizes, and background bars. Use `horizontal=true` for horizontal bars.

```json
{
  "type": "BarChart",
  "props": {
    "xAxisData": ["Product A", "Product B", "Product C"],
    "series": [
      { "name": "Sales", "data": [320, 332, 301] },
      { "name": "Marketing", "data": [120, 132, 101], "stack": "total" }
    ],
    "title": "Product Performance",
    "showTooltip": true,
    "horizontal": false
  }
}
```

**Key Props:**
- `xAxisData`: Array of X-axis labels
- `series`: Array of bar series with `name`, `data`, and optional styling
- `horizontal`: Flip to horizontal bars (default `false`)
- `stack`: Group name for stacked bars — bars with the same `stack` value are stacked
- `barSize`: Fixed bar width in pixels
- `maxBarSize`: Maximum bar width in pixels
- `background`: Show background bar behind each bar
- `backgroundColor`: Background bar color (default `"#f5f5f5"`)

### AreaChart

Area charts display cumulative data over time with filled regions. Supports stacked areas and gradient fills for enhanced visualization.

```json
{
  "type": "AreaChart",
  "props": {
    "xAxisData": ["Jan", "Feb", "Mar", "Apr", "May"],
    "series": [
      {
        "name": "Revenue",
        "data": [4000, 3000, 2000, 2780, 1890],
        "fillOpacity": 0.6
      },
      {
        "name": "Expenses",
        "data": [2400, 1398, 9800, 3908, 4800],
        "stackId": "a",
        "fillOpacity": 0.6
      }
    ],
    "title": "Financial Overview",
    "smooth": true
  }
}
```

**Key Props:**
- `xAxisData`: Array of X-axis labels
- `series`: Array of area series with `name`, `data`, and optional styling
- `smooth`: Enable smooth curves (default `false`)
- `fillOpacity`: Area fill transparency (0-1, default `0.6`)
- `stackId`: Group name for stacked areas — areas with the same `stackId` are stacked

### ScatterChart

Scatter charts display data points on a two-dimensional coordinate system. Ideal for showing relationships between variables. Supports bubble charts via the `z` property.

```json
{
  "type": "ScatterChart",
  "props": {
    "series": [
      {
        "name": "Group A",
        "data": [
          { "x": 100, "y": 200, "z": 200 },
          { "x": 120, "y": 100, "z": 260 },
          { "x": 170, "y": 300, "z": 400 }
        ]
      }
    ],
    "title": "Correlation Analysis",
    "xAxisName": "Variable X",
    "yAxisName": "Variable Y"
  }
}
```

**Key Props:**
- `series`: Array of scatter series with `name` and `data`
- `data`: Array of points with `x`, `y` coordinates and optional `z` for bubble size
- `xAxisName`: Label for X-axis
- `yAxisName`: Label for Y-axis

### RadarChart

Radar charts display multivariate data on a spider diagram. Perfect for comparing multiple quantitative variables across categories.

```json
{
  "type": "RadarChart",
  "props": {
    "data": [
      { "name": "Math", "A": 120, "B": 110 },
      { "name": "Chinese", "A": 98, "B": 130 },
      { "name": "English", "A": 86, "B": 130 }
    ],
    "series": [
      { "name": "Student A", "dataKey": "A", "fillOpacity": 0.6 },
      { "name": "Student B", "dataKey": "B", "fillOpacity": 0.6 }
    ],
    "title": "Student Performance"
  }
}
```

**Key Props:**
- `data`: Array of category objects with dynamic keys for each series
- `series`: Array of radar series with `name`, `dataKey`, and optional styling
- `dataKey`: Property name in data objects to use for this series
- `fillOpacity`: Polygon fill transparency (0-1, default `0.6`)

## Common Props

All charts support these common properties:

### Layout & Style
| Prop | Type | Description |
|------|------|-------------|
| `style` | `object` | Custom styles for chart container (supports `width`, `height`, `maxWidth`, `aspectRatio`, etc.) |
| `margin` | `{ top?, right?, left?, bottom? }` | Chart margins |

### Title
| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Main title text |
| `titleSubtext` | `string` | Subtitle text |

### Legend
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showLegend` | `boolean` | `true` (multi-series) | Show/hide legend |
| `legendPosition` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Legend position |

### Tooltip
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showTooltip` | `boolean` | `true` | Show/hide tooltip |

### Axis (LineChart, BarChart)
| Prop | Type | Description |
|------|------|-------------|
| `xAxisName` | `string` | X-axis label |
| `yAxisName` | `string` | Y-axis label |
| `showXAxis` | `boolean` | Show/hide X-axis |
| `showYAxis` | `boolean` | Show/hide Y-axis |
| `showGrid` | `boolean` | Show/hide grid lines (default `true`) |

### Animation
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | `boolean` | `true` | Enable animations |
| `animationDuration` | `number` | `1000` | Duration in ms |

## Events

All components support two independent events:

```json
{
  "type": "LineChart",
  "props": { "..." },
  "on": {
    "click": [{ "action": "handleChartClick" }],
    "legendClick": [{ "action": "handleLegendToggle" }]
  }
}
```

Available events:
- `click`: Triggered when clicking on the chart area or data points
- `legendClick`: Triggered when clicking a legend item

## Empty Data Handling

All chart components gracefully handle empty data:

- **LineChart/AreaChart/BarChart**: Returns `null` when `xAxisData` or `series` is empty
- **PieChart**: Returns `null` when `data` is empty
- **ScatterChart**: Returns `null` when `series` is empty
- **RadarChart**: Returns `null` when `data` or `series` is empty

This prevents rendering errors and console warnings during streaming when data is being populated incrementally.

## Exports

| Entry Point | Exports |
|-------------|---------|
| `@json-render-plugins/recharts` | `rechartsComponents` |
| `@json-render-plugins/recharts/catalog` | `rechartsComponentDefinitions`, `RechartsProps`, `ComponentDefinition`, `BindingsConfig`, `EmitFunction` |

The `/catalog` entry point contains only Zod schemas (no React dependency), so it can be used in server-side code for prompt generation.

## License

MIT
