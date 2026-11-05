"use client";
import { useState, type CSSProperties } from "react";
import { Segmented } from "./shared";

const palettes = [
  { value: "#c9a57a", label: "Champagne" },
  { value: "#4fb286", label: "Esmeralda" },
  { value: "#4f8fe0", label: "Océano" },
  { value: "#e8745f", label: "Coral" },
];
const fonts = [
  { value: "var(--font-montserrat), sans-serif", label: "Moderna" },
  { value: "Georgia, 'Times New Roman', serif", label: "Editorial" },
  { value: "ui-monospace, Menlo, Consolas, monospace", label: "Técnica" },
];
const radii = [
  { value: "0px", label: "Recto" },
  { value: "12px", label: "Suave" },
  { value: "28px", label: "Redondo" },
];
const modes = [
  { value: "dark", label: "Oscuro" },
  { value: "light", label: "Claro" },
];

export function ThemeDemo() {
  const [accent, setAccent] = useState(palettes[0].value);
  const [font, setFont] = useState(fonts[0].value);
  const [radius, setRadius] = useState(radii[1].value);
  const [mode, setMode] = useState("dark");

  const dark = mode === "dark";
  const vars = {
    "--d-bg": dark ? "#0d0d0d" : "#f5f5f0",
    "--d-fg": dark ? "#f5f5f0" : "#141414",
    "--d-surface": dark ? "#1b1b1b" : "#ffffff",
    "--d-muted": dark ? "#a9a9a2" : "#5b5b55",
    "--d-accent": accent,
    "--d-radius": radius,
    fontFamily: font,
  } as CSSProperties;

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-ivory-dim">Cambiá colores, tipografía y estilo de esta web de ejemplo y mirá el resultado al instante.</p>
        <Segmented label="Color" options={palettes} value={accent} onChange={setAccent} />
        <Segmented label="Tipografía" options={fonts} value={font} onChange={setFont} />
        <Segmented label="Bordes" options={radii} value={radius} onChange={setRadius} />
        <Segmented label="Modo" options={modes} value={mode} onChange={setMode} />
      </div>

      <div
        style={vars}
        className="overflow-hidden rounded-2xl border border-graphite bg-[var(--d-bg)] text-[var(--d-fg)] transition-colors duration-500"
        role="region"
        aria-label="Vista previa de la web de demostración"
      >
        <div className="flex items-center justify-between border-b border-[color:var(--d-muted)]/25 px-5 py-4">
          <span className="font-bold tracking-wide">Studio Demo</span>
          <span className="hidden gap-5 text-sm text-[var(--d-muted)] sm:flex">
            <span>Inicio</span>
            <span>Servicios</span>
            <span>Contacto</span>
          </span>
        </div>
        <div className="px-5 py-10 sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--d-accent)]">Web de demostración</p>
          <h3 className="mt-4 max-w-md text-3xl font-bold leading-tight sm:text-4xl">Tu marca, con el estilo que querés.</h3>
          <p className="mt-4 max-w-md text-[var(--d-muted)]">Este sitio cambia de identidad sin recargar la página. Así de flexible es un diseño bien construido.</p>
          <button
            type="button"
            className="mt-7 min-h-11 bg-[var(--d-accent)] px-6 text-sm font-semibold text-[#0d0d0d] transition-[border-radius] duration-300"
            style={{ borderRadius: "var(--d-radius)" }}
          >
            Pedir presupuesto
          </button>
        </div>
        <div className="grid gap-4 px-5 pb-8 sm:grid-cols-3 sm:px-10 sm:pb-10">
          {["Diseño", "Desarrollo", "Soporte"].map((t) => (
            <div key={t} className="bg-[var(--d-surface)] p-5 transition-[border-radius,background] duration-300" style={{ borderRadius: "var(--d-radius)" }}>
              <span className="mb-4 block size-9 bg-[var(--d-accent)]/25" style={{ borderRadius: "var(--d-radius)" }} />
              <p className="font-semibold">{t}</p>
              <p className="mt-1 text-sm text-[var(--d-muted)]">Descripción breve del servicio.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
