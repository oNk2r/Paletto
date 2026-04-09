import { Palette, Download } from "lucide-react";

export default function TopNav({ handleExport }) {
  return (
    <header className="flex items-center justify-between py-5 mb-8 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Palette className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Paletto
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-white text-zinc-900 rounded-lg font-medium text-sm hover:bg-zinc-200 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
    </header>
  );
}
