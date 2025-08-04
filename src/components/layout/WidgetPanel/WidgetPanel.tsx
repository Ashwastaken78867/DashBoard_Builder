// src/components/layout/WidgetPanel.tsx
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartSettingsPanel from "./ChartSettingsPanel";
import TableSettingsPanel from "./TableSettingsPanel";

const WidgetPanel = () => {
  const selectedWidgetId = useSelector(
    (state: RootState) => state.widgets.selectedWidgetId
  );
  const widget = useSelector((state: RootState) =>
    state.widgets.widgets.find((w) => w.id === selectedWidgetId)
  );

  if (!widget) return null;

  return (
    <aside className="w-72 bg-white border-l p-4 overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Widget Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {widget.type === "chart" && <ChartSettingsPanel widget={widget} />}
          {widget.type === "table" && <TableSettingsPanel widget={widget} />}
        </CardContent>
      </Card>
    </aside>
  );
};

export default WidgetPanel;
