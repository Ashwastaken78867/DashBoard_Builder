import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Widget } from "@/redux/widgetTypes";
import { useDispatch } from "react-redux";
import {
  updateTableCell,
  setSelectedRow,
  removeWidget,
  selectWidget,
} from "@/redux/widgetsSlice";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { MouseEvent } from "react";

interface Props {
  widget: Widget;
}

const TableWidget = ({ widget }: Props) => {
  const dispatch = useDispatch();

  if (widget.type !== "table") {
    return <div className="text-red-500">Invalid widget</div>;
  }

  const { columns, data, selectedRow } = widget.settings as {
    columns: string[];
    data: Record<string, string>[];
    selectedRow?: number;
  };

  const handleCellChange = (
    rowIndex: number,
    column: string,
    value: string
  ) => {
    dispatch(
      updateTableCell({
        widgetId: widget.id,
        rowIndex,
        column,
        value,
      })
    );
  };

  const handleRowClick = (e: MouseEvent, rowIndex: number) => {
    if (e.button !== 0) return; // Only allow left-click
    dispatch(selectWidget(widget.id));
    dispatch(setSelectedRow({ widgetId: widget.id, rowIndex }));
  };

  const handleDeleteWidget = (e: MouseEvent) => {
    e.stopPropagation(); // Prevent parent onClick
    dispatch(removeWidget(widget.id));
  };

  const handleWidgetClick = (e: MouseEvent) => {
    e.preventDefault(); // Prevent right-click context menu
    if (e.button === 0) {
      dispatch(selectWidget(widget.id));
    }
  };

  return (
    <div
      className="relative group w-full h-full"
      onMouseDown={handleWidgetClick}
      onContextMenu={(e) => e.preventDefault()} // Disable context menu
    >
      {/* Delete Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDeleteWidget}
        className="absolute -top-3 -right-3 z-50 bg-white dark:bg-slate-800 border shadow hover:bg-red-100 dark:hover:bg-red-900 text-red-500 transition-opacity opacity-0 group-hover:opacity-100"
        style={{ pointerEvents: "auto" }}
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      {/* Main Table Container */}
      <div className="w-full h-full flex flex-col p-3 bg-background rounded border shadow-sm">
        {/* Title & Actions */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-base font-medium">
            {widget.title || "Table"}
          </span>
        </div>

        <div className="overflow-auto flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col}>{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onMouseDown={(e) => handleRowClick(e, rowIndex)}
                  className={
                    selectedRow === rowIndex
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  }
                >
                  {columns.map((col) => (
                    <TableCell key={col}>
                      <input
                        value={row[col]}
                        onChange={(e) =>
                          handleCellChange(rowIndex, col, e.target.value)
                        }
                        className="w-full px-2 py-1 border rounded text-sm bg-white dark:bg-slate-900 dark:text-white"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TableWidget;
