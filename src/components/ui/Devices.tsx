import Image from "next/image";
import type { Shot } from "@/data/projects";

// Marcos de navegador y celular para mostrar capturas REALES de proyectos publicados.

export function Browser({ url, children, className = "" }: { url?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-champagne/25 bg-[#101010] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)] ${className}`}>
      <div className="flex h-8 items-center gap-3 border-b border-graphite bg-[#161616] px-3.5" aria-hidden="true">
        <span className="flex gap-1.5">
          <i className="size-2 rounded-full bg-graphite" />
          <i className="size-2 rounded-full bg-graphite" />
          <i className="size-2 rounded-full bg-graphite" />
        </span>
        {url && <span className="min-w-0 flex-1 truncate rounded-full bg-carbon px-3 py-0.5 text-center text-[0.65rem] text-ivory-dim">{url}</span>}
      </div>
      {children}
    </div>
  );
}

export function Phone({ shot, alt, priority = false, className = "", sizes = "220px" }: { shot: Shot; alt: string; priority?: boolean; className?: string; sizes?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.6rem] border-[5px] border-[#1c1c1c] bg-carbon shadow-[0_30px_70px_-20px_rgb(0_0_0/0.9)] outline outline-1 outline-champagne/25 ${className}`}>
      <Image src={shot.src} width={shot.w} height={shot.h} alt={alt} priority={priority} unoptimized sizes={sizes} className="block h-auto w-full" />
    </div>
  );
}
