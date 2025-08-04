import Sidebar from "./components/layout/Sidebar";
import Canvas from "./components/layout/Canvas";
import WidgetPanel from "./components/layout/WidgetPanel/WidgetPanel";
import Header from "./components/layout/Header";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";
import { loadWidgetsFromStorage, loadWidgets } from "./redux/widgetsSlice";

function LoadFromLocalStorage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedWidgets = loadWidgetsFromStorage();
    if (savedWidgets.length > 0) {
      dispatch(loadWidgets(savedWidgets));
    }
  }, [dispatch]);

  return null;
}

function App() {
  return (
    <Provider store={store}>
      <LoadFromLocalStorage />
      <div className="flex flex-col h-screen bg-background text-foreground">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-64 border-r bg-muted">
            <Sidebar />
          </aside>
          <main className="flex-1 overflow-auto p-4 bg-background">
            <Canvas />
          </main>
          <aside className="w-72 border-l bg-muted">
            <WidgetPanel />
          </aside>
        </div>
      </div>
    </Provider>
  );
}

export default App;
