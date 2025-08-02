import Sidebar from "./components/layout/Sidebar";
import Canvas from "./components/layout/Canvas";
import WidgetPanel from "./components/layout/WidgetPanel";
import Header from "./components/layout/Header";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col h-screen bg-background text-foreground">
        {/* Top Navbar */}
        <Header />

        {/* Main Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <aside className="w-64 border-r bg-muted">
            <Sidebar />
          </aside>

          {/* Center Canvas */}
          <main className="flex-1 overflow-auto p-4 bg-background">
            <Canvas />
          </main>

          {/* Right Widget Panel */}
          <aside className="w-72 border-l bg-muted">
            <WidgetPanel />
          </aside>
        </div>
      </div>
    </Provider>
  );
}

export default App;
