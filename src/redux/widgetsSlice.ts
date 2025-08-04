import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Layout } from "react-grid-layout";

import type {
  WidgetType,
  ChartType,
  ChartRow,
  ChartSettings,
  TableSettings,
  TableRow,
  WidgetsState,
  Widget,
} from "./widgetTypes";

// Initial State
const initialState: WidgetsState = {
  widgets: [],
  selectedWidgetId: null,
  layouts: undefined,
  items: undefined,
};

// Helpers for localStorage
const LOCAL_STORAGE_KEY = "dashboard_widgets";

export const loadWidgetsFromStorage = (): Widget[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load widgets from localStorage", e);
    return [];
  }
};

export const saveWidgetsToStorage = (widgets: Widget[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(widgets));
  } catch (e) {
    console.error("Failed to save widgets to localStorage", e);
  }
};

// Slice
const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    loadWidgets: (state, action: PayloadAction<Widget[]>) => {
      state.widgets = action.payload;
    },

    addWidget: (
      state,
      action: PayloadAction<WidgetType | { type: "chart"; chartType: ChartType }>
    ) => {
      const id = nanoid();
      const defaultW = 3;
      const defaultH = 5;
      const totalCols = 12;

      const occupied: Record<number, boolean[]> = {};
      state.widgets.forEach(({ layout }) => {
        for (let dx = 0; dx < layout.w; dx++) {
          for (let dy = 0; dy < layout.h; dy++) {
            const y = layout.y + dy;
            const x = layout.x + dx;
            if (!occupied[y]) occupied[y] = [];
            occupied[y][x] = true;
          }
        }
      });

      let placed = false;
      let nextX = 0;
      let nextY = 0;

      for (let y = 0; !placed && y < 100; y++) {
        for (let x = 0; x <= totalCols - defaultW; x++) {
          let fits = true;
          for (let dx = 0; dx < defaultW; dx++) {
            for (let dy = 0; dy < defaultH; dy++) {
              const cellY = y + dy;
              const cellX = x + dx;
              if (occupied[cellY]?.[cellX]) {
                fits = false;
                break;
              }
            }
            if (!fits) break;
          }

          if (fits) {
            nextX = x;
            nextY = y;
            placed = true;
            break;
          }
        }
      }

      const layout: Layout = {
        i: id,
        x: nextX,
        y: nextY,
        w: defaultW,
        h: defaultH,
      };

      if (typeof action.payload === "string" && action.payload === "table") {
        state.widgets.push({
          id,
          type: "table",
          layout,
          settings: {
            columns: ["Name", "Email", "Role"],
            data: [
              { Name: "John Doe", Email: "john@example.com", Role: "Admin" },
              { Name: "Jane Smith", Email: "jane@example.com", Role: "User" },
            ],
          },
        });
      } else if (
        typeof action.payload === "object" &&
        action.payload.type === "chart"
      ) {
        state.widgets.push({
          id,
          type: "chart",
          layout,
          settings: {
            chartType: action.payload.chartType,
            data: [
              { xLabel: "Jan", yValue: 100, color: "#3498db" },
              { xLabel: "Feb", yValue: 200, color: "#2ecc71" },
            ],
          },
        });
      }
    },

    removeWidget: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      state.widgets = state.widgets.filter((w) => w.id !== idToRemove);
    },

    clearWidgets: (state) => {
      state.widgets = [];
      state.selectedWidgetId = null;
    },

    selectWidget: (state, action: PayloadAction<string | null>) => {
      state.selectedWidgetId = action.payload;
    },

    updateWidgetTitle: (state, action: PayloadAction<{ widgetId: string; title: string }>) => {
      const widget = state.widgets.find((w) => w.id === action.payload.widgetId);
      if (widget) widget.title = action.payload.title;
    },

    updateChartRow: (
      state,
      action: PayloadAction<{ widgetId: string; index: number; field: keyof ChartRow; value: string | number }>
    ) => {
      const { widgetId, index, field, value } = action.payload;
      const widget = state.widgets.find((w) => w.id === widgetId);
      if (widget?.type === "chart") {
        const chart = widget.settings as ChartSettings;
        const newData = [...chart.data];
        newData[index] = { ...newData[index], [field]: value };
        chart.data = newData;
      }
    },

    addChartRow: (state, action: PayloadAction<{ widgetId: string }>) => {
      const widget = state.widgets.find((w) => w.id === action.payload.widgetId);
      if (widget?.type === "chart") {
        (widget.settings as ChartSettings).data.push({
          xLabel: "New Label",
          yValue: 0,
          color: "#000000",
        });
      }
    },

    removeChartRow: (
      state,
      action: PayloadAction<{ widgetId: string; index: number }>
    ) => {
      const widget = state.widgets.find((w) => w.id === action.payload.widgetId);
      if (widget?.type === "chart") {
        (widget.settings as ChartSettings).data.splice(action.payload.index, 1);
      }
    },

    updateChartType: (
      state,
      action: PayloadAction<{ widgetId: string; chartType: ChartType }>
    ) => {
      const widget = state.widgets.find((w) => w.id === action.payload.widgetId);
      if (widget?.type === "chart") {
        (widget.settings as ChartSettings).chartType = action.payload.chartType;
      }
    },

    updateChartSettings: (
      state,
      action: PayloadAction<{ id: string; data: ChartRow[] }>
    ) => {
      const widget = state.widgets.find((w) => w.id === action.payload.id);
      if (widget?.type === "chart") {
        (widget.settings as ChartSettings).data = action.payload.data;
      }
    },

    updateTableCell: (
      state,
      action: PayloadAction<{
        widgetId: string;
        rowIndex: number;
        column: string;
        value: string;
      }>
    ) => {
      const { widgetId, rowIndex, column, value } = action.payload;
      const widget = state.widgets.find((w) => w.id === widgetId);
      if (widget?.type === "table") {
        (widget.settings as TableSettings).data[rowIndex][column] = value;
      }
    },

    addTableRow: (state, action: PayloadAction<{ widgetId: string }>) => {
      const widget = state.widgets.find((w) => w.id === action.payload.widgetId);
      if (widget?.type === "table") {
        const newRow: TableRow = {};
        (widget.settings as TableSettings).columns.forEach(col => newRow[col] = "");
        (widget.settings as TableSettings).data.push(newRow);
      }
    },

    removeTableRow: (state, action: PayloadAction<{ widgetId: string; rowIndex: number }>) => {
      const widget = state.widgets.find((w) => w.id === action.payload.widgetId);
      if (widget?.type === "table") {
        (widget.settings as TableSettings).data.splice(action.payload.rowIndex, 1);
      }
    },

    setSelectedRow: (state, action: PayloadAction<{ widgetId: string; rowIndex: number }>) => {
      const widget = state.widgets.find((w) => w.id === action.payload.widgetId);
      if (widget?.type === "table") {
        (widget.settings as any).selectedRow = action.payload.rowIndex;
      }
    },

    updateLayout: (state, action: PayloadAction<Layout[]>) => {
      action.payload.forEach(layout => {
        const widget = state.widgets.find(w => w.id === layout.i);
        if (widget) widget.layout = layout;
      });
    },
  },
});

export const {
  loadWidgets,
  addWidget,
  removeWidget,
  clearWidgets,
  selectWidget,
  updateChartRow,
  addChartRow,
  removeChartRow,
  updateChartType,
  updateChartSettings,
  updateTableCell,
  addTableRow,
  removeTableRow,
  setSelectedRow,
  updateLayout,
  updateWidgetTitle,
} = widgetsSlice.actions;

export default widgetsSlice.reducer;
