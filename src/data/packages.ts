// BORRADOR de paquetes (ver PDF "Paso 1"). `range` null = se muestra "Presupuesto a medida".
// Cuando se definan precios: range: { min: 000, max: 000 } (USD). No inventar cifras.
export type Pack = {
  id: string;
  name: string;
  forWho: string;
  includes: string[];
  notIncluded: string;
  /** Rango en dólares según el alcance construido. null = "Presupuesto a medida" hasta que se definan cifras reales. */
  range: { min: number; max: number } | null;
  /** Tipo de proyecto que se preselecciona en el formulario. */
  service: "desarrollo-web" | "tiendas-online";
};

export const packages: Pack[] = [
  {
    id: "presencia",
    name: "Presencia",
    forWho: "Para negocios que necesitan verse profesionales y que los contacten.",
    includes: ["Web de pocas secciones, a medida y adaptable a celular", "Botón y mensaje directo a WhatsApp", "Formulario de contacto", "Base de SEO local y ficha de Google", "Medición de visitas y consultas"],
    notIncluded: "Tienda, panel de administración y cotizador.",
    range: null,
    service: "desarrollo-web",
  },
  {
    id: "consultas",
    name: "Consultas",
    forWho: "Para negocios que cotizan, reservan o agendan.",
    includes: ["Todo lo de Presencia", "Cotizador o reservas que arman el pedido y lo envían a WhatsApp", "Registro de cada interesado", "Aviso automático a quien atiende", "Seguimiento automático con recordatorios"],
    notIncluded: "Pagos online y catálogos grandes.",
    range: null,
    service: "desarrollo-web",
  },
  {
    id: "tienda",
    name: "Tienda",
    forWho: "Para negocios que venden productos.",
    includes: ["Catálogo, carrito y compra por WhatsApp o pago online", "Panel para editar productos, precios y fotos vos solo", "Medición de ventas", "Aviso de carritos abandonados (opcional)"],
    notIncluded: "Logística, stock complejo y facturación.",
    range: null,
    service: "tiendas-online",
  },
];
