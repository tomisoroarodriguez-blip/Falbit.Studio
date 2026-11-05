import { hawkSvgPath, hawkViewBox } from "@/data/hawk";

// Versión SVG del halcón: póster mientras carga el 3D y alternativa estática (móviles livianos / reduced-motion).
export function HawkMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={hawkViewBox} className={className} fill="none" aria-hidden="true">
      <path
        d={hawkSvgPath}
        pathLength={1}
        className="hawk-draw"
        stroke="#c9a57a"
        strokeWidth={0.04}
        strokeLinejoin="round"
        fill="rgb(201 165 122 / 0.08)"
      />
    </svg>
  );
}
