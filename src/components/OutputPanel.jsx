import Swatch from "./Swatch";
import HarmonyCard from "./HarmonyCard";
import UIPreview from "./UIPreview";

export default function OutputPanel({ shades, harmony, color }) {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h3 className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-4">
          Shades
        </h3>
        <div className="flex gap-2 flex-wrap">
          {shades.map((s) => (
            <Swatch key={s.label} hex={s.hex} label={s.label} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-4">
          Harmonies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {harmony.map((h) => (
            <HarmonyCard key={h.label} hex={h.hex} label={h.label} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-4">
          UI Preview
        </h3>
        <UIPreview baseColor={color} />
      </section>
    </div>
  );
}
