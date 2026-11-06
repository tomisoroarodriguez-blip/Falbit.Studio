import { Intro } from "@/components/layout/Intro";
import { Demo } from "@/components/sections/Demo";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Intro />
      <Hero />
      <Services />
      <Portfolio />
      <Packages />
      <Demo />
      <Process />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
