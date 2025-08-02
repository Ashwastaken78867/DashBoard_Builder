import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { Layout } from "react-grid-layout";
import type { PayloadAction } from "@reduxjs/toolkit";
// --- Types ---
export type WidgetType = "table" | "chart";
export type ChartType = "bar" | "line" | "pie";

export type ChartRow = {
  xLabel: string;
  yValue: number;
  color: string;
};

export type ChartSettings = {
  chartType: ChartType;
  data: ChartRow[];
};
export type TableRow = Record<string, string>;

export type TableSettings = {
  columns: string[];
  data: TableRow[];
};



export type Widget = {
  id: string;
  type: WidgetType;
  layout: Layout;
  settings: ChartSettings | TableSettings;
};

interface WidgetsState {
  widgets: Widget[];
  selectedWidgetId: string | null;
}

// --- Initial State ---
const initialState: WidgetsState = {
  widgets: [],
  selectedWidgetId: null
};


// --- Slice ---
const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addWidget: (
  state,
  action: PayloadAction<WidgetType | { type: "chart"; chartType: ChartType }>
) => {
  const id = nanoid();
  const layout: Layout = { i: id, x: 0, y: Infinity, w: 6, h: 10 };

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
      state.widgets = state.widgets.filter((w) => w.id !== action.payload);
      if (state.selectedWidgetId === action.payload) {
        state.selectedWidgetId = null;
      }
    },

    clearWidgets: (state) => {
      state.widgets = [];
      state.selectedWidgetId = null;
    },

    selectWidget: (state, action: PayloadAction<string | null>) => {
      state.selectedWidgetId = action.payload;
    },

   updateChartRow: (
  state,
  action: PayloadAction<{
    widgetId: string;
    index: number;
    field: keyof ChartRow;
    value: string | number;
  }>
) => {
  const { widgetId, index, field, value } = action.payload;
  const widget = state.widgets.find((w) => w.id === widgetId);

  if (widget?.type === "chart") {
    const chart = widget.settings as ChartSettings;
    const newData = [...chart.data];
    newData[index] = {
      ...newData[index],
      [field]: value,
    };
    (widget.settings as ChartSettings).data = newData;
  }
},

  addChartRow: (state, action: PayloadAction<{ widgetId: string }>) => {
  const widget = state.widgets.find((w) => w.id === action.payload.widgetId);
  if (widget?.type === "chart") {
    const chart = widget.settings as ChartSettings;
    chart.data = [
      ...chart.data,
      { xLabel: "New Label", yValue: 0, color: "#000000" },
    ];
  }
},


   removeChartRow: (
  state,
  action: PayloadAction<{ widgetId: string; index: number }>
) => {
  const widget = state.widgets.find((w) => w.id === action.payload.widgetId);
  if (widget?.type === "chart") {
    const chart = widget.settings as ChartSettings;
    chart.data = chart.data.filter((_, i) => i !== action.payload.index);
  }
},

    updateChartType: (
  state,
  action: PayloadAction<{ widgetId: string; chartType: ChartType }>
) => {
  const { widgetId, chartType } = action.payload;
  const widget = state.widgets.find((w) => w.id === widgetId);
  if (widget?.type === "chart") {
    (widget.settings as ChartSettings).chartType = chartType;
  }
},


//     updateLayout: (
//       state,
//       action: PayloadAction<Layout>
//     ) => {
//       const widget = state.widgets.find((w) => w.id === action.payload.i);
//       if (widget) {
//         widget.layout = action.payload;
//       }
//     },
//   },
// });
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
    const table = widget.settings as TableSettings;
    if (table.data[rowIndex]) {
      table.data[rowIndex][column] = value;
    }
  }
},

addTableRow: (state, action: PayloadAction<{ widgetId: string }>) => {
  const widget = state.widgets.find((w) => w.id === action.payload.widgetId);
  if (widget?.type === "table") {
    const table = widget.settings as TableSettings;
    const newRow: TableRow = {};
    table.columns.forEach((col) => (newRow[col] = ""));
    table.data.push(newRow);
  }
},

removeTableRow: (
  state,
  action: PayloadAction<{ widgetId: string; rowIndex: number }>
) => {
  const widget = state.widgets.find((w) => w.id === action.payload.widgetId);
  if (widget?.type === "table") {
    const table = widget.settings as TableSettings;
    table.data.splice(action.payload.rowIndex, 1);
  }
},
setSelectedRow: (
  state,
  action: PayloadAction<{ widgetId: string; rowIndex: number }>
) => {
  const { widgetId, rowIndex } = action.payload;
  const widget = state.widgets.find((w) => w.id === widgetId);
  if (widget && widget.type === "table") {
    (widget.settings as any).selectedRow = rowIndex; // ✅ store selected row
  }
},
updateChartSettings: (
  state,
  action: PayloadAction<{ id: string; data: ChartRow[] }>
) => {
  const widget = state.widgets.find((w) => w.id === action.payload.id);
  if (widget && widget.type === "chart") {
    const chartSettings = widget.settings as ChartSettings;
    chartSettings.data = action.payload.data;
  }
},





 updateLayout: (state, action: PayloadAction<Layout[]>) => {
      const layoutArray = action.payload;
      layoutArray.forEach((layout) => {
        const widget = state.widgets.find((w) => w.id === layout.i);
        if (widget) {
          widget.layout = layout;
        }
      });
    },
  },
});
// --- Exports ---
// 
export const {
  addWidget,
  removeWidget,
  clearWidgets,
  selectWidget,
  updateChartRow,
  addChartRow,
  removeChartRow,
  updateTableCell,
  addTableRow,
  removeTableRow,
  updateLayout,
  updateChartSettings,
  updateChartType,
  setSelectedRow, 
} = widgetsSlice.actions;


export default widgetsSlice.reducer;
