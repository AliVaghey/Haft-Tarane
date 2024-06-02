import Image from "next/image";
import React from "react";
import { ChevronRightIcon, ChevronLeftIcon, StarIcon } from "lucide-react";
import a from "@/public/img/commentImg.svg";

export default function Comment() {
  return (
    <div className="lg:h-screen">
      <div className="mx-auto w-4/5">
        <h2 className="py-20 text-center text-5xl font-bold max-lg:text-xl max-md:py-12 max-md:text-sm">
          اعتماد به نظر مشتریان ما
        </h2>
        <div className="mx-auto flex w-3/5 items-center justify-between gap-9 max-lg:w-4/5 max-md:w-full">
          <ChevronRightIcon className="size-24 cursor-pointer" />
          <div className="flex flex-col items-center justify-center gap-4 max-md:gap-7">
            <p className="mx-auto w-4/5 text-justify leading-9 text-[#292F36] max-lg:w-full max-lg:pb-9 max-lg:text-lg max-md:text-sm">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است،
            </p>
            <Image
              src={a}
              alt="alt"
              width={360}
              height={240}
              className="h-28 w-28 max-lg:h-16 max-lg:w-16 max-md:h-11 max-md:w-11"
            />
            <h2 className="text-2xl font-bold text-[#2E2828] max-lg:text-lg max-md:text-sm">
              علی محمدی
            </h2>
            <h3 className="text-sm text-[#444] max-md:text-xs">
              مسافر هواپیما
            </h3>
            <div className="mt-14 flex items-center justify-center gap-3 max-md:mb-20">
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
