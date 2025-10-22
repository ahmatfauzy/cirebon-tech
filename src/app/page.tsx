import HeroSection from "@/components/hero-section";



export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4 py-10 ">
        <section className="flex flex-col gap-4">
          <HeroSection />
        </section>

      </div>
    </>
  );
}
