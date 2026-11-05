"use client";
import { useEffect, useRef } from "react";

// Cursor dorado solo en dispositivos con mouse. Nunca es necesario para usar el sitio.
export function MagneticCursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ring.current;
    if (!fine || reduce || !el) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let shown = false;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        x = tx;
        y = ty;
        el.style.opacity = "1";
        shown = true;
      }
      const hot = (e.target as Element | null)?.closest("a, button, input, textarea, select, [data-cursor]");
      el.dataset.hot = hot ? "1" : "0";
    };
    const leave = () => {
      el.style.opacity = "0";
      shown = false;
    };
    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden size-8 rounded-full border border-champagne opacity-0 transition-[width,height,background,opacity] duration-300 data-[hot=1]:size-14 data-[hot=1]:bg-champagne/15 [@media(hover:hover)_and_(pointer:fine)]:block"
    />
  );
}
