import { useDispatch } from "react-redux";
import {
  updateChartRow,
  addChartRow,
  removeChartRow,
} from "@/redux/widgetsSlice";
import type { ChartSettings } from "@/redux/widgetTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import type { Widget } from "@/redux/widgetTypes";

const ChartSettingsPanel = ({ widget }: { widget: Widget }) => {
  const dispatch = useDispatch();
  const settings = widget.settings as ChartSettings;

  return (
   <div className="space-y-4">
  <div className="space-y-2">
    <label className="text-sm font-medium">Chart Title</label>
    <Input
      value={widget.title || ""}
      onChange={(e) =>
        dispatch({
          type: "widgets/updateWidgetTitle",
          payload: {
            widgetId: widget.id,
            title: e.target.value,
          },
        })
      }
      placeholder="Enter chart title"
    />
  </div>
  {/* rest of your existing panel */}


      <h3 className="font-semibold text-sm">Chart Data</h3>
      {settings.data.map((row, index) => (
        <div key={index} className="flex gap-2 items-center">
          <Input
            value={row.xLabel}
            placeholder="Label"
            onChange={(e) =>
              dispatch(
                updateChartRow({
                  widgetId: widget.id,
                  index,
                  field: "xLabel",
                  value: e.target.value,
                })
              )
            }
          />
          <Input
            type="number"
            value={row.yValue}
            placeholder="Value"
            onChange={(e) =>
              dispatch(
                updateChartRow({
                  widgetId: widget.id,
                  index,
                  field: "yValue",
                  value: Number(e.target.value),
                })
              )
            }
          />
          <input
            type="color"
            value={row.color}
            onChange={(e) =>
              dispatch(
                updateChartRow({
                  widgetId: widget.id,
                  index,
                  field: "color",
                  value: e.target.value,
                })
              )
            }
            className="h-9 w-10 border rounded"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              dispatch(removeChartRow({ widgetId: widget.id, index }))
            }
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="w-full mt-2"
        onClick={() => dispatch(addChartRow({ widgetId: widget.id }))}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Row
      </Button>
    </div>
  );
};

export default ChartSettingsPanel;
