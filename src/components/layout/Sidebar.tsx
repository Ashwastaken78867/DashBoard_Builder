// src/components/layout/Sidebar.tsx
import { Button } from "@/components/ui/button";
import { PlusCircle, Table2, BarChart3, Paintbrush2, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addWidget, clearWidgets } from "@/redux/widgetsSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");

  return (
    <aside className="h-full w-64 border-r bg-muted p-4 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Section: Add Widgets */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Add Widgets</h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => dispatch(addWidget("table"))}
            >
              <Table2 className="mr-2 h-4 w-4" /> Add Table
            </Button>

            <div>
              <Label className="text-sm mb-1 block">Chart Type</Label>
              <Select
                defaultValue={chartType}
                onValueChange={(value) =>
                  setChartType(value as "bar" | "line" | "pie")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar</SelectItem>
                  <SelectItem value="line">Line</SelectItem>
                  <SelectItem value="pie">Pie</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="mt-2 w-full justify-start"
                onClick={() =>
                  dispatch(addWidget({ type: "chart", chartType }))
                }
              >
                <BarChart3 className="mr-2 h-4 w-4" /> Add Chart
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Section: Tools */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Tools</h2>
          <Button variant="ghost" className="w-full justify-start">
            <Paintbrush2 className="mr-2 h-4 w-4" /> Theme
          </Button>
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={() => dispatch(clearWidgets())}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Clear All
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
