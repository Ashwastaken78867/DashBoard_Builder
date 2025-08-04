// src/components/layout/Sidebar.tsx

import { Button } from "@/components/ui/button";
import {
  Table2,
  BarChart3,
  LineChart,
  PieChart,
  Trash2,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addWidget, clearWidgets } from "@/redux/widgetsSlice";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import TemplateManager from "../TemplateManager/TemplateManager";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");

  return (
    
    <aside className="h-full w-64 border-r bg-muted p-4 flex flex-col">
      <div className="space-y-6 flex-1 overflow-auto">
        {/* PANEL Title */}
        <h1 className="text-xl font-semibold mb-2">Panel</h1>



        {/* Tables Section */}
        <div>
          <Label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wide">
            Tables
          </Label>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => dispatch(addWidget("table"))}
            >
              <Table2 className="mr-2 h-4 w-4" />
              Table
            </Button>
          </div>
        </div>

        {/* Charts Section */}
        <div>
          <Label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wide">
            Charts
          </Label>
          <div className="space-y-2">
            <Button
              variant={chartType === "bar" ? "secondary" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                setChartType("bar");
                dispatch(addWidget({ type: "chart", chartType: "bar" }));
              }}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Bar Chart
            </Button>

            <Button
              variant={chartType === "line" ? "secondary" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                setChartType("line");
                dispatch(addWidget({ type: "chart", chartType: "line" }));
              }}
            >
              <LineChart className="mr-2 h-4 w-4" />
              Line Chart
            </Button>

            <Button
              variant={chartType === "pie" ? "secondary" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                setChartType("pie");
                dispatch(addWidget({ type: "chart", chartType: "pie" }));
              }}
            >
              <PieChart className="mr-2 h-4 w-4" />
              Pie Chart
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Tools */}
      <div className="space-y-2 mt-4">
        <Separator />
        
        {/* ✅ Template Dropdown */}
        <TemplateManager />

        {/* Clear All */}
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={() => dispatch(clearWidgets())}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>
    </aside>
  );
};


export default Sidebar;
