import Link from "next/link";
import { site, nav } from "@/data/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const { instagram } = site.contact;
  return (
    <footer className="border-t border-champagne/15 bg-carbon">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory-dim">{site.tagline}. Estudio digital desde Uruguay.</p>
        </div>
        <nav aria-label="Pie de página">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-champagne">Navegación</p>
          <ul className="text-sm text-ivory-dim">
            {nav.map((l) => (
              <li key={l.href}>
                <Link className="inline-block py-2 hover:text-champagne" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-champagne">Contacto</p>
          <ul className="space-y-3 text-sm text-ivory-dim">
            <li>
              <Link className="hover:text-champagne" href="/#contacto">
                Formulario de proyecto
              </Link>
            </li>
            {instagram && (
              <li>
                <a className="hover:text-champagne" href={`https://instagram.com/${instagram}`} rel="noopener noreferrer" target="_blank">
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-graphite py-6 text-center text-xs text-ivory-dim">
        © {new Date().getFullYear()} FALBIT Digital Studio. Todos los derechos reservados.
      </div>
    </footer>
  );
}
