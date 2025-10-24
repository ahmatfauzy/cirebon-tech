import React from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import Drone from "../../public/drone-ai.webp";

const AboutSection = () => {
  return (
    <div className="flex items-center max-w-7xl w-full mx-auto">
      <div className="flex flex-col items-center justify-center gap-2 px-10">
        <Badge>About Us</Badge>
        <p className="text-sm text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet
          dignissimos veniam ducimus atque voluptas? Possimus saepe, vel
          provident cupiditate quasi maxime, animi dolor sequi ducimus quas
          voluptates inventore. Tempore tempora, quam id error beatae eaque quis
          nemo architecto qui modi!
        </p>

        <div className="flex items-center justify-between gap-20 mt-5">
          <Image src={Drone} alt="Drone" width={600} className="rounded-md" />
          {/* Text */}
          <div className="grid grid-cols-1 max-w-md gap-5">
            {/* Grid card */}
            <div className="flex gap-2">
              <h2 className="text-5xl font-extrabold">12M+</h2>
              {/* description */}
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-bold">
                  Happy Drone Seekers All over the world
                </h5>
                <p className="text-sm font-semibold">
                  Founded by a team of passionate educators and tech enthusiast,
                  blends innovative technology
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <h2 className="text-5xl font-extrabold">12M+</h2>
              {/* description */}
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-bold">
                  Happy Drone Seekers All over the world
                </h5>
                <p className="text-sm font-semibold">
                  Founded by a team of passionate educators and tech enthusiast,
                  blends innovative technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
