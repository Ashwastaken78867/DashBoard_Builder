// src/components/widgets/ChartWidget.tsx

import {
  BarChart,
  LineChart,
  PieChart,
  Pie,
  Line,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import type { Widget, ChartSettings } from "@/redux/widgetTypes";
import {
  removeWidget,
  selectWidget,
} from "@/redux/widgetsSlice";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { MouseEvent } from "react";

interface Props {
  widget: Widget;
}

const ChartWidget = ({ widget }: Props) => {
  const dispatch = useDispatch();

  if (widget.type !== "chart") return null;

  const liveWidget = useSelector((state: RootState) =>
    state.widgets.widgets.find((w) => w.id === widget.id)
  );

  if (!liveWidget || liveWidget.type !== "chart") return null;

  const { chartType, data } = liveWidget.settings as ChartSettings;

  const chartData = data.map((d) => ({
    name: d.xLabel,
    value: d.yValue,
    color: d.color,
  }));

  const isDataEmpty =
    chartData.length === 0 ||
    chartData.some((d) => !d.name || d.value === undefined || d.value === null);

  const fallbackColors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#00C49F",
    "#0088FE",
  ];

  const baseAxisStyle = {
    tick: { fill: "#6b7280", fontSize: 12 },
    stroke: "#d1d5db",
  };

  const handleDeleteWidget = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(removeWidget(widget.id));
  };

  const handleWidgetClick = (e: MouseEvent) => {
    e.preventDefault();
    if (e.button === 0) {
      dispatch(selectWidget(widget.id));
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" {...baseAxisStyle} />
            <YAxis {...baseAxisStyle} />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={
                    entry.color && entry.color !== "#000000"
                      ? entry.color
                      : fallbackColors[index % fallbackColors.length]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        );
      case "line":
        return (
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" {...baseAxisStyle} />
            <YAxis {...baseAxisStyle} />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4f46e5"
              strokeWidth={2.5}
              dot={{
                r: 4,
                stroke: "#4f46e5",
                strokeWidth: 2,
                fill: "#fff",
              }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {chartData.map((entry, index) => {
                const color =
                  entry.color && entry.color !== "#000000"
                    ? entry.color
                    : fallbackColors[index % fallbackColors.length];
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      default:
        return (
          <div className="text-center text-sm text-red-500">
            Invalid chart type selected.
          </div>
        );
    }
  };

  const title =
    liveWidget.title?.trim() ||
    (chartType?.charAt(0).toUpperCase() + chartType?.slice(1) + " Chart");

  return (
    <div
      className="relative group w-full h-full"
      onMouseDown={handleWidgetClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDeleteWidget}
        className="absolute -top-3 -right-3 z-50 bg-white dark:bg-slate-800 border shadow hover:bg-red-100 dark:hover:bg-red-900 text-red-500 transition-opacity opacity-0 group-hover:opacity-100"
        style={{ pointerEvents: "auto" }}
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <div className="w-full h-full flex flex-col p-3 bg-background rounded border shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-base font-medium">{title}</span>
        </div>

        <div className="w-full aspect-[16/9] min-h-[200px]">
          {isDataEmpty ? (
            <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground italic">
              No chart data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartWidget;
