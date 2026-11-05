# FALBIT Digital Studio — sitio web

Sitio de agencia (Next.js 16, React 19, TypeScript, Tailwind 4). Animaciones con CSS + IntersectionObserver; Lenis solo para scroll suave con mouse. Sin librerías 3D ni de animación pesadas.
**Estado:** rediseño local. El sitio publicado anterior (falbit-web.vercel.app) todavía no tiene este rediseño.

## Comandos

```bash
npm install
npm run dev        # desarrollo
npm run build      # build de producción
npm run start      # servir el build
npm run typecheck
```

## Estructura de la home

Inicio → Qué hacemos → Proyectos destacados → Cómo trabajamos → Sobre Falbit → Preguntas → Contacto.

## Qué editar (y dónde)

| Qué | Archivo |
|---|---|
| Nombre, textos globales, Instagram, WhatsApp, correo, dominio, menú | `src/data/site.ts` |
| Servicios (necesidad, cómo ayudamos, proyectos relacionados) | `src/data/services.ts` |
| Proyectos del portfolio | `src/data/projects.ts` |
| Preguntas frecuentes | `src/data/faq.ts` |
| Pasos del proceso | `src/data/process.ts` |
| Colores y tipografía (tokens) | `src/styles/globals.css` y `src/app/layout.tsx` |

## Agregar un proyecto

1. Capturas en `public/proyectos/<slug>/`: `escritorio.webp` (1280×800), `movil.webp` (780×1688) y, opcional, `escritorio-completa.webp` (página entera, ~1100 px de ancho) para el recorrido al pasar el mouse.
2. Copiar una entrada de `src/data/projects.ts` y completarla (categoría, objetivo, qué se hizo, tecnologías, URL pública). Si usa datos de ejemplo, `kind: "demo"` y la ficha lo rotula.
3. Los filtros (Sitios web / Tiendas online / Sistemas) y las páginas `/proyectos/<slug>` se generan solos.

## Pendientes (datos que faltan)

Lo siguiente **no está confirmado** y no se inventó. En `npm run dev` se ve marcado en rojo dentro de cada ficha y del FAQ; en producción no se muestra.

1. **Logo oficial del halcón:** `src/components/ui/Logo.tsx` y `src/data/hawk.ts` siguen siendo marcadores provisorios.
2. **Contacto real:** Instagram, WhatsApp y correo vacíos en `src/data/site.ts` (hoy la web muestra “próximamente”).
3. **Recepción del formulario:** definir `CONTACT_WEBHOOK_URL` (ver `.env.example`). Sin esa variable `/api/contacto` responde 503 y la web avisa que no se envió. Agregar límite de envíos por persona antes de publicar.
4. **Autorización de clientes** para mostrar Ossola, Dizainas y Martínez Seguros.
5. **Ossola:** su sitio aún usa imágenes de demostración; volver a capturar con fotos reales. Listado final de servicios por validar.
6. **Martínez Seguros:** algunas categorías de seguros figuran sin validar.
7. **Vitalia:** se muestra como “Demostración” (datos de ejemplo). Confirmar si hay un cliente real. Falta captura de página completa.
8. **Textos de objetivo / qué se hizo** de cada proyecto: redactados a partir de los README de cada sitio; revisar.
9. **FAQ:** definir precios o rangos, plazos, entregables (código, dominio, hosting) y planes de mantenimiento.
10. **Sobre Falbit:** sin años, equipo ni cifras. Agregar solo datos reales.
11. **Dominio y SEO:** hecho (falbitstudio.com, indexable, imagen Open Graph, robots y sitemap). Falta verificar el sitio en Google Search Console.
12. **Colores de marca:** contrastar tokens con los archivos originales.

## Rendimiento y accesibilidad

- Capturas de proyectos pre-optimizadas en WebP (30–300 KB); el hero carga solo la primera con prioridad.
- El hero rota capturas reales con CSS puro; el texto entra sin esperar JavaScript.
- Recorrido de páginas: transición de `object-position`, sin JS por fotograma. En táctil, botón “Recorrer la página” en cada ficha.
- Menú con resaltado de sección activa, barra de progreso y menú móvil con Escape.
- Acordeones (servicios, FAQ) con `aria-expanded`, `aria-controls` y contenido inerte cuando está cerrado.
- `prefers-reduced-motion`: sin rotación, sin recorridos, sin scroll suave; el proceso se ve completo.
- Enlace “Saltar al contenido”, foco visible, objetivos táctiles de 44 px o más.

