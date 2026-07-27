import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CrewSection from "@/components/CrewSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingMascot from "@/components/FloatingMascot";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CrewSection />
        <ServicesSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingMascot />
    </>
  );
}
