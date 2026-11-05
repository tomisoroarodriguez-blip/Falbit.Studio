// `pending`: respuesta que todavía no tiene una política definida por FALBIT. Se marca solo en desarrollo
// y figura en el README. Las respuestas son deliberadamente genéricas para no prometer nada que no esté definido.
export const faqs: { q: string; a: string; pending?: string }[] = [
  {
    q: "¿Qué tipo de proyectos hacen?",
    a: "Desarrollo web, tiendas online, sistemas personalizados, mantenimiento web y automatizaciones digitales. Si no estás seguro de cuál necesitás, contanos tu idea y la ordenamos juntos.",
  },
  {
    q: "¿Cuánto cuesta una web?",
    a: "Depende de lo que necesites: no es lo mismo un sitio institucional que una tienda o un sistema. Contanos tu idea y te respondemos con una propuesta clara antes de empezar.",
    pending: "Definir si se publican precios o rangos orientativos.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "El plazo depende del alcance. Después de conocer tu proyecto te damos un estimado concreto.",
    pending: "Definir plazos orientativos por tipo de proyecto.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Alcanza con una idea y un objetivo. Si ya tenés logo, textos o fotos, mejor; si no, te orientamos sobre qué conviene preparar.",
  },
  {
    q: "¿Qué recibo al terminar?",
    a: "Un proyecto publicado y funcionando, probado en celular y escritorio.",
    pending: "Definir entregables: propiedad del código, dominio, hosting y capacitación.",
  },
  {
    q: "¿Hacen mantenimiento después de publicar?",
    a: "Sí, ofrecemos mantenimiento web: actualizaciones, copias de seguridad, seguridad y mejoras. Lo acordamos según lo que necesite tu proyecto.",
    pending: "Definir planes, alcance y costos de mantenimiento.",
  },
  {
    q: "¿Puedo ver trabajos terminados?",
    a: "Sí. En Proyectos destacados mostramos trabajos reales: uno ya publicado, que podés visitar, y otro en curso.",
  },
];
