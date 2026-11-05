"use client";

// Selector segmentado accesible (grupo de botones con aria-pressed).
export function Segmented<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label}>
      <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-ivory-dim">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={String(o.value)}
            type="button"
            aria-pressed={o.value === value}
            onClick={() => onChange(o.value)}
            className="min-h-11 rounded-full border px-4 text-sm transition-colors aria-pressed:border-champagne aria-pressed:bg-champagne aria-pressed:text-carbon border-graphite text-ivory hover:border-champagne/60"
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
