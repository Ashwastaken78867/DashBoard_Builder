// src/components/widgets/TableWidget.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Widget } from "@/redux/widgetsSlice";
import { useDispatch } from "react-redux";
import { updateTableCell, setSelectedRow } from "@/redux/widgetsSlice"; // ✅ ADDED: setSelectedRow

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
    selectedRow?: number; // ✅ optional selected row
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

  const handleRowClick = (rowIndex: number) => {
    dispatch(setSelectedRow({ widgetId: widget.id, rowIndex })); // ✅ row click sets selectedRow
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Table</CardTitle>
      </CardHeader>
      <CardContent>
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
                onClick={() => handleRowClick(rowIndex)} // ✅ make row clickable
                className={
                  selectedRow === rowIndex
                    ? "bg-blue-100 cursor-pointer"
                    : "cursor-pointer"
                }
              >
                {columns.map((col) => (
                  <TableCell key={col}>
                    <input
                      value={row[col]}
                      onChange={(e) =>
                        handleCellChange(rowIndex, col, e.target.value)
                      }
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TableWidget;
