"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/data/site";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [current, setCurrent] = useState<string>("");

  // Fondo sólido + barra de progreso de lectura (una sola escucha de scroll, con rAF)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setSolid(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--progress", max > 0 ? String(Math.min(1, y / max)) : "0");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Sección visible → enlace activo (solo en la home)
  useEffect(() => {
    if (!isHome) {
      setCurrent("");
      return;
    }
    const ids = [...nav.map((n) => n.id), "contacto"];
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    const onTop = () => window.scrollY < 200 && setCurrent("");
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-500 ${
        solid || open ? "border-b border-champagne/15 bg-carbon/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-champagne" style={{ transform: "scaleX(var(--progress, 0))" }} />
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          onClick={(e) => {
            setOpen(false);
            // Ya en la home: volver arriba con scroll suave (el enlace a la misma ruta no siempre lo hace)
            if (isHome) {
              e.preventDefault();
              const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
              if (lenis) lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: "smooth" });
              history.replaceState(null, "", "/");
            }
          }}
        >
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 xl:flex">
          {nav.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              aria-current={current === l.id ? "location" : undefined}
              className={`group relative py-3 text-sm tracking-wide transition-colors ${current === l.id ? "text-champagne" : "text-ivory-dim hover:text-ivory"}`}
            >
              {l.label}
              <span className={`absolute inset-x-0 bottom-1.5 h-px origin-left bg-champagne transition-transform duration-500 ease-premium ${current === l.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
            </Link>
          ))}
          <Link
            href="/#contacto"
            className="rounded-full border border-champagne/60 px-5 py-2.5 text-sm font-semibold text-champagne transition-colors hover:bg-champagne hover:text-carbon"
          >
            Contanos tu idea
          </Link>
        </nav>

        <button
          type="button"
          className="relative flex size-12 items-center justify-center xl:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`absolute h-px w-6 bg-ivory transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-px w-6 bg-ivory transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </div>

      <div id="menu-movil" hidden={!open} className="max-h-[calc(100svh-72px)] overflow-y-auto border-t border-champagne/15 bg-carbon xl:hidden">
        <nav aria-label="Móvil" className="mx-auto flex max-w-7xl flex-col px-5 py-6 sm:px-8">
          {nav.map((l) => (
            <Link key={l.id} href={l.href} onClick={() => setOpen(false)} className={`border-b border-graphite py-4 text-xl font-medium ${current === l.id ? "text-champagne" : ""}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/#contacto" onClick={() => setOpen(false)} className="mt-6 rounded-full bg-champagne py-4 text-center font-semibold text-carbon">
            Contanos tu idea
          </Link>
        </nav>
      </div>
    </header>
  );
}
