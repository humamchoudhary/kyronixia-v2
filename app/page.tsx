import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import Hub from "@/components/sections/Hub";
import Pricing from "@/components/sections/Pricing";
import Solutions from "@/components/sections/Solutions";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Hub />
      <Solutions />
      <Pricing />
      <FAQ />
      <Contact />
    </div>
  );
}
