"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Cada demo es su propio paquete de JavaScript: se descarga solo cuando la sección está cerca de la pantalla
// y recién cuando se abre su pestaña.
const Loading = () => <div className="min-h-[24rem] animate-pulse rounded-2xl bg-white/[0.03]" aria-hidden="true" />;
const lazy = (load: () => Promise<ComponentType>) => dynamic(load, { ssr: false, loading: Loading });
const ThemeDemo = lazy(() => import("@/components/demos/ThemeDemo").then((m) => m.ThemeDemo));
const StoreDemo = lazy(() => import("@/components/demos/StoreDemo").then((m) => m.StoreDemo));
const AdminDemo = lazy(() => import("@/components/demos/AdminDemo").then((m) => m.AdminDemo));
const ResponsiveDemo = lazy(() => import("@/components/demos/ResponsiveDemo").then((m) => m.ResponsiveDemo));

const tabs: { id: string; label: string; hint: string; Demo: ComponentType }[] = [
  { id: "tema", label: "Aspecto visual", hint: "Cambiá el diseño de una web", Demo: ThemeDemo },
  { id: "tienda", label: "Tienda online", hint: "Comprá en una tienda simulada", Demo: StoreDemo },
  { id: "panel", label: "Panel de gestión", hint: "Administrá pedidos ficticios", Demo: AdminDemo },
  { id: "responsive", label: "Responsive", hint: "Mirá una web en cada dispositivo", Demo: ResponsiveDemo },
];

export function Lab() {
  const [active, setActive] = useState(0);
  const [near, setNear] = useState(false);
  const [visited, setVisited] = useState<number[]>([0]);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setVisited((v) => (v.includes(active) ? v : [...v, active]));
  }, [active]);

  // Navegación por teclado del patrón WAI-ARIA tabs: flechas, Inicio y Fin.
  const onKey = (e: KeyboardEvent) => {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight" ? (active + 1) % tabs.length
      : e.key === "ArrowLeft" ? (active + last) % tabs.length
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <section ref={root} id="laboratorio" aria-labelledby="laboratorio-titulo" className="grid-lines relative px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="laboratorio-titulo"
          eyebrow="Laboratorio"
          title={
            <>
              Probalo <span className="text-gold-gradient">vos mismo</span>
            </>
          }
        >
          Cuatro demostraciones funcionales de lo que podemos construir. Todo ocurre en tu navegador: no se guarda ni se envía nada.
        </SectionHeading>

        <div role="tablist" aria-label="Demostraciones" onKeyDown={onKey} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className="group rounded-2xl border border-graphite bg-[#101010] p-5 text-left transition-colors aria-selected:border-champagne aria-selected:bg-champagne/10 hover:border-champagne/50"
            >
              <span className="text-xs font-semibold tabular-nums tracking-widest text-champagne">{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-2 block font-semibold">{t.label}</span>
              <span className="mt-1 block text-sm text-ivory-dim">{t.hint}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-graphite bg-[#0a0a0a] p-5 sm:p-8">
          {tabs.map((t, i) => (
            <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={i !== active} tabIndex={0}>
              {near && visited.includes(i) ? <t.Demo /> : <Loading />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
