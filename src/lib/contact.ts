import { site } from "@/data/site";
import { services } from "@/data/services";

export const projectTypes = [...services.map((s) => ({ value: s.id as string, label: s.title })), { value: "otro", label: "Otro / no estoy seguro" }];

export type ContactInput = { nombre: string; empresa: string; correo: string; tipo: string; descripcion: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const emptyContact: ContactInput = { nombre: "", empresa: "", correo: "", tipo: "", descripcion: "" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Misma validación en el navegador y en el servidor.
export function validateContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (v.nombre.trim().length < 2) e.nombre = "Ingresá tu nombre.";
  if (!EMAIL.test(v.correo.trim())) e.correo = "Ingresá un correo válido, por ejemplo nombre@empresa.com.";
  if (!projectTypes.some((t) => t.value === v.tipo)) e.tipo = "Elegí un tipo de proyecto.";
  if (v.descripcion.trim().length < 20) e.descripcion = "Contanos un poco más (mínimo 20 caracteres).";
  if (v.nombre.length > 120 || v.empresa.length > 120 || v.correo.length > 160 || v.descripcion.length > 3000) {
    e.descripcion = "Alguno de los campos es demasiado largo.";
  }
  return e;
}

export function buildMessage(v: ContactInput): string {
  const tipo = projectTypes.find((t) => t.value === v.tipo)?.label ?? v.tipo;
  return [
    "Hola FALBIT, quiero empezar un proyecto.",
    "",
    `Nombre: ${v.nombre.trim()}`,
    v.empresa.trim() ? `Empresa: ${v.empresa.trim()}` : null,
    `Correo: ${v.correo.trim()}`,
    `Tipo de proyecto: ${tipo}`,
    "",
    v.descripcion.trim(),
  ]
    .filter((l): l is string => typeof l === "string")
    .join("\n");
}

// Enlaces de contacto: devuelven null mientras el dato no esté configurado en data/site.ts.
export const whatsappUrl = (text: string) =>
  site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}` : null;
export const mailtoUrl = (subject: string, text: string) =>
  site.contact.email ? `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}` : null;
export const instagramUrl = () => (site.contact.instagram ? `https://instagram.com/${site.contact.instagram}` : null);
