// src/components/layout/Canvas.tsx
import { Responsive, WidthProvider, type Layout } from "react-grid-layout";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { updateLayout, selectWidget } from "@/redux/widgetsSlice";
import ChartWidget from "../widgets/ChartWidget";
import TableWidget from "../widgets/TableWidget";
import { Card, CardContent } from "@/components/ui/card";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Canvas = () => {
  const dispatch = useDispatch();
  const widgets = useSelector((state: RootState) => state.widgets.widgets);

  const handleLayoutChange = (currentLayout: Layout[]) => {
    dispatch(updateLayout(currentLayout));
  };

  const layouts = {
    lg: widgets.map((widget) => ({
      ...widget.layout,
      i: widget.id,
      minW: 3,
      minH: 5,
    })),
  };

  return (
    <div className="flex-1 bg-muted p-6 overflow-auto">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={40} // increased from 30 → 40
        isDraggable
        isResizable
        onLayoutChange={handleLayoutChange}
        measureBeforeMount
        useCSSTransforms
        compactType="vertical"
        preventCollision={false}
        margin={[16, 16]}
        containerPadding={[16, 16]}
      >
        {widgets.map((widget) => (
          <div
            key={widget.id}
            data-grid={{ ...widget.layout, minW: 3, minH: 5 }}
            onClick={() => dispatch(selectWidget(widget.id))}
          >
            <Card className="w-full h-full rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-4 h-full flex flex-col justify-between overflow-hidden">
                {widget.type === "chart" ? (
                  <ChartWidget widget={widget} />
                ) : widget.type === "table" ? (
                  <TableWidget widget={widget} />
                ) : (
                  <div className="text-sm text-gray-500">Unknown widget type</div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Canvas;
