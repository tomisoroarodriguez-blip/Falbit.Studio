"use client";
import Image from "next/image";
import { useState } from "react";
import type { Shot } from "@/data/projects";

type Props = {
  shot: Shot;
  alt: string;
  /** Clase con la proporción del visor, p. ej. "aspect-[16/10]". */
  frame: string;
  /** Duración del recorrido completo. */
  seconds?: number;
  /** Muestra un botón para recorrer la página (útil en táctil y teclado). Sin botón, se recorre con hover/foco del contenedor `.peek-group`. */
  toggle?: boolean;
  sizes?: string;
  priority?: boolean;
};

// Muestra una captura de página completa y la "recorre" moviendo object-position (barato: sin JS por frame).
export function ScrollPeek({ shot, alt, frame, seconds = 10, toggle = false, sizes = "(min-width: 1024px) 50vw, 100vw", priority }: Props) {
  const [run, setRun] = useState(false);
  return (
    <div className="relative">
      <div className={`peek relative w-full overflow-hidden ${frame}`} data-run={run ? "1" : "0"} style={{ ["--peek-dur" as string]: `${seconds}s` }}>
        <Image src={shot.src} width={shot.w} height={shot.h} alt={alt} sizes={sizes} priority={priority} unoptimized className="absolute inset-0 h-full w-full object-cover" />
      </div>
      {toggle && (
        <button
          type="button"
          aria-pressed={run}
          onClick={() => setRun((v) => !v)}
          className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-champagne/50 bg-carbon/85 px-4 text-xs font-semibold tracking-wide text-ivory backdrop-blur transition-colors hover:bg-champagne hover:text-carbon"
        >
          {run ? "Volver arriba" : "Recorrer la página"}
        </button>
      )}
    </div>
  );
}
