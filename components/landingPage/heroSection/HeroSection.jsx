import React from "react";
import Image from "next/image";
import cheetah from "@/public/img/cheetah.svg";
import { Button } from "@/components/ui/button";
import btnSvg from "@/public/img/video-btn.svg";

export default function HeroSection() {
  return (
    <div className="bg-yellow-primary ">
      <div className="mx-auto w-4/5">
        <div className=" flex flex-col items-center justify-center">
          <Image
            src={cheetah}
            alt="alt"
            width={1080}
            height={720}
            className="w-[666px]"
          />
          <div className="flex items-center justify-between ">
            <h1 className="text-4xl font-bold max-lg:text-xl max-md:text-sm">
              خرید بلیط ارزان از
              <span className="text-[#2B303D]">بی باک سفر</span>
            </h1>
          </div>
        </div>
        <div className=" flex items-center gap-7 max-lg:hidden max-md:justify-center  lg:-mt-12">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-xl border border-gray-dark p-7 text-xl text-gray-dark hover:text-yellow-primary max-lg:p-4 max-lg:text-lg max-md:p-2 max-md:text-sm   "
          >
            ویدئو معرفی
            <Image
              src={btnSvg}
              alt="alt"
              width={1080}
              height={720}
              className="size-9 max-md:size-6"
            />
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border border-gray-dark bg-gray-dark text-white hover:bg-gray-dark hover:text-yellow-primary"
          >
            رزرو بلیط
          </Button>
        </div>
      </div>
    </div>
  );
}
