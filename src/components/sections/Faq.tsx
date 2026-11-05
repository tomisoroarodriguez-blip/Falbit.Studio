"use client";
import { useId, useState } from "react";
import { faqs } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const showPending = process.env.NODE_ENV !== "production";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  return (
    <section id="faq" aria-labelledby="faq-titulo" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <SectionHeading
          id="faq-titulo"
          eyebrow="Preguntas frecuentes"
          title={
            <>
              Lo que nos <span className="serif-accent">preguntan</span>
            </>
          }
        >
          ¿Te queda otra duda? Escribinos desde el formulario de contacto.
        </SectionHeading>

        <Reveal as="ul" className="border-t border-graphite">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const id = `${uid}-${i}`;
            return (
              <li key={f.q} className="border-b border-graphite">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className={`text-lg font-medium transition-colors ${isOpen ? "text-champagne" : "group-hover:text-champagne"}`}>{f.q}</span>
                    <span aria-hidden="true" className={`relative size-8 shrink-0 rounded-full border transition-[transform,border-color] duration-500 ease-premium ${isOpen ? "rotate-45 border-champagne" : "border-graphite group-hover:border-champagne"}`}>
                      <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 bg-ivory" />
                      <span className="absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-ivory" />
                    </span>
                  </button>
                </h3>
                <div id={id} role="region" aria-labelledby={undefined} aria-label={f.q} className="acc" data-open={isOpen ? "1" : "0"} inert={!isOpen}>
                  <div>
                    <p className="max-w-xl pb-6 text-base leading-relaxed text-ivory-dim">{f.a}</p>
                    {showPending && f.pending && (
                      <p className="mb-6 max-w-xl rounded-lg border border-dashed border-red-400/50 px-3 py-2 text-xs text-red-300">
                        Pendiente (solo visible en desarrollo): {f.pending}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
