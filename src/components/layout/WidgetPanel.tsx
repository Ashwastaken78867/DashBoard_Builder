// src/components/layout/WidgetPanel.tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  updateChartRow,
  updateChartType,
  addChartRow,
  removeChartRow,
  updateTableCell,
  addTableRow,
  removeTableRow,
  type ChartSettings,
  type TableSettings,
} from "@/redux/widgetsSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

const WidgetPanel = () => {
  const selectedWidgetId = useSelector(
    (state: RootState) => state.widgets.selectedWidgetId
  );
  const widget = useSelector((state: RootState) =>
    state.widgets.widgets.find((w) => w.id === selectedWidgetId)
  );
  const dispatch = useDispatch();

  if (!widget) return null;

  return (
    <aside className="w-72 bg-white border-l p-4 overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Widget Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Chart Settings */}
          {widget.type === "chart" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Chart Type</label>
                <select
                  className="border px-2 py-1 rounded text-sm w-full"
                  value={(widget.settings as ChartSettings).chartType}
                  onChange={(e) =>
                    dispatch(
                      updateChartType({
                        widgetId: widget.id,
                        chartType: e.target.value as ChartSettings["chartType"],
                      })
                    )
                  }
                >
                  <option value="bar">Bar</option>
                  <option value="line">Line</option>
                  <option value="pie">Pie</option>
                </select>
              </div>

              <h3 className="font-semibold text-sm">Chart Data</h3>
              {(widget.settings as ChartSettings).data.map((row, index) => (
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
          )}

          {/* Table Settings - Only Selected Row */}
          {widget.type === "table" && (
            <>
              <h3 className="text-lg font-semibold mb-2">Table Row Editor</h3>
              {(() => {
                const { columns, data, selectedRow } = widget.settings as TableSettings & {
                  selectedRow?: number;
                };

                if (
                  selectedRow === undefined ||
                  selectedRow < 0 ||
                  selectedRow >= data.length
                ) {
                  return (
                    <p className="text-muted-foreground text-sm">
                      No row selected
                    </p>
                  );
                }

                return (
                  <div className="space-y-2">
                    {columns.map((col: string) => (
                      <div key={col} className="flex flex-col">
                        <label className="text-sm font-medium mb-1">{col}</label>
                        <Input
                          value={data[selectedRow][col]}
                          onChange={(e) =>
                            dispatch(
                              updateTableCell({
                                widgetId: widget.id,
                                rowIndex: selectedRow,
                                column: col,
                                value: e.target.value,
                              })
                            )
                          }
                        />
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="self-end mt-2 text-red-500"
                      onClick={() =>
                        dispatch(removeTableRow({ widgetId: widget.id, rowIndex: selectedRow }))
                      }
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete Row
                    </Button>
                  </div>
                );
              })()}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={() => dispatch(addTableRow({ widgetId: widget.id }))}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Row
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </aside>
  );
};

export default WidgetPanel;
