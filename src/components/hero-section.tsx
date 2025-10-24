import React from "react";
import Image from "next/image";
import Drone from "../../public/drone-ai.webp";
import { Button } from "./ui/button";
import { MoveUpRight } from "lucide-react";
import User from "../../public/profile-farmer.webp";

export default function HeroSection() {
  return (
    <div className="flex items-center justify-center w-full py-10">
      <div className=" flex items-center justify-between w-full max-w-6xl">
        {/* Text */}
        <div className="flex flex-col items-start gap-6 max-w-md py-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-bold">
              Revolutionizing Agriculture Through <br /> AI Technology
            </h1>
            <p className="text-sm font-semibold">
              Founded by a team of passionate educators and tech entusiast,
              blends innoactive technology
            </p>
          </div>
          {/* Action */}
          <div className="flex justify-start w-full">
            <Button variant={"roundedFull"} className="py-4 px-6">
              Get Started
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
