import Image from "next/image";
import React from "react";
import FullSearch from "../full-search/full-search";
import { chita } from "@/constants/images";

function HeroSection() {
  return (
    <div className="mb-10 pt-36 lg:mb-0">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={chita}
          alt="alt"
          width={720}
          height={480}
          className="aspect-video w-4/5 md:w-3/5 lg:w-[28%]"
        />
        <div className="">
          <h2 className="animate-pulse text-4xl font-bold max-lg:text-xl max-md:text-sm">
            سفر ضرورتی برای زندگی
          </h2>
        </div>
      </div>

      <FullSearch />
    </div>
  );
}

export default HeroSection;
