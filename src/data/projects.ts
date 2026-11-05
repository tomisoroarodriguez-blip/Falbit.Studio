// PROYECTOS REALES del portfolio. Para sumar uno: copiar una entrada, completar los campos y dejar las
// capturas en /public/proyectos/<slug>/ (ver README, sección "Agregar un proyecto").
// Regla del sitio: no se muestran diseños ficticios como reales ni resultados/clientes inventados.

export type CategoryId = "web" | "tienda" | "sistema";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "web", label: "Sitios web" },
  { id: "tienda", label: "Tiendas online" },
  { id: "sistema", label: "Sistemas" },
];

export type Shot = { src: string; w: number; h: number };

export type Project = {
  slug: string;
  name: string;
  /** Tipo de negocio, tal como se muestra bajo el nombre. */
  business: string;
  categories: CategoryId[];
  /** Una línea para la tarjeta. */
  summary: string;
  objective: string;
  /** Qué trabajo se hizo (no resultados medidos). */
  work: string[];
  features: string[];
  tech: string[];
  tags: string[];
  /** Sitio publicado. */
  url: string | null;
  /** "en-curso" y "demo" se rotulan en pantalla. */
  kind: "produccion" | "en-curso" | "demo";
  /** Aviso público breve que se muestra en la ficha (honestidad sobre el estado del proyecto). */
  publicNote?: string;
  shots: {
    desktop: Shot;
    mobile: Shot;
    /** Página completa (para recorrerla con el scroll simulado). */
    desktopFull?: Shot;
    mobileFull?: Shot;
  };
  /** Datos por confirmar. Solo se muestran en desarrollo (npm run dev) y están listados en el README. */
  pending: string[];
};

const D = (slug: string, full = true): Project["shots"] => ({
  desktop: { src: `/proyectos/${slug}/escritorio.webp`, w: 1280, h: 800 },
  mobile: { src: `/proyectos/${slug}/movil.webp`, w: 780, h: 1688 },
  ...(full && {
    desktopFull: { src: `/proyectos/${slug}/escritorio-completa.webp`, w: 1100, h: 3972 },
    mobileFull: { src: `/proyectos/${slug}/movil-completa.webp`, w: 560, h: 9333 },
  }),
});

export const projects: Project[] = [
  {
    slug: "dizainas",
    name: "Dizainas by DB",
    business: "Joyería artesanal · tienda y catálogo",
    categories: ["tienda"],
    summary: "Tienda con carrito, compra por WhatsApp y un panel para que la marca edite todo sola.",
    objective:
      "Mostrar las piezas con cuidado y permitir comprarlas sin fricción, dándole a la marca autonomía para actualizar catálogo, precios y fotos sin depender de un programador.",
    work: [
      "Diseño y desarrollo de la tienda y del catálogo por colecciones",
      "Carrito y cierre de compra por WhatsApp",
      "Panel de administración para editar catálogo, precios, fotos y textos",
      "Galería con visor ampliado",
    ],
    features: [
      "Colecciones y tienda con carrito",
      "Compra por WhatsApp",
      "Panel de administración para gestionar catálogo, precios y fotos",
      "Galería con lightbox",
    ],
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "Framer Motion"],
    tags: ["Tienda", "Panel de gestión", "WhatsApp"],
    url: "https://www.dizainasbydb.com/",
    kind: "produccion",
    shots: D("dizainas"),
    pending: ["Confirmar con la marca (@db.dizainas) que podemos mostrar el proyecto", "Confirmar el alcance exacto del trabajo realizado"],
  },
  {
    slug: "martinez-seguros",
    name: "Martínez Seguros",
    business: "Corredoría de seguros · todo Uruguay",
    categories: ["web"],
    summary: "Sitio institucional con cotizador que arma el mensaje y lo envía por WhatsApp.",
    objective:
      "Explicar los seguros con claridad y acortar el camino hasta la consulta: que la persona elija qué necesita y llegue a un asesor con el pedido ya armado.",
    work: [
      "Diseño y desarrollo del sitio institucional",
      "Cotizador por categoría de seguro que genera el mensaje para WhatsApp",
      "Proceso en 3 pasos y preguntas frecuentes",
      "Analítica que solo se activa con consentimiento",
    ],
    features: [
      "Categorías de seguros",
      "Cotizador que arma el mensaje de WhatsApp",
      "Proceso en 3 pasos",
      "Preguntas frecuentes",
      "Analítica con consentimiento previo",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS 4", "Motion"],
    tags: ["Sitio institucional", "Cotizador", "WhatsApp"],
    url: null,
    kind: "en-curso",
    publicNote: "Proyecto en curso: el sitio todavía está en desarrollo y aún no está publicado.",
    shots: D("martinez-seguros"),
    pending: [
      "Confirmar con el cliente que podemos mostrar el proyecto en curso",
      "Cargar la URL pública cuando se publique y pasar kind a produccion",
      "Confirmar qué categorías de seguros son definitivas (algunas figuran sin validar)",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
