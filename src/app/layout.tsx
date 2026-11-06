import type { Metadata, Viewport } from "next";
import { Montserrat, Instrument_Serif } from "next/font/google";
import { site } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { SectionNav } from "@/components/layout/SectionNav";
import { MagneticCursor } from "@/components/layout/MagneticCursor";
import "@/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} ${site.sub} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    title: `${site.name} ${site.sub}`,
    description: site.description,
    locale: site.locale,
    type: "website",
    siteName: site.name,
    images: [{ url: "/marca/og.png", width: 1200, height: 630, alt: "FALBIT Digital Studio" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0d0d0d", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${montserrat.variable} ${instrument.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!sessionStorage.getItem("fb-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-pending")}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a
          href="#contenido"
          className="fixed left-4 top-4 z-[200] -translate-y-20 rounded-full bg-champagne px-5 py-3 text-sm font-semibold text-carbon focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <SmoothScroll />
        <MagneticCursor />
        <Header />
        <SectionNav />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
