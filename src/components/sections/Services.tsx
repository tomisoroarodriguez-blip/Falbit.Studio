"use client";
import Link from "next/link";
import { useId, useState } from "react";
import { services } from "@/data/services";
import { getProject } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/icons";

export function Services() {
  const [open, setOpen] = useState<string>(services[0].id);
  const uid = useId();

  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="servicios-titulo"
          eyebrow="Qué hacemos"
          title={
            <>
              Soluciones digitales <span className="serif-accent">a tu medida</span>
            </>
          }
        >
          Cinco servicios. Elegí el que se parece a lo que necesitás y mirá cómo te ayudamos.
        </SectionHeading>

        <Reveal as="ul" stagger className="mt-14 border-t border-graphite">
          {services.map((s, i) => {
            const isOpen = open === s.id;
            const panel = `${uid}-${s.id}`;
            return (
              <li key={s.id} className="border-b border-graphite">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? "" : s.id)}
                    className="group flex min-h-20 w-full items-center gap-5 py-5 text-left sm:gap-8"
                  >
                    <span className={`w-8 shrink-0 text-xs font-semibold tracking-[0.25em] transition-colors ${isOpen ? "text-champagne" : "text-ivory-dim"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-[clamp(1.35rem,3.4vw,2.4rem)] font-semibold uppercase leading-tight tracking-tight transition-[color,transform] duration-500 ease-premium group-hover:translate-x-1 ${
                        isOpen ? "text-ivory" : "text-ivory-dim group-hover:text-ivory"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`relative size-10 shrink-0 rounded-full border transition-colors duration-300 ${isOpen ? "border-champagne bg-champagne" : "border-graphite group-hover:border-champagne"}`}
                    >
                      <span className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 ${isOpen ? "bg-carbon" : "bg-ivory"}`} />
                      <span
                        className={`absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${isOpen ? "scale-y-0 bg-carbon" : "bg-ivory"}`}
                      />
                    </span>
                  </button>
                </h3>
                <div id={panel} role="region" aria-label={s.title} className="acc" data-open={isOpen ? "1" : "0"} inert={!isOpen}>
                  <div>
                    <div className="grid gap-8 pb-10 pl-0 sm:pl-[3.25rem] md:grid-cols-2 md:gap-14 lg:pl-[4.25rem]">
                      <div className="space-y-6">
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-champagne">Cuando necesitás</p>
                          <p className="text-base leading-relaxed text-ivory">{s.need}</p>
                        </div>
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-champagne">Cómo te ayudamos</p>
                          <p className="text-base leading-relaxed text-ivory-dim">{s.help}</p>
                        </div>
                      </div>
                      <div>
                        <ul className="divide-y divide-graphite border-y border-graphite">
                          {s.points.map((p) => (
                            <li key={p} className="flex items-center gap-4 py-3.5 text-sm">
                              <span className="h-px w-5 shrink-0 bg-champagne" aria-hidden="true" />
                              {p}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                          <Link href={`/?servicio=${s.id}#contacto`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-champagne hover:text-champagne-soft">
                            Consultar por esto <ArrowIcon />
                          </Link>
                          {s.projects.map((slug) => {
                            const p = getProject(slug);
                            return p ? (
                              <Link key={slug} href={`/proyectos/${slug}`} className="inline-flex min-h-11 items-center text-sm text-ivory-dim underline decoration-champagne/40 underline-offset-4 hover:text-ivory">
                                Ver {p.name}
                              </Link>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
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
