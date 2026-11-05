// Transición suave entre páginas con CSS puro (sin librerías). Se acorta con reduced-motion (ver globals.css).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
