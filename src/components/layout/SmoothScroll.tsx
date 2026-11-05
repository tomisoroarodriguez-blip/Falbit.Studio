"use client";
import { useEffect } from "react";

// Scroll suave con Lenis solo con mouse (en celulares el scroll nativo ya es fluido) y sin reduced-motion.
// La librería se descarga aparte, cuando el navegador está libre.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let cancelled = false;
    let destroy = () => {};
    const start = () => {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({ duration: 1.1, anchors: { offset: -72 } });
        (window as unknown as { __lenis?: unknown }).__lenis = lenis;
        let raf = requestAnimationFrame(function tick(t) {
          lenis.raf(t);
          raf = requestAnimationFrame(tick);
        });
        destroy = () => {
          delete (window as unknown as { __lenis?: unknown }).__lenis;
          cancelAnimationFrame(raf);
          lenis.destroy();
        };
      });
    };
    const id = typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(start, { timeout: 2000 }) : (setTimeout(start, 800) as unknown as number);

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(id);
      destroy();
    };
  }, []);
  return null;
}
