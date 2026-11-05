import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid-lines flex min-h-svh items-center px-5 sm:px-8">
      <div className="mx-auto w-full max-w-7xl pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-champagne">Error 404</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.2rem,7vw,5rem)] font-semibold uppercase leading-[1.02] tracking-tight">
          Esta página <span className="text-gold-gradient">voló lejos</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-ivory-dim">No encontramos lo que buscabas. Volvé al inicio y seguimos desde ahí.</p>
        <ButtonLink href="/" className="mt-9">
          Volver al inicio
        </ButtonLink>
      </div>
    </section>
  );
}
