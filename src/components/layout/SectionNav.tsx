"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Qué hacemos" },
  { id: "proyectos", label: "Proyectos" },
  { id: "paquetes", label: "Paquetes" },
  { id: "demo", label: "Imaginá tu web" },
  { id: "proceso", label: "Cómo trabajamos" },
  { id: "sobre", label: "Sobre Falbit" },
  { id: "faq", label: "Preguntas" },
  { id: "contacto", label: "Contacto" },
];

type LenisLike = { scrollTo: (t: HTMLElement | number, o?: { offset?: number }) => void };

// Riel de secciones (escritorio) + teclas ← → para pasar de sección. No toca el scroll normal ni las flechas ↑ ↓.
export function SectionNav() {
  const pathname = usePathname();
  const [current, setCurrent] = useState(0);

  const go = (i: number) => {
    const el = document.getElementById(sections[Math.max(0, Math.min(sections.length - 1, i))].id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -72 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (pathname !== "/") return;
    const els = sections.map((s) => document.getElementById(s.id));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(sections.findIndex((s) => s.id === e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((e) => e && io.observe(e));

    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const t = e.target instanceof Element ? e.target : null;
      if (t?.closest("input, textarea, select, [contenteditable='true'], [role='slider'], [role='tablist']")) return;
      if (document.body.style.overflow === "hidden") return; // menú móvil abierto o intro
      e.preventDefault();
      setCurrent((c) => {
        const next = e.key === "ArrowRight" ? c + 1 : c - 1;
        go(next);
        return Math.max(0, Math.min(sections.length - 1, next));
      });
    };
    document.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      document.removeEventListener("keydown", onKey);
    };
  }, [pathname]);

  if (pathname !== "/") return null;
  return (
    <nav aria-label="Secciones de la página (también con las flechas izquierda y derecha)" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ul className="flex flex-col items-end gap-1">
        {sections.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={s.label}
              aria-current={current === i ? "true" : undefined}
              className="group flex h-6 items-center gap-3"
            >
              <span className="pointer-events-none translate-x-1 text-xs text-ivory-dim opacity-0 transition-[opacity,transform] duration-300 ease-premium group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                {s.label}
              </span>
              <span className={`block rounded-full transition-[width,background] duration-500 ease-premium ${current === i ? "h-px w-8 bg-champagne" : "h-px w-3 bg-ivory-dim/60 group-hover:w-5 group-hover:bg-champagne"}`} />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
