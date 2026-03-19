# @json-render-plugins/echarts

## 0.0.1

### Initial Release

- ECharts component library for json-render with SVG rendering
- Three chart types supported:
  - **LineChart**: For trends and time-series data
  - **PieChart**: For proportions and percentages
  - **BarChart**: For comparing values across categories
- Full customization through props
- Type-safe with Zod schemas
- React integration via @json-render/react

### Components

#### LineChart
- Display data trends over time or categories
- Area fills, stacking, and smooth curves support
- Symbol customization (circle, rect, triangle, etc.)
- Custom line styles and item styles
- Multiple series on shared coordinate system

#### PieChart
- Standard pie and donut charts (via radius property)
- Nightingale rose charts with radius/area modes
- Flexible label positioning (outside, inside, center)
- Interactive selection modes (single, multiple)
- Visual guide lines for outside labels

#### BarChart
- Stacked series with custom bar widths
- Background bars with custom styling
- Rounded corners via borderRadius
- Horizontal and vertical orientations
- Multiple series comparison on shared coordinate system

### Dependencies
- echarts ^5.0.0
- @json-render/core
- @json-render/react
- zod ^4.0.0