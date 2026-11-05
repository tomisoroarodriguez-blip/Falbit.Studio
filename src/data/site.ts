// Datos globales del sitio. Editar acá, no en los componentes.
export const site = {
  name: "FALBIT",
  sub: "DIGITAL STUDIO",
  tagline: "Ideas que vuelan más alto",
  description:
    "FALBIT Digital Studio: diseño y desarrollo web, tiendas online, sistemas personalizados y automatizaciones desde Uruguay.",
  url: "http://localhost:3000", // TODO: dominio real cuando se autorice
  locale: "es_UY",
  contact: {
    instagram: "", // TODO: usuario de Instagram (sin @)
    whatsapp: "", // TODO: WhatsApp Business, formato internacional sin "+" (ej. 59899123456)
    email: "", // TODO: correo de recepción
  },
} as const;

/** Secciones de la home, en orden. `id` coincide con el id del elemento (lo usa el resaltado de la cabecera). */
export const nav = [
  { id: "servicios", href: "/#servicios", label: "Qué hacemos" },
  { id: "proyectos", href: "/#proyectos", label: "Proyectos" },
  { id: "proceso", href: "/#proceso", label: "Cómo trabajamos" },
  { id: "sobre", href: "/#sobre", label: "Sobre Falbit" },
  { id: "faq", href: "/#faq", label: "Preguntas" },
] as const;
