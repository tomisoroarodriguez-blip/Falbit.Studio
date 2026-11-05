"use client";
import { useEffect, useState } from "react";

// Decide si vale la pena cargar la escena 3D: sin reduced-motion, con WebGL y hardware razonable.
// Además espera a que la página termine de cargar y el navegador esté ocioso, para no competir con
// la primera pintura ni con la interacción inicial.
export function use3dCapable() {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // El 3D es solo para pantallas grandes con mouse; celulares y tablets usan el halcón SVG.
    if (!window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches) return;
    if ((navigator.hardwareConcurrency ?? 4) < 4) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;
    try {
      const c = document.createElement("canvas");
      if (!(c.getContext("webgl2") || c.getContext("webgl"))) return;
    } catch {
      return;
    }

    let idle = 0;
    let timer = 0;
    const arm = () => {
      const go = () => setCapable(true);
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(go, { timeout: 2500 });
      else timer = setTimeout(go, 1500) as unknown as number;
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      window.removeEventListener("load", arm);
      if (idle && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      clearTimeout(timer);
    };
  }, []);

  return capable;
}
