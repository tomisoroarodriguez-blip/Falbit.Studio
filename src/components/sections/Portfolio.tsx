"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categories, projects, type CategoryId, type Project } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Phone } from "@/components/ui/Devices";
import { ScrollPeek } from "@/components/ui/ScrollPeek";
import { ArrowIcon, ExternalIcon } from "@/components/ui/icons";

type Filter = "todos" | CategoryId;

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <article className="pop-in peek-group group flex flex-col lg:[&:nth-child(even)]:mt-20" style={{ ["--i" as string]: i }} data-cursor>
      <div className="relative overflow-hidden rounded-2xl border border-champagne/20 bg-[radial-gradient(80%_80%_at_50%_0%,rgb(201_165_122/0.16),transparent_75%)] p-4 pb-0 sm:p-6 sm:pb-0">
        <div className="overflow-hidden rounded-t-lg border border-b-0 border-graphite bg-carbon">
          <div className="flex h-6 items-center gap-1.5 border-b border-graphite bg-[#161616] px-3" aria-hidden="true">
            <i className="size-1.5 rounded-full bg-graphite" />
            <i className="size-1.5 rounded-full bg-graphite" />
            <i className="size-1.5 rounded-full bg-graphite" />
          </div>
          {p.shots.desktopFull ? (
            <ScrollPeek shot={p.shots.desktopFull} alt={`Captura de la página completa de ${p.name}`} frame="aspect-[16/11]" seconds={12} sizes="(min-width: 1024px) 560px, 90vw" />
          ) : (
            <div className="relative aspect-[16/11]">
              <Image src={p.shots.desktop.src} width={p.shots.desktop.w} height={p.shots.desktop.h} alt={`Captura de ${p.name}`} unoptimized sizes="(min-width: 1024px) 560px, 90vw" className="h-full w-full object-cover object-top" />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 right-6 w-[22%] max-w-[120px] translate-y-3 transition-transform duration-500 ease-premium group-hover:translate-y-0 sm:right-10" aria-hidden="true">
          <Phone shot={p.shots.mobile} alt="" sizes="120px" className="rounded-b-none" />
        </div>
        {/* El enlace de la imagen es un atajo para mouse y toque; el teclado usa los botones de abajo */}
        <Link href={`/proyectos/${p.slug}`} tabIndex={-1} aria-hidden="true" className="absolute inset-0" />
        {p.kind !== "produccion" && (
          <span className="absolute left-6 top-6 rounded-full border border-champagne/50 bg-carbon/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-champagne sm:left-8 sm:top-8">
            {p.kind === "en-curso" ? "En curso" : "Demostración"}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-champagne">{p.business}</p>
        <h3 className="mt-3 text-[clamp(1.6rem,3vw,2.3rem)] font-semibold uppercase leading-tight tracking-tight">{p.name}</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-ivory-dim">{p.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Etiquetas">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full border border-graphite px-3.5 py-1.5 text-xs text-ivory-dim">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-1">
          <Link href={`/proyectos/${p.slug}`} className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-champagne transition-colors hover:text-champagne-soft" aria-label={`Ver detalles de ${p.name}`}>
            Ver detalles <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 text-sm text-ivory-dim underline decoration-champagne/40 underline-offset-4 hover:text-ivory" aria-label={`Visitar sitio de ${p.name} (se abre en otra pestaña)`}>
            Visitar sitio <ExternalIcon />
          </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("todos");
  const shown = projects.filter((p) => filter === "todos" || p.categories.includes(filter));
  const count = (id: Filter) => (id === "todos" ? projects.length : projects.filter((p) => p.categories.includes(id)).length);
  const chips: { id: Filter; label: string }[] = [{ id: "todos", label: "Todos" }, ...categories.filter((c) => count(c.id) > 0)];

  return (
    <section id="proyectos" aria-labelledby="proyectos-titulo" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="proyectos-titulo"
            eyebrow="Proyectos destacados"
            title={
              <>
                Trabajo real, <span className="serif-accent">a la vista</span>
              </>
            }
          >
            Trabajos que estamos construyendo y ya publicados. Pasá el mouse por uno para recorrerlo, o abrí la ficha para ver qué hicimos.
          </SectionHeading>

          <Reveal>
            <div role="group" aria-label="Filtrar proyectos por tipo" className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors duration-300 ${
                    filter === c.id ? "border-champagne bg-champagne text-carbon" : "border-graphite text-ivory-dim hover:border-champagne/60 hover:text-ivory"
                  }`}
                >
                  {c.label}
                  <span className={`text-xs ${filter === c.id ? "text-carbon/70" : "text-ivory-dim/70"}`}>{count(c.id)}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Mostrando {shown.length} {shown.length === 1 ? "proyecto" : "proyectos"}
        </p>

        <div key={filter} className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {shown.map((p, i) => (
            <ProjectCard key={p.slug} p={p} i={i} />
          ))}
        </div>

        <p className="mt-16 max-w-xl text-sm leading-relaxed text-ivory-dim">
          Las imágenes son capturas reales. Los proyectos marcados <span className="text-champagne">en curso</span> todavía no están publicados.
        </p>
      </div>
    </section>
  );
}
