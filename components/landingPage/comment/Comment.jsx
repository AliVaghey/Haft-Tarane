import Image from "next/image";
import React from "react";
import { ChevronRightIcon, ChevronLeftIcon, StarIcon } from "lucide-react";
import a from "@/public/img/commentImg.svg";

export default function Comment() {
  return (
    <div className="h-screen">
      <div className="w-4/5 mx-auto">
        <h2 className="text-center text-5xl max-lg:text-xl max-md:text-sm font-bold py-20 max-md:py-12">
          اعتماد به نظر مشتریان ما
        </h2>
        <div className="w-3/5 max-lg:w-4/5 max-md:w-full mx-auto flex justify-between items-center gap-9">
          <ChevronRightIcon className="size-24 cursor-pointer" />
          <div className="flex flex-col items-center justify-center max-md:gap-7 gap-4">
            <p className="leading-9 w-4/5 max-lg:w-full   mx-auto text-[#292F36] max-lg:text-lg max-md:text-sm max-lg:pb-9">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است،
            </p>
            <Image
              src={a}
              alt="alt"
              width={360}
              height={240}
              className="w-28 h-28 max-lg:w-16 max-lg:h-16 max-md:w-11 max-md:h-11"
            />
            <h2 className="text-[#2E2828] text-2xl font-bold max-lg:text-lg max-md:text-sm">
              علی محمدی
            </h2>
            <h3 className="text-[#444] text-sm max-md:text-xs">
              مسافر هواپیما
            </h3>
            <div className="flex justify-center items-center gap-3 mt-14 max-md:mb-20">
              <StarIcon className="size-8 max-lg:size-5 max-md:size-3" />

              <StarIcon
                fill="#fff"
                stroke=""
                className="size-8 max-lg:size-6 max-md:size-4"
              />
              <StarIcon
                fill="#fff"
                stroke=""
                className="size-8 max-lg:size-6 max-md:size-4"
              />
              <StarIcon
                fill="#fff"
                stroke=""
                className="size-8 max-lg:size-6 max-md:size-4"
              />
              <StarIcon
                fill="#fff"
                stroke=""
                className="size-8 max-lg:size-6 max-md:size-4"
              />
            </div>
          </div>
          <ChevronLeftIcon className="size-24 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
