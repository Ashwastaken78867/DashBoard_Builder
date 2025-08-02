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
} from "recharts";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { Widget, ChartSettings } from "@/redux/widgetsSlice";

interface Props {
  widget: Widget;
}

const ChartWidget = ({ widget }: Props) => {
  if (widget.type !== "chart") return null;

  // ✅ Pull fresh widget from store using ID
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

let renderedChart: React.ReactElement | null = null;

  switch (chartType) {
    case "bar":
      renderedChart = (
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      );
      break;

    case "line":
      renderedChart = (
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={2}
          />
        </LineChart>
      );
      break;

    case "pie":
      renderedChart = (
        <PieChart>
          <Tooltip />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      );
      break;

    default:
      renderedChart = (
        <div className="text-red-500">Invalid chart type selected.</div>
      );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="font-semibold text-lg mb-2">
        Chart - {chartType.toUpperCase()}
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          {renderedChart}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartWidget;
