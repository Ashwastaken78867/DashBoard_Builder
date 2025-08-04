// src/redux/widgetTypes.ts

import type { Layout } from "react-grid-layout";

// Widget Types
export type WidgetType = "table" | "chart";
export type ChartType = "bar" | "line" | "pie";

// Chart
export type ChartRow = {
  xLabel: string;
  yValue: number;
  color: string;
};

export type ChartSettings = {
  chartType: ChartType;
  data: ChartRow[];
};

// Table
export type TableRow = Record<string, string>;

export type TableSettings = {
  columns: string[];
  data: TableRow[];
};

// Widget
export type Widget = {
  id: string;
  type: WidgetType;
  layout: Layout;
  title?:string;
  settings: ChartSettings | TableSettings;
};

// Redux State
export interface WidgetsState {
  layouts: any;
  items: any;
  widgets: Widget[];
  selectedWidgetId: string | null;
}
