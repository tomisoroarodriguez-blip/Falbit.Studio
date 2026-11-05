"use client";
import { useState } from "react";
import { Segmented } from "./shared";

const devices = [
  { value: 375, label: "Móvil" },
  { value: 768, label: "Tablet" },
  { value: 1180, label: "Escritorio" },
];

// El sitio de ejemplo reacciona al ancho de su propio contenedor (container queries), no de la ventana.
export function ResponsiveDemo() {
  const [w, setW] = useState(375);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Segmented label="Dispositivo" options={devices} value={w} onChange={setW} />
        <p className="text-sm tabular-nums text-ivory-dim">Ancho simulado: {w} px</p>
      </div>

      <div className="rounded-2xl border border-graphite bg-[radial-gradient(70%_80%_at_50%_30%,rgb(201_165_122/0.12),transparent_75%)] p-4 sm:p-8">
        <div
          className="mx-auto max-w-full overflow-hidden rounded-xl border border-white/15 bg-[#f5f5f0] text-[#141414] shadow-2xl shadow-black/60 transition-[width] duration-700 ease-premium"
          style={{ width: w }}
        >
          <div className="@container">
            <header className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <span className="font-bold">Marca</span>
              <nav aria-label="Menú del sitio de ejemplo" className="hidden gap-6 text-sm @md:flex">
                <span>Inicio</span>
                <span>Servicios</span>
                <span>Contacto</span>
              </nav>
              <span className="grid gap-1 @md:hidden" aria-hidden="true">
                <i className="block h-0.5 w-5 bg-black" />
                <i className="block h-0.5 w-5 bg-black" />
                <i className="block h-0.5 w-5 bg-black" />
              </span>
            </header>

            <section className="grid items-center gap-6 px-5 py-8 @2xl:grid-cols-2 @2xl:px-10 @2xl:py-14">
              <div>
                <h3 className="text-2xl font-bold leading-tight @2xl:text-4xl">Una web que se adapta a todo.</h3>
                <p className="mt-3 text-sm text-black/60">El diseño reorganiza su contenido según el espacio disponible.</p>
                <span className="mt-5 inline-block rounded-full bg-[#c9a57a] px-5 py-2.5 text-sm font-semibold">Empezar</span>
              </div>
              <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-[#c9a57a] to-[#8c6c45]" aria-hidden="true" />
            </section>

            <section className="grid gap-4 px-5 pb-8 @md:grid-cols-2 @2xl:grid-cols-3 @2xl:px-10 @2xl:pb-12">
              {["Diseño", "Desarrollo", "Soporte"].map((t) => (
                <div key={t} className="rounded-xl bg-white p-4 shadow-sm">
                  <span className="mb-3 block size-8 rounded-lg bg-[#c9a57a]/40" />
                  <p className="font-semibold">{t}</p>
                  <p className="text-sm text-black/55">Descripción breve.</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
