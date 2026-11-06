import { Reveal } from "./Reveal";

export function SectionHeading({ title, id, children }: { eyebrow?: string; title: React.ReactNode; id: string; children?: React.ReactNode }) {
  return (
    <Reveal className="max-w-3xl">
            <h2 id={id} className="text-[clamp(1.9rem,5vw,3.6rem)] font-semibold uppercase leading-[1.05] tracking-tight">
        {title}
      </h2>
      {children && <p className="mt-6 text-base leading-relaxed text-ivory-dim sm:text-lg">{children}</p>}
    </Reveal>
  );
}
