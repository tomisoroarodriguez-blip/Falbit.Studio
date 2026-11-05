import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
