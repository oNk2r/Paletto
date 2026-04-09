import toast from "react-hot-toast";

export default function HarmonyCard({ hex, label }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    toast.success(`${hex} copied!`, {
      style: { background: "#333", color: "#fff", borderRadius: "8px" }
    });
  };

  return (
    <div className="flex-1 min-w-[100px] rounded-xl border border-zinc-800
                    overflow-hidden cursor-pointer hover:-translate-y-1.5
                    transition-all duration-200 bg-zinc-900 shadow-sm
                    hover:shadow-xl hover:shadow-black/40 group"
         onClick={handleCopy}>
      <div className="h-20 w-full group-hover:opacity-90 transition-opacity" style={{ backgroundColor: hex }} />
      <div className="p-3">
        <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide truncate mb-1">{label}</p>
        <p className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
          {hex}
        </p>
      </div>
    </div>
  );
}