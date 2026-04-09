import { getContrastRatio } from "../utils/colorutils";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export default function UIPreview({ baseColor }) {
  const contrastWhite = getContrastRatio(baseColor, "#ffffff").toFixed(2);
  const contrastBlack = getContrastRatio(baseColor, "#000000").toFixed(2);

  const getWcagStatus = (ratio) => {
    if (ratio >= 7) return { label: "AAA", icon: CheckCircle2, color: "text-green-500" };
    if (ratio >= 4.5) return { label: "AA", icon: CheckCircle2, color: "text-green-400" };
    if (ratio >= 3) return { label: "AA Large", icon: AlertTriangle, color: "text-yellow-500" };
    return { label: "Fail", icon: XCircle, color: "text-red-500" };
  };

  const statusWhite = getWcagStatus(contrastWhite);
  const statusBlack = getWcagStatus(contrastBlack);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Light Context Preview */}
      <div className="bg-white rounded-xl p-6 border border-zinc-200">
        <h4 className="text-zinc-900 font-semibold mb-4 text-sm">Light Context</h4>
        <button
          style={{ backgroundColor: baseColor, color: getContrastRatio(baseColor, "#ffffff") >= 4.5 ? "#ffffff" : "#000000" }}
          className="w-full py-2.5 rounded-lg font-medium text-sm transition-transform hover:scale-[1.02] shadow-sm mb-4"
        >
          Primary Button
        </button>
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500">WCAG vs White</span>
          <div className={`flex items-center gap-1 font-medium ${statusWhite.color}`}>
            <statusWhite.icon className="w-3.5 h-3.5" />
            {statusWhite.label} ({contrastWhite})
          </div>
        </div>
      </div>

      {/* Dark Context Preview */}
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h4 className="text-white font-semibold mb-4 text-sm">Dark Context</h4>
        <button
          style={{ backgroundColor: baseColor, color: getContrastRatio(baseColor, "#000000") >= 4.5 ? "#000000" : "#ffffff" }}
          className="w-full py-2.5 rounded-lg font-medium text-sm transition-transform hover:scale-[1.02] shadow-sm mb-4"
        >
          Primary Button
        </button>
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400">WCAG vs Black</span>
          <div className={`flex items-center gap-1 font-medium ${statusBlack.color}`}>
            <statusBlack.icon className="w-3.5 h-3.5" />
            {statusBlack.label} ({contrastBlack})
          </div>
        </div>
      </div>
    </div>
  );
}
