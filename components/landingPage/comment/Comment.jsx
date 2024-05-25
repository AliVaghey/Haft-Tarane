import Image from "next/image";
import React from "react";
import { ChevronRightIcon, ChevronLeftIcon, StarIcon } from "lucide-react";
import imgComment from "@/public/img/commentImg.svg";

export default function Comment() {
  return (
    <div className="py-20">
      <div className="mx-auto w-4/5">
        <h2 className="pb-20 text-center text-5xl max-md:pb-12">
          اعتماد به نظر مشتریان ما
        </h2>
        <div className="mx-auto flex w-3/5 items-center justify-between gap-9 max-md:w-full">
          <ChevronRightIcon className="size-24 cursor-pointer" />
          <div className="flex flex-col items-center justify-center gap-4 max-md:gap-7">
            <p className="mx-auto w-4/5 leading-9   text-[#292F36] max-md:w-full">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است،
            </p>
            <Image
              src={imgComment}
              alt="alt"
              width={480}
              height={360}
              className="h-28 w-28"
            />
            <h2 className="text-2xl font-bold text-[#2E2828]">علی محمدی</h2>
            <h3 className="text-sm text-[#444]">مسافر هواپیما</h3>
            <div className="mt-14 flex items-center justify-center gap-3 max-md:mb-20">
              <StarIcon />

              <StarIcon fill="#fff" stroke="" className="size-8" />
              <StarIcon fill="#fff" stroke="" className="size-8" />
              <StarIcon fill="#fff" stroke="" className="size-8" />
              <StarIcon fill="#fff" stroke="" className="size-8" />
            </div>
          </div>
          <ChevronLeftIcon className="size-24 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
