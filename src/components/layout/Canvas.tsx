// src/components/layout/Canvas.tsx
import { useRef } from "react";
import { Responsive, WidthProvider, type Layout } from "react-grid-layout";
import { useSelector, useDispatch } from "react-redux";
import { updateLayout, selectWidget } from "@/redux/widgetsSlice";
import ChartWidget from "../widgets/ChartWidget";
import TableWidget from "../widgets/TableWidget";
import { Card, CardContent } from "@/components/ui/card";
import type { RootState } from "@/redux/store";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null); // 👈 add this
  const widgets = useSelector((state: RootState) => state.widgets.widgets);
  const layouts = useSelector((state: RootState) => state.widgets.layouts);
  const dispatch = useDispatch();

  const handleLayoutChange = (currentLayout: Layout[]) => {
    dispatch(updateLayout(currentLayout));
  };

  return (
    <div
      id="dashboard-canvas"
      ref={containerRef}
      className="p-4 bg-white dark:bg-black"
    >
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
        rowHeight={30}
        margin={[20, 20]}
        isResizable
        isDraggable
        useCSSTransforms
        compactType={null}
      >
        {widgets.map((widget) => (
          <div key={widget.id} data-grid={widget.layout}>
            <Card
              className="w-full h-full overflow-visible relative cursor-pointer"
              onClick={() => dispatch(selectWidget(widget.id))}
              onContextMenu={(e) => e.preventDefault()}
            >
              <CardContent className="w-full h-full p-4">
                {widget.type === "chart" ? (
                  <ChartWidget widget={widget} />
                ) : widget.type === "table" ? (
                  <TableWidget widget={widget} />
                ) : null}
              </CardContent>
            </Card>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
