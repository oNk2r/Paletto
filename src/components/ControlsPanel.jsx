import { Copy, Shuffle } from "lucide-react";
import { hexToHsl, hexToRgb } from "../utils/colorutils";
import toast from "react-hot-toast";

export default function ControlsPanel({ color, setColor, hexInput, handleHexInput }) {
  const handleRandom = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor(randomHex);
    handleHexInput(randomHex);
  };

  const copyColor = () => {
    navigator.clipboard.writeText(color);
    toast.success("Hex copied to clipboard", {
      style: { background: "#333", color: "#fff", borderRadius: "8px" }
    });
  };

  const rgb = hexToRgb(color).join(", ");
  const hslArgs = hexToHsl(color);
  const hsl = `${hslArgs[0]}, ${hslArgs[1]}%, ${hslArgs[2]}%`;

  return (
    <div className="flex flex-col gap-8 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/80 shadow-xl">
      <div>
        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">
          Base Color
        </label>
        <div className="relative group w-full h-40 rounded-xl overflow-hidden shadow-inner ring-1 ring-inset ring-white/10">
          <input
            type="color"
            value={color}
            onChange={(e) => { setColor(e.target.value); handleHexInput(e.target.value); }}
            className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">HEX</label>
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexInput(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm font-mono text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">RGB</label>
            <div className="w-full bg-zinc-950/50 border border-zinc-800/50 rounded-lg px-4 py-3 text-sm font-mono text-zinc-400">
              {rgb}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">HSL</label>
            <div className="w-full bg-zinc-950/50 border border-zinc-800/50 rounded-lg px-4 py-3 text-sm font-mono text-zinc-400">
              {hsl}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={copyColor}
          className="flex items-center justify-center gap-2 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-sm font-medium transition-colors"
        >
          <Copy className="w-4 h-4" /> Copy Hex
        </button>
        <button
          onClick={handleRandom}
          className="flex items-center justify-center gap-2 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-sm font-medium transition-colors"
        >
          <Shuffle className="w-4 h-4" /> Random
        </button>
      </div>
    </div>
  );
}
