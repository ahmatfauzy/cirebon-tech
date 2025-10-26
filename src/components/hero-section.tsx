import React from "react";
import Image from "next/image";
import Drone from "../../public/drone-ai.webp";
import { Button } from "./ui/button";
import { MoveUpRight } from "lucide-react";
import User from "../../public/profile-farmer.webp";

export default function HeroSection() {
  return (
    <div className="flex items-center justify-center w-full py-10">
      <div className="flex md:flex-row flex-col-reverse items-center justify-between w-full max-w-6xl md:px-0 sm:px-3 px-5 ">
        {/* Text */}
        <div className="flex flex-col items-start gap-6 max-w-md py-10  ">
          <div className="flex flex-col gap-2">
            <h1 className="md:text-5xl sm:text-3xl text-2xl font-bold">
              Inovasi Pertanian Cerdas <br /> Berbasis Kecerdasan Buatan
            </h1>
            <p className="text-sm font-semibold">
              AgroWin adalah Aplikasi web yang membantu petani menentukan waktu
              tanam dan panen terbaik melalui analisis data cuaca dan lingkungan
              secara cerdas.
            </p>
          </div>
          {/* Action */}
          <div className="flex justify-start w-full">
            <Button variant={"roundedFull"} className="py-4 px-6">
              Ayo Mulai
            </Button>
            <Button variant={"roundedFull"} className="bg-black">
              <MoveUpRight className="size-3" />
            </Button>
          </div>

          {/* User */}
          <div className="flex items-center gap-2">
            <div className="flex items-start justify-items-start gap-3 bg-white px-4 py-2 rounded-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <Image
                  key={index}
                  src={User}
                  alt="User"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              ))}
            </div>
            <p className="text-sm font-semibold">100+ Satisfied Farmers </p>
          </div>
        </div>
        {/* Image */}
        <Image
          src={Drone}
          alt="Drone"
          width={600}
          height={500}
          className="rounded-md"
        />
      </div>
    </div>
  );
}
