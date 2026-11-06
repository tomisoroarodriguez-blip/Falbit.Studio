// Datos globales del sitio. Editar acá, no en los componentes.
export const site = {
  name: "FALBIT",
  sub: "DIGITAL STUDIO",
  tagline: "Ideas que vuelan más alto",
  description:
    "FALBIT Digital Studio: diseño y desarrollo web, tiendas online, sistemas personalizados y automatizaciones desde Uruguay.",
  url: "https://falbitstudio.com",
  locale: "es_UY",
  contact: {
    instagram: "falbit.studio",
    whatsapp: "59892157796", // 092 157 796 (Uruguay)
    email: "falbit.studio01@gmail.com",
  },
} as const;

/** Secciones de la home, en orden. `id` coincide con el id del elemento (lo usa el resaltado de la cabecera). */
export const nav = [
  { id: "servicios", href: "/#servicios", label: "Qué hacemos" },
  { id: "proyectos", href: "/#proyectos", label: "Proyectos" },
  { id: "paquetes", href: "/#paquetes", label: "Paquetes" },
  { id: "proceso", href: "/#proceso", label: "Cómo trabajamos" },
  { id: "sobre", href: "/#sobre", label: "Sobre Falbit" },
  { id: "faq", href: "/#faq", label: "Preguntas" },
] as const;
