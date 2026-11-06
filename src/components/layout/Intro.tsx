"use client";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";

// Intro corta (1,8 s) con "Saltar". Solo una vez por visita (sessionStorage), nunca con reduced-motion.
// El script del <head> en layout.tsx marca la clase `intro-pending` antes de pintar; sin esa clase el overlay no se ve.
let shownThisLoad = false;

export function Intro() {
  const [open, setOpen] = useState(() => !shownThisLoad);

  useLayoutEffect(() => {
    if (shownThisLoad) document.documentElement.dataset.introDone = "1"; // vuelta a la home sin recarga: sin espera
    shownThisLoad = true;
  }, []);

  const finish = (skipped: boolean) => {
    try {
      sessionStorage.setItem("fb-intro", "1");
    } catch {}
    if (skipped) document.documentElement.dataset.introDone = "1";
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => finish(false), 1900);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish(true);
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;
  return (
    <div className="intro fixed inset-0 z-[150] items-center justify-center bg-carbon" role="dialog" aria-label="Introducción">
      <div className="intro-core flex flex-col items-center">
        <Image src="/marca/logo-160.webp" width={160} height={160} alt="" unoptimized priority className="size-24 rounded-full" />
        <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.5em] text-ivory">FALBIT</p>
        <p className="serif-accent mt-3 text-2xl">Ideas que vuelan más alto</p>
        <span className="intro-line mt-8 block h-px w-40 bg-champagne" aria-hidden="true" />
      </div>
      <button
        type="button"
        onClick={() => finish(true)}
        className="absolute bottom-8 left-1/2 inline-flex min-h-12 -translate-x-1/2 items-center rounded-full border border-champagne/40 px-6 text-sm font-semibold text-ivory-dim transition-colors hover:border-champagne hover:text-ivory"
      >
        Saltar intro
      </button>
    </div>
  );
}
