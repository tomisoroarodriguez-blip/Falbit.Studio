import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Sin cifras, años de trayectoria ni integrantes: no hay datos confirmados. Solo lo que sí se sabe.
const pillars = [
  { t: "Claridad", d: "Cada sitio o sistema tiene que ser fácil de entender y de usar, para vos y para quien lo visita." },
  { t: "Cuidado técnico", d: "Código moderno, páginas rápidas y pensadas para celular, con atención al detalle." },
  { t: "Trato directo", d: "Hablás con quien diseña y programa tu proyecto. Sin intermediarios ni vueltas." },
];

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <div>
          <SectionHeading
            id="sobre-titulo"
            eyebrow="Sobre Falbit"
            title={
              <>
                Estudio digital <span className="serif-accent">desde Uruguay</span>
              </>
            }
          />
          <Reveal className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-ivory-dim sm:text-lg">
            <p>
              FALBIT Digital Studio diseña y desarrolla sitios web, tiendas online y sistemas a medida para negocios que quieren crecer en internet.
            </p>
            <p>
              El nombre junta dos ideas: <span className="text-ivory">FAL</span>, de falcon (halcón): visión, precisión y altura. Y <span className="text-ivory">BIT</span>: la unidad mínima de lo digital.
              De ahí viene nuestro lema, <span className="serif-accent text-[1.2em]">ideas que vuelan más alto</span>.
            </p>
          </Reveal>
        </div>

        <Reveal as="ul" stagger className="self-end border-t border-graphite">
          {pillars.map((p, i) => (
            <li key={p.t} className="group flex gap-6 border-b border-graphite py-7">
              <span className="pt-1 text-xs font-semibold tracking-[0.25em] text-champagne">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-xl font-semibold uppercase tracking-tight transition-colors group-hover:text-champagne">{p.t}</h3>
                <p className="mt-2 max-w-sm text-base leading-relaxed text-ivory-dim">{p.d}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
