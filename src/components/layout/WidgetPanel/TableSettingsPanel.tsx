import { useDispatch } from "react-redux";
import {
  updateTableCell,
  addTableRow,
  removeTableRow,
  updateWidgetTitle,
} from "@/redux/widgetsSlice";
import type { TableSettings } from "@/redux/widgetTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import type { Widget } from "@/redux/widgetTypes";
import { Label } from "recharts";

const TableSettingsPanel = ({ widget }: { widget: Widget }) => {
  const dispatch = useDispatch();
  const { columns, data, selectedRow } = widget.settings as TableSettings & {
    selectedRow?: number;
  };
  

  if (
    selectedRow === undefined ||
    selectedRow < 0 ||
    selectedRow >= data.length
  ) {
    return (
      <p className="text-muted-foreground text-sm">No row selected</p>
    );
  }
const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateWidgetTitle({ widgetId: widget.id, title: e.target.value }));
  };
  return (
    <>
    <div>
        <Label className="text-sm">Title</Label>
        <Input
          value={widget.title || ""}
          onChange={handleTitleChange}
          placeholder="Enter table title"
        />
      </div>
    
      <div className="space-y-2">
        {columns.map((col) => (
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
  );
};

export default TableSettingsPanel;
