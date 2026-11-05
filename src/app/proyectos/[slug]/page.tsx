import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getProject, projects } from "@/data/projects";
import { Browser, Phone } from "@/components/ui/Devices";
import { ScrollPeek } from "@/components/ui/ScrollPeek";
import { ArrowIcon, ExternalIcon } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: `${p.name}, ${p.business}`, description: p.summary };
}

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-champagne">{children}</h2>
);

const showPending = process.env.NODE_ENV !== "production";

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];
  const labels = project.categories.map((c) => categories.find((x) => x.id === c)?.label).filter(Boolean);
  const host = project.url ? project.url.replace(/^https?:\/\//, "") : "En desarrollo";

  return (
    <article className="px-5 pb-24 pt-28 sm:px-8 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <Link href="/#proyectos" className="inline-flex min-h-11 items-center gap-2 text-sm text-ivory-dim transition-colors hover:text-champagne">
          <ArrowIcon className="rotate-180" /> Todos los proyectos
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]">
              <span className="text-champagne">{labels.join(" · ")}</span>
              {project.kind !== "produccion" && <span className="rounded-full border border-champagne/50 px-3 py-1 text-[0.65rem] tracking-[0.2em] text-champagne">{project.kind === "en-curso" ? "En curso" : "Demostración"}</span>}
            </div>
            <h1 className="mt-5 text-[clamp(2.4rem,8vw,5.5rem)] font-semibold uppercase leading-none tracking-tight">{project.name}</h1>
            <p className="mt-5 text-lg text-ivory-dim">{project.business}</p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            {project.url && (
              <ButtonLink href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visitar sitio, ${host} (se abre en otra pestaña)`}>
              Visitar sitio <ExternalIcon />
            </ButtonLink>
            )}
          </div>
        </header>

        {project.publicNote && (
          <p className="mt-8 max-w-2xl border-l-2 border-champagne pl-4 text-sm leading-relaxed text-ivory-dim">{project.publicNote}</p>
        )}

        {/* Capturas reales: escritorio recorrible + móvil */}
        <Reveal className="mt-12 grid items-center gap-6 rounded-3xl bg-[radial-gradient(70%_80%_at_50%_30%,rgb(201_165_122/0.18),transparent_75%)] p-4 sm:p-10 lg:grid-cols-[1fr_230px] lg:gap-12">
          <Browser url={host}>
            {project.shots.desktopFull ? (
              <ScrollPeek shot={project.shots.desktopFull} alt={`Captura de la página completa de ${project.name} en escritorio`} frame="aspect-[16/11]" seconds={14} toggle priority sizes="(min-width: 1024px) 800px, 90vw" />
            ) : (
              <Image src={project.shots.desktop.src} width={project.shots.desktop.w} height={project.shots.desktop.h} alt={`Captura de ${project.name} en escritorio`} priority unoptimized sizes="(min-width: 1024px) 800px, 90vw" className="block h-auto w-full" />
            )}
          </Browser>
          <div className="mx-auto w-[min(60vw,230px)]">
            <Phone shot={project.shots.mobile} alt={`Captura de ${project.name} en celular`} sizes="230px" />
          </div>
        </Reveal>

        <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <H>Objetivo</H>
            <p className="text-xl leading-relaxed sm:text-2xl">{project.objective}</p>
            <div className="mt-12">
              <H>Qué hicimos</H>
              <ul className="space-y-4">
                {project.work.map((w) => (
                  <li key={w} className="flex gap-4 text-base leading-relaxed text-ivory-dim">
                    <span className="mt-3 h-px w-5 shrink-0 bg-champagne" aria-hidden="true" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <H>Funcionalidades</H>
            <ul className="divide-y divide-graphite border-y border-graphite">
              {project.features.map((f) => (
                <li key={f} className="py-4 text-base">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <H>Tecnologías</H>
              <ul className="flex flex-wrap gap-2.5">
                {project.tech.map((t) => (
                  <li key={t} className="rounded-full border border-champagne/40 px-4 py-2 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {showPending && (
          <aside className="mt-16 rounded-xl border border-dashed border-red-400/50 p-5 text-sm text-red-300" aria-label="Datos pendientes">
            <p className="mb-2 font-semibold">Pendiente de confirmar (solo visible en desarrollo)</p>
            <ul className="list-disc space-y-1 pl-5">
              {project.pending.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </aside>
        )}

        <Reveal className="mt-20 flex flex-col items-start gap-4 border-t border-graphite pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg">¿Querés algo parecido para tu negocio?</p>
          <ButtonLink href="/?servicio=desarrollo-web#contacto" variant="ghost">
            Contanos tu idea
          </ButtonLink>
        </Reveal>

        <Link href={`/proyectos/${next.slug}`} data-cursor className="group mt-16 block border-t border-graphite pt-10" aria-label={`Siguiente proyecto: ${next.name}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-champagne">Siguiente proyecto</span>
          <span className="mt-4 flex items-center justify-between gap-6">
            <span className="text-[clamp(1.8rem,6vw,4rem)] font-semibold uppercase leading-none tracking-tight transition-colors group-hover:text-champagne">{next.name}</span>
            <ArrowIcon className="size-10 shrink-0 text-champagne transition-transform duration-500 group-hover:translate-x-3" />
          </span>
        </Link>
      </div>
    </article>
  );
}
