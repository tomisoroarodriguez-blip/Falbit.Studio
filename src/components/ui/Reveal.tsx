"use client";
import { createElement, useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
  /** Anima los hijos directos de a uno en vez del contenedor completo. */
  stagger?: boolean;
  delay?: number;
};

// Aparición progresiva al entrar en pantalla, con IntersectionObserver + transiciones CSS (ver globals.css).
// No carga ninguna librería de animación. Con prefers-reduced-motion no hace nada.
export function Reveal({ children, className, as = "div", stagger = false, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = stagger ? Array.from(el.children) as HTMLElement[] : [el];
    const pending = targets.filter((t) => t.getBoundingClientRect().top > window.innerHeight * 0.88);
    if (!pending.length) return;

    pending.forEach((t, i) => {
      t.style.setProperty("--rv-delay", `${delay + (stagger ? i * 0.1 : 0)}s`);
      t.dataset.rv = "0";
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.rv = "1";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    pending.forEach((t) => io.observe(t));

    return () => {
      io.disconnect();
      pending.forEach((t) => {
        delete t.dataset.rv;
        t.style.removeProperty("--rv-delay");
      });
    };
  }, [stagger, delay]);

  return createElement(as, { ref, className }, children);
}
