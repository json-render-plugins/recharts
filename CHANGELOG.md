# @json-render-plugins/recharts

## 0.0.1

### Initial Release

- Recharts component library for json-render with React-native declarative rendering
- **Six chart types supported**:
  - **LineChart**: For trends and time-series data with area fills, smooth curves, and symbol customization
  - **AreaChart**: For cumulative data visualization with stacked areas and gradient fills
  - **PieChart**: For proportions and percentages with donut chart support
  - **BarChart**: For comparing values across categories with stacked and horizontal options
  - **ScatterChart**: For two-dimensional coordinate charts with bubble support
  - **RadarChart**: For multivariate data comparison on spider diagrams
- Full customization through props
- **Style support**: All charts support custom `style` prop for container styling
- **Empty data handling**: Charts gracefully return `null` when data is empty
- **Dual event support**: `click` (chart area) and `legendClick` (legend items)
- Type-safe with Zod schemas
- React integration via @json-render/react

### Components

#### LineChart
- Display data trends over time or categories
- Area fills and smooth curves support (`areaStyle`, `smooth`)
- Symbol customization: circle, square, triangle, diamond, none
- Custom line styles: width, solid/dashed/dotted
- Multiple series on shared coordinate system

#### AreaChart
- Cumulative data visualization with filled regions
- Stacked areas via `stackId` property
- Configurable fill opacity and smooth curves
- Perfect for trends and cumulative values

#### PieChart
- Standard pie and donut charts (via `innerRadius` / `outerRadius`)
- Per-slice custom colors
- Optional percentage labels

#### BarChart
- Stacked series via shared `stack` group name
- Background bars with custom color
- Custom bar sizes (`barSize`, `maxBarSize`)
- Horizontal and vertical orientations

#### ScatterChart
- Two-dimensional coordinate charts
- Bubble chart support via `z` property
- Ideal for correlation analysis

#### RadarChart
- Spider diagrams for multivariate data
- Multiple series overlay for comparison
- Customizable fill opacity

