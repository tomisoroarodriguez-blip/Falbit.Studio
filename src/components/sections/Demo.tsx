"use client";
import { useId, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Browser } from "@/components/ui/Devices";
import { ArrowIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/contact";

const kinds = [
  { id: "desarrollo-web", label: "Página web", line: "Escribinos y te respondemos", cta: "Escribir por WhatsApp", blocks: ["Quiénes somos", "Qué hacemos", "Contacto"] },
  { id: "tiendas-online", label: "Tienda online", line: "Elegí tus productos favoritos", cta: "Ver catálogo", blocks: ["Novedades", "Más vendidos", "Carrito"] },
  { id: "sistemas", label: "Sistema a medida", line: "Ingresá a tu panel", cta: "Entrar", blocks: ["Reservas", "Clientes", "Reportes"] },
] as const;

const colors = [
  { id: "champagne", label: "Dorado", hex: "#c9a57a", ink: "#0d0d0d" },
  { id: "azul", label: "Azul", hex: "#3b6fd4", ink: "#ffffff" },
  { id: "verde", label: "Verde", hex: "#2f9e73", ink: "#0d0d0d" },
  { id: "rojo", label: "Rojo", hex: "#d1483f", ink: "#ffffff" },
  { id: "violeta", label: "Violeta", hex: "#7a5ad6", ink: "#ffffff" },
] as const;

const field = "min-h-12 w-full rounded-xl border border-graphite bg-carbon px-4 text-base text-ivory placeholder:text-ivory-dim/80 transition-colors focus:border-champagne focus:outline-none";

// Vista ilustrativa: no es un trabajo real ni una promesa de resultado. Sirve para imaginar la idea y mandarla por WhatsApp.
export function Demo() {
  const uid = useId();
  const [kind, setKind] = useState<(typeof kinds)[number]["id"]>("desarrollo-web");
  const [name, setName] = useState("");
  const [color, setColor] = useState<(typeof colors)[number]["id"]>("champagne");

  const k = kinds.find((x) => x.id === kind)!;
  const c = colors.find((x) => x.id === color)!;
  const shown = name.trim() || "Tu negocio";
  const msg = `Hola FALBIT, imagino una ${k.label.toLowerCase()} para ${name.trim() || "mi negocio"}, con color ${c.label.toLowerCase()}. Me gustaría conversarlo.`;
  const wa = whatsappUrl(msg);

  return (
    <section id="demo" aria-labelledby="demo-titulo" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            id="demo-titulo"
            title={
              <>
                Imaginá <span className="serif-accent">tu web</span>
              </>
            }
          >
            Elegí qué necesitás, escribí el nombre de tu negocio y un color. A la derecha ves una idea de cómo podría verse.
          </SectionHeading>

          <Reveal className="mt-10 space-y-7">
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-ivory">¿Qué necesitás?</legend>
              <div className="flex flex-wrap gap-2">
                {kinds.map((o) => (
                  <label key={o.id} className="cursor-pointer">
                    <input type="radio" name={`${uid}-kind`} value={o.id} checked={kind === o.id} onChange={() => setKind(o.id)} className="peer sr-only" />
                    <span className="inline-flex min-h-11 items-center rounded-full border border-graphite px-5 text-sm font-semibold text-ivory-dim transition-colors peer-checked:border-champagne peer-checked:bg-champagne peer-checked:text-carbon peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne hover:border-champagne/60">
                      {o.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor={`${uid}-name`} className="mb-3 block text-sm font-semibold text-ivory">
                Nombre de tu negocio
              </label>
              <input id={`${uid}-name`} value={name} onChange={(e) => setName(e.target.value)} maxLength={32} placeholder="Ej.: Taller Santos" autoComplete="organization" className={field} />
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-ivory">Color principal</legend>
              <div className="flex flex-wrap gap-3">
                {colors.map((o) => (
                  <label key={o.id} className="cursor-pointer" title={o.label}>
                    <input type="radio" name={`${uid}-color`} value={o.id} checked={color === o.id} onChange={() => setColor(o.id)} className="peer sr-only" aria-label={o.label} />
                    <span
                      style={{ background: o.hex }}
                      className="block size-11 rounded-full outline outline-2 outline-offset-2 outline-transparent transition-[outline-color,transform] duration-300 peer-checked:outline-ivory peer-focus-visible:outline-champagne hover:scale-105"
                    />
                  </label>
                ))}
              </div>
            </fieldset>

            <a
              href={wa ?? `/?servicio=${kind}#contacto`}
              {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-champagne px-7 text-sm font-semibold text-carbon transition-colors hover:bg-champagne-soft"
            >
              Contanos esta idea <ArrowIcon />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Browser url={`${shown.toLowerCase().replace(/[^a-z0-9]+/g, "") || "tunegocio"}.com`}>
            <div className="bg-[#f6f4ef] p-5 text-[#1a1a1a] sm:p-8" aria-live="polite">
              <div className="flex items-center justify-between">
                <span className="max-w-[60%] truncate text-sm font-bold tracking-tight">{shown}</span>
                <span className="hidden gap-4 text-xs text-[#6b6b66] sm:flex">
                  {k.blocks.map((b) => (
                    <span key={b}>{b}</span>
                  ))}
                </span>
              </div>
              <div className="mt-10 sm:mt-14">
                <p className="max-w-[16ch] text-3xl font-bold leading-[1.05] tracking-tight transition-colors duration-500 sm:text-5xl" style={{ color: c.hex }}>
                  {shown}
                </p>
                <p className="mt-4 text-sm text-[#55554f] sm:text-base">{k.line}</p>
                <span className="mt-6 inline-flex min-h-11 items-center rounded-full px-6 text-sm font-semibold transition-colors duration-500" style={{ background: c.hex, color: c.ink }}>
                  {k.cta}
                </span>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-3 sm:mt-14" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-16 rounded-lg bg-white/80 sm:h-24" style={{ boxShadow: `inset 0 -3px 0 ${c.hex}` }} />
                ))}
              </div>
            </div>
          </Browser>
          <p className="mt-4 text-xs text-ivory-dim">Vista ilustrativa. No es un trabajo terminado: el diseño final se define con vos.</p>
        </Reveal>
      </div>
    </section>
  );
}
