import { useState } from "react";
import { generateShades, generateHarmony, exportToJSON, exportToCSS } from "./utils/colorutils";
import TopNav from "./components/TopNav";
import ControlsPanel from "./components/ControlsPanel";
import OutputPanel from "./components/OutputPanel";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [color, setColor] = useState("#6366f1");
  const [hexInput, setHexInput] = useState("#6366f1");

  const shades = generateShades(color);
  const harmony = generateHarmony(color);

  const handleHexInput = (val) => {
    setHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setColor(val);
  };

  const handleExport = () => {
    const json = exportToJSON(color, shades, harmony);
    const css = exportToCSS(color, shades, harmony);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette-${color.replace('#', '')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Toaster position="top-center" />
      <div className="max-w-[1400px] mx-auto px-6 pb-12">
        <TopNav handleExport={handleExport} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT PANEL: Controls */}
          <div className="lg:col-span-4">
            <ControlsPanel
              color={color}
              setColor={setColor}
              hexInput={hexInput}
              handleHexInput={handleHexInput}
            />
          </div>

          {/* RIGHT PANEL: Output */}
          <div className="lg:col-span-8">
            <OutputPanel shades={shades} harmony={harmony} color={color} />
          </div>
        </div>
      </div>
    </div>
  );
}
