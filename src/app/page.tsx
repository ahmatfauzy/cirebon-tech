import AboutSection from "@/components/about-section";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <HeroSection />
          <AboutSection />
        </section>
      </div>
    </>
  );
}
