import { Suspense } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";
import { instagramUrl, whatsappUrl } from "@/lib/contact";

const chip = "inline-flex min-h-12 items-center justify-center rounded-full border px-6 text-sm font-semibold transition-colors";

export function Contact() {
  const ig = instagramUrl();
  const wa = whatsappUrl("Hola FALBIT, quiero consultar por un proyecto.");

  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="relative overflow-hidden px-5 py-24 sm:px-8 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_20%,rgb(201_165_122/0.14),transparent_70%)]" />
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <h2 id="contacto-titulo" className="text-[clamp(2.2rem,6vw,4.4rem)] font-semibold uppercase leading-[1.02] tracking-tight">
            Tu próxima gran idea <span className="serif-accent">empieza acá</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory-dim sm:text-lg">
            Contanos qué querés lograr, aunque sea una idea a medio armar. Estudiamos tu caso y te respondemos con una propuesta clara.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {ig ? (
              <a href={ig} target="_blank" rel="noopener noreferrer" className={`${chip} border-champagne/50 hover:bg-champagne/10`}>
                Instagram
              </a>
            ) : (
              <span className={`${chip} cursor-default border-graphite text-ivory-dim`}>Instagram · próximamente</span>
            )}
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={`${chip} border-champagne/50 hover:bg-champagne/10`}>
                WhatsApp
              </a>
            ) : (
              <span className={`${chip} cursor-default border-graphite text-ivory-dim`}>WhatsApp · próximamente</span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Suspense fallback={<div className="min-h-[28rem] rounded-3xl border border-graphite bg-[#101010]" />}>
            <ContactForm />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
}
