"use client";
import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/process";
import { SectionHeading } from "@/components/ui/SectionHeading";

// El paso que cruza el centro de la pantalla se ilumina y la línea se llena hasta él.
// Sin JS (o con reduced-motion) todos los pasos se ven completos.
export function Process() {
  const [active, setActive] = useState<number | null>(null);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    setActive((a) => a ?? 0);
    return () => io.disconnect();
  }, []);

  const progress = active === null ? 1 : (active + 1) / processSteps.length;

  return (
    <section id="proceso" aria-labelledby="proceso-titulo" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="proceso-titulo"
            eyebrow="Cómo trabajamos"
            title={
              <>
                De la idea al <span className="serif-accent">lanzamiento</span>
              </>
            }
          >
            Cuatro pasos claros, desde la primera charla hasta la publicación.
          </SectionHeading>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute bottom-6 left-[1.45rem] top-6 w-px bg-graphite sm:left-[1.95rem]">
            <div className="proc-line h-full w-full bg-champagne" style={{ transform: `scaleY(${progress})` }} />
          </div>
          <ol className="space-y-6 sm:space-y-10">
            {processSteps.map((s, i) => {
              const on = active === null || i <= active;
              const current = active === i;
              return (
                <li
                  key={s.n}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  data-i={i}
                  className={`relative flex gap-5 py-4 transition-opacity duration-700 sm:gap-8 ${on ? "opacity-100" : "opacity-70"}`}
                >
                  <span
                    className={`relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border text-sm font-semibold tracking-wider transition-colors duration-500 sm:size-16 ${
                      on ? "border-champagne bg-carbon text-champagne" : "border-graphite bg-carbon text-ivory-dim"
                    } ${current ? "dot-ping bg-champagne !text-carbon" : ""}`}
                  >
                    {s.n}
                  </span>
                  <div className="pt-1 sm:pt-3">
                    <h3 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold uppercase tracking-tight">{s.title}</h3>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-ivory-dim">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
