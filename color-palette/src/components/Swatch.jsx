import { getTextColor } from "../utils/colorutils.js";
import toast from "react-hot-toast";

export default function Swatch({ hex, label }) {
  const textColor = getTextColor(hex);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    toast.success(`${hex} copied!`, {
      style: { background: "#333", color: "#fff", borderRadius: "8px" }
    });
  };

  return (
    <div
      onClick={handleCopy}
      className="flex-1 min-w-[52px] h-28 rounded-xl cursor-pointer
                 flex flex-col justify-end p-2.5 border border-white/5
                 hover:-translate-y-1.5 transition-all duration-200
                 shadow-sm hover:shadow-xl group relative overflow-hidden"
      style={{ backgroundColor: hex }}
    >
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
      <span className="text-[10px] font-bold tracking-wide relative z-10" style={{ color: textColor }}>
        {label}
      </span>
      <span className="text-[10px] font-mono opacity-80 relative z-10" style={{ color: textColor }}>
        {hex}
      </span>
    </div>
  );
}