import React from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import Drone from "../../public/drone-ai.webp";

const AboutSection = () => {
  return (
    <section className="flex flex-col items-center max-w-7xl w-full mx-auto md:px-0 px-5 py-10">
      <Badge className="px-5 text-lg">Tentang AgroWin</Badge>

      <div className="flex sm:flex-row flex-col items-center justify-between gap-12 mt-8">
        <Image
          src={Drone}
          alt="AI Agriculture Illustration"
          width={550}
          className="rounded-xl shadow-md object-cover"
          priority
        />

        <div className="flex flex-col gap-4 max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Inovasi AI untuk Pertanian Cerdas
          </h2>

          <p className="text-sm md:text-base text-muted-foreground">
            AgroWin dikembangkan untuk membantu petani menentukan waktu tanam
            dan panen terbaik, mendeteksi tanda awal penyakit tanaman, serta
            memahami kondisi lingkungan melalui analisis berbasis kecerdasan
            buatan.
          </p>

          <p className="text-sm md:text-base text-muted-foreground">
            AgroWin masih dalam tahap pengembangan dan uji coba internal, dengan
            fokus pada penyempurnaan model AI dan kemudahan penggunaan bagi
            petani.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
