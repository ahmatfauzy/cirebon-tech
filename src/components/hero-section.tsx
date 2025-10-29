import Image from "next/image";
import Handphone from "../../public/hp-hero-section.webp";
import { Button } from "./ui/button";
import Link from "next/link";
import User from "../../public/profile-farmer.webp";

export default function HeroSection() {
  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="order-1 lg:order-2 lg:col-span-6">
            <div className="relative flex items-center justify-center w-full aspect-[5/4] sm:aspect-[4/3] md:aspect-[4/3]">
              <Image
                src={Handphone}
                width={400}
                alt="Drone pertanian bertenaga AI memantau lahan"
                className="object-cover rounded-xl"
                sizes="(min-width: 1024px) 48vw, (min-width: 640px) 80vw, 95vw"
              />
            </div>
          </div>

          {/* Teks + aksi */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <div className="max-w-2xl">
              <h1
                className="text-balance font-bold tracking-tight
                             text-3xl sm:text-4xl lg:text-5xl
                             leading-tight"
              >
                Inovasi Pertanian Cerdas <br className="hidden sm:block" />
                Berbasis Kecerdasan Buatan
              </h1>

              <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                AgroWin adalah aplikasi web yang membantu petani menentukan
                waktu tanam dan panen terbaik melalui analisis data cuaca dan
                lingkungan secara cerdas.
              </p>

              {/* Aksi */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/deteksi" passHref>
                  <Button asChild variant="roundedFull" className="py-4 px-6">
                    <span>Ayo Mulai</span>
                  </Button>
                </Link>

              </div>

              {/* User */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Image
                      key={i}
                      src={User}
                      alt="Foto petani pengguna Agro"
                      width={36}
                      height={36}
                      className="rounded-full ring-2 ring-white dark:ring-gray-900"
                    />
                  ))}
                </div>
                <p className="text-sm sm:text-base font-semibold">
                  100+ Satisfied Farmers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
