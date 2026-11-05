import Image from "next/image";

// Logo oficial (halcón dorado en círculo) + nombre.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image src="/marca/logo-160.webp" width={160} height={160} alt="" unoptimized priority className="size-11 rounded-full" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.05rem] font-semibold tracking-[0.28em] text-ivory">FALBIT</span>
        <span className="mt-1 text-[0.55rem] font-medium tracking-[0.42em] text-champagne">DIGITAL STUDIO</span>
      </span>
    </span>
  );
}
