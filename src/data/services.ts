export type ServiceId = "desarrollo-web" | "tiendas-online" | "sistemas" | "mantenimiento" | "automatizaciones";

export type Service = {
  id: ServiceId;
  title: string;
  /** Qué problema o necesidad resuelve. */
  need: string;
  /** Cómo ayuda FALBIT. */
  help: string;
  points: string[];
  /** Proyectos del portfolio que lo ilustran (solo si es cierto). */
  projects: string[];
};

// Solo servicios confirmados. Para agregar uno: sumar el id al tipo y una entrada acá y en lib/contact.ts.
export const services: Service[] = [
  {
    id: "desarrollo-web",
    title: "Desarrollo web",
    need: "Tu negocio necesita una presencia clara y confiable donde la gente entienda qué hacés y pueda consultarte sin vueltas.",
    help: "Diseñamos y programamos sitios a medida, rápidos, que se ven bien en cualquier pantalla y están preparados para buscadores.",
    points: ["Diseño a medida", "Adaptable a móviles", "Optimizado para buscadores"],
    projects: ["martinez-seguros"],
  },
  {
    id: "tiendas-online",
    title: "Tiendas online",
    need: "Querés vender por internet sin depender de que alguien cargue cada producto o responda cada pedido a mano.",
    help: "Armamos tiendas con catálogo, carrito y un panel para que administres productos, precios y fotos por tu cuenta.",
    points: ["Catálogo y carrito", "Medios de pago", "Panel de gestión"],
    projects: ["dizainas"],
  },
  {
    id: "sistemas",
    title: "Sistemas personalizados",
    need: "Tu operación vive en planillas, mensajes y papeles, y cada vez cuesta más ordenarla.",
    help: "Desarrollamos herramientas a medida: reservas, paneles, usuarios y reportes pensados para cómo trabaja tu negocio.",
    points: ["Paneles y reportes", "Usuarios y permisos", "Hechos para tu proceso"],
    projects: [],
  },
  {
    id: "mantenimiento",
    title: "Mantenimiento web",
    need: "Tenés un sitio que necesita cambios, actualizaciones o cuidado, y nadie se ocupa.",
    help: "Nos encargamos de actualizaciones, copias de seguridad, seguridad y mejoras para que tu web siga funcionando.",
    points: ["Actualizaciones", "Copias y seguridad", "Mejoras continuas"],
    projects: [],
  },
  {
    id: "automatizaciones",
    title: "Automatizaciones digitales",
    need: "Hay tareas repetitivas que te quitan tiempo: pasar datos de un lado a otro, avisar, armar reportes.",
    help: "Conectamos tus herramientas para que avisos, formularios y reportes se hagan solos.",
    points: ["Integraciones", "Avisos automáticos", "Menos tareas manuales"],
    projects: [],
  },
];
