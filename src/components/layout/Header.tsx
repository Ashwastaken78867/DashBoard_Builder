// src/components/layout/Header.tsx
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import domtoimage from "dom-to-image-more";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const handleExportPNG = async () => {
    const canvasEl = document.getElementById("dashboard-canvas");
    if (!canvasEl) return console.error("Dashboard container not found");

    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    const originalHtmlBg = htmlEl.style.backgroundColor;
    const originalBodyBg = bodyEl.style.backgroundColor;
    const originalTheme = htmlEl.getAttribute("data-theme");
    const prevTransform = canvasEl.style.transform;

    // Set temporary plain background colors
    htmlEl.style.backgroundColor = theme === "dark" ? "#000" : "#fff";
    bodyEl.style.backgroundColor = theme === "dark" ? "#000" : "#fff";
    htmlEl.setAttribute("data-theme", "exporting");
    canvasEl.style.transform = "none";

    await new Promise((res) => setTimeout(res, 100));

    try {
      const dataUrl = await domtoimage.toPng(canvasEl);

      const link = document.createElement("a");
      link.download = "dashboard.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      // Revert to original styles
      htmlEl.style.backgroundColor = originalHtmlBg;
      bodyEl.style.backgroundColor = originalBodyBg;
      htmlEl.setAttribute("data-theme", originalTheme || "");
      canvasEl.style.transform = prevTransform;
    }
  };

  return (
    <header className="w-full flex items-center justify-between px-4 py-2 border-b bg-background">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">🧩 Dashboard Builder</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* <Input
          type="text"
          placeholder="Search widgets..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[200px]"
        /> */}

        {/* Export Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleExportPNG}
          title="Export as PNG"
        >
          🖼️
        </Button>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          title="Toggle Theme"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;
