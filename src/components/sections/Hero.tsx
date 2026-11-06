import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Browser, Phone } from "@/components/ui/Devices";
import { ArrowIcon } from "@/components/ui/icons";
import { projects } from "@/data/projects";

const words = ["Ideas", "que", "vuelan"];

export function Hero() {
  const slides = projects;
  const phone = projects.find((p) => p.slug === "dizainas")!;

  return (
    <section id="inicio" aria-labelledby="hero-titulo" data-n={slides.length} className="relative isolate overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-36">
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-20 [mask-image:radial-gradient(70%_70%_at_30%_30%,#000,transparent_75%)]" />
      <div aria-hidden="true" className="absolute -right-24 top-10 -z-10 w-[min(70vw,640px)] opacity-[0.18] hero-orbit">
        <Image src="/marca/logo-900.webp" width={900} height={900} alt="" unoptimized className="h-auto w-full rounded-full [mask-image:radial-gradient(circle,#000_55%,transparent_72%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        <div>
          <p className="hero-fade mb-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-champagne" style={{ animationDelay: "0.2s" }}>
            <span className="h-px w-10 bg-champagne" aria-hidden="true" />
            Estudio digital · Uruguay
          </p>
          <h1 id="hero-titulo" className="text-[clamp(2.6rem,7.2vw,5.6rem)] font-semibold uppercase leading-[1] tracking-tight">
            {words.map((w, i) => (
              <span key={w} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                <span className="hero-word layered inline-block" data-t={w} style={{ ["--i" as string]: i }}>
                  {w}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="hero-word layered serif-accent inline-block text-[1.12em] leading-[1]" data-t="más alto" style={{ ["--i" as string]: 3 }}>
                más alto
              </span>
            </span>
          </h1>
          <p className="hero-fade mt-7 max-w-md text-base leading-relaxed text-ivory-dim sm:text-lg">
            Transformamos ideas en experiencias digitales que impulsan negocios. Webs que te traen consultas por WhatsApp y que manejás vos solo.
          </p>
          <div className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "1.05s" }}>
            <ButtonLink href="/#proyectos">
              Ver proyectos <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="/#contacto" variant="ghost">
              Contanos tu idea
            </ButtonLink>
          </div>
        </div>

        {/* Capturas reales de trabajos ya construidos, rotando solas (CSS) */}
        <div className="hero-fade relative mx-auto w-full max-w-[640px] pb-10 lg:max-w-none lg:pb-0 lg:pr-10" style={{ animationDelay: "0.6s" }}>
          <div className="hero-orbit">
            <Browser url="Trabajos reales · FALBIT">
              <div className="relative aspect-[1280/800] bg-carbon">
                {slides.map((p, i) => (
                  <div key={p.slug} className="hero-slide absolute inset-0" data-first={i === 0 ? "" : undefined} style={{ ["--s" as string]: i }}>
                    <Image
                      src={p.shots.desktop.src}
                      width={p.shots.desktop.w}
                      height={p.shots.desktop.h}
                      alt={`Captura real del sitio ${p.name}`}
                      priority={i === 0}
                      unoptimized
                      sizes="(min-width: 1024px) 640px, 90vw"
                      className="h-full w-full object-cover object-top"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full border border-champagne/40 bg-carbon/85 px-3 py-1.5 text-[0.7rem] font-semibold tracking-wide text-ivory backdrop-blur">
                      {p.name}{p.kind === "en-curso" ? " · en curso" : ""}
                    </span>
                  </div>
                ))}
              </div>
            </Browser>
          </div>
          <div className="absolute -bottom-2 right-0 w-[26%] min-w-[96px] max-w-[170px] lg:-right-2 lg:bottom-[-8%]" aria-hidden="true">
            <Phone shot={phone.shots.mobile} alt="" sizes="170px" className="rotate-[4deg]" />
          </div>
        </div>
      </div>
    </section>
  );
}
