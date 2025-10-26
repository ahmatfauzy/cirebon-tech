import AboutSection from "@/components/about-section";
import CalculateSection from "@/components/calculate-section";
import FeatureSection from "@/components/feature-section";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4 overflow-hidden">
        <section className="flex flex-col gap-4">
          <HeroSection />
          <AboutSection />
          <FeatureSection />
          <CalculateSection />
        </section>
      </div>
    </>
  );
}
