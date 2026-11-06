import Link from "next/link";
import { packages } from "@/data/packages";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/icons";

export function Packages() {
  return (
    <section id="paquetes" aria-labelledby="paquetes-titulo" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="paquetes-titulo"
          eyebrow="Paquetes"
          title={
            <>
              Elegí por <span className="serif-accent">lo que necesitás</span>
            </>
          }
        >
          Alcance claro desde el principio. Si tu caso es distinto, lo armamos a medida.
        </SectionHeading>

        <Reveal as="ul" stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <li key={p.id} className="group flex flex-col rounded-2xl border border-graphite bg-[#101010] p-7 transition-[border-color,transform] duration-500 ease-premium hover:-translate-y-1 hover:border-champagne/60">
              <h3 className="text-2xl font-semibold uppercase tracking-tight">{p.name}</h3>
              <p className="mt-3 text-base leading-relaxed text-ivory-dim">{p.forWho}</p>
              <ul className="mt-6 flex-1 divide-y divide-graphite border-y border-graphite">
                {p.includes.map((x) => (
                  <li key={x} className="flex gap-3 py-3 text-sm leading-relaxed">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-champagne" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-ivory-dim">
                <span className="font-semibold text-ivory">No incluye:</span> {p.notIncluded}
              </p>
              <p className="mt-5 text-sm font-semibold text-champagne">{p.range ? `Entre US$ ${p.range.min.toLocaleString("es-UY")} y US$ ${p.range.max.toLocaleString("es-UY")}, según lo que se construya` : "Presupuesto a medida"}</p>
              <Link
                href={`/?servicio=${p.service}#contacto`}
                className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-champagne/50 px-6 text-sm font-semibold transition-colors hover:bg-champagne hover:text-carbon"
              >
                Pedir presupuesto <ArrowIcon />
              </Link>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-10 rounded-2xl border border-dashed border-champagne/40 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-tight">Mantenimiento mensual</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ivory-dim">
              Actualizaciones, copias de seguridad, seguridad y mejoras para que tu web siga funcionando. Opcional con cualquier paquete.
            </p>
          </div>
          <Link href="/?servicio=mantenimiento#contacto" className="mt-5 inline-flex min-h-12 shrink-0 items-center gap-2 text-sm font-semibold text-champagne hover:text-champagne-soft sm:mt-0">
            Consultar <ArrowIcon />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
