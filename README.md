# @json-render-plugins/echarts

ECharts component library for [@json-render/core](https://github.com/json-render/core). Transform JSON specifications into beautiful ECharts visualizations using SVG rendering.

## Features

- **Three Chart Types**: LineChart, PieChart, BarChart
- **SVG Rendering**: High-quality vector graphics for all charts
- **Full Customization**: Comprehensive props for styling and behavior
- **Type-Safe**: Full TypeScript support with Zod schemas
- **React Integration**: Seamless integration with @json-render/react

## Installation

```bash
npm install @json-render-plugins/echarts echarts react react-dom
# or
pnpm add @json-render-plugins/echarts echarts react react-dom
# or
yarn add @json-render-plugins/echarts echarts react react-dom
```

## Quick Start

### 1. Create a Catalog

Import standard definitions from `@json-render-plugins/echarts/catalog`:

```typescript
import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { echartsComponentDefinitions } from "@json-render-plugins/echarts/catalog";

const catalog = defineCatalog(schema, {
  components: {
    LineChart: echartsComponentDefinitions.LineChart,
    PieChart: echartsComponentDefinitions.PieChart,
    BarChart: echartsComponentDefinitions.BarChart,
  },
  actions: {},
});
```

### 2. Create a Registry

Import implementations from `@json-render-plugins/echarts`:

```typescript
import { defineRegistry } from "@json-render/react";
import { echartsComponents } from "@json-render-plugins/echarts";

const { registry } = defineRegistry(catalog, {
  components: {
    LineChart: echartsComponents.LineChart,
    PieChart: echartsComponents.PieChart,
    BarChart: echartsComponents.BarChart,
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

Line charts display data trends over time or categories. Supports area fills, stacking, smooth curves, and symbol customization. Multiple series can share the same coordinate system. Use smooth=true for curved lines, areaStyle=true for filled regions. Customize symbols, line styles, and item styles for visual distinction.

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
- `smooth`: Enable smooth curves
- `areaStyle`: Fill area under line
- `symbol`: Point marker shape (circle, rect, triangle, etc.)
- `lineStyle`: Line style with `width` and `type` (solid, dashed, dotted)

### PieChart

Pie and donut charts showing data proportions and percentages. Use radius property with [inner, outer] to create donut charts. Supports Nightingale rose charts via pieType='rose' with 'radius' mode (central angle shows percentage, radius shows size) or 'area' mode (same angle, radius shows size). Labels can be positioned outside (connected via visual guide line), inside/inner (within sectors), or center. Enable selectedMode for interactive selection.

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
    "radius": ["40%", "70%"],
    "showLabel": true,
    "showTooltip": true
  }
}
```

**Key Props:**
- `data`: Array of slices with `name`, `value`, and optional `color`
- `radius`: Single value or [inner, outer] for donut charts
- `pieType`: Set to "rose" for rose chart
- `selectedMode`: Enable selection ("single" or "multiple")
- `labelPosition`: Label position - "outside", "inside", "center"

### BarChart

Bar charts featuring stacked series, background bars, and custom styling. Supports stacking multiple series with stack property, custom bar widths, rounded corners via itemStyle.borderRadius, and background bars with showBackground and backgroundStyle. Use horizontal=true for horizontal bars. Multiple series can share the same coordinate system for effective comparison across categories.

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
- `horizontal`: Flip axes for horizontal bars
- `stack`: Group name for stacked bars
- `barWidth`: Control bar width

## Common Props

All charts support these common properties:

### Layout
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | `"100%"` | Chart width |
| `height` | `number \| string` | `400` | Chart height |

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
| `xAxisName` | `string` | X-axis name |
| `yAxisName` | `string` | Y-axis name |
| `showXAxis` | `boolean` | Show X-axis |
| `showYAxis` | `boolean` | Show Y-axis |

### Animation
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | `boolean` | `true` | Enable animations |
| `animationDuration` | `number` | `1000` | Duration in ms |

## Events

All components support events:

```json
{
  "type": "LineChart",
  "props": { "..." },
  "on": {
    "click": "handleChartClick",
    "legendselectchanged": "handleLegendChange"
  }
}
```

Available events:
- `click`: Triggered when clicking on data points
- `legendselectchanged`: Triggered when toggling legend items

## Exports

| Entry Point | Exports |
|-------------|---------|
| `@json-render-plugins/echarts` | `echartsComponents` |
| `@json-render-plugins/echarts/catalog` | `echartsComponentDefinitions`, `EChartsProps`, `ComponentDefinition`, `BindingsConfig`, `EmitFunction` |

The `/catalog` entry point contains only Zod schemas (no React dependency), so it can be used in server-side code for prompt generation.

## License

MIT