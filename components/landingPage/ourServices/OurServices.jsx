import Image from "next/image";
import React from "react";
import a from "@/public/img/bestCircleGroup.svg";
import b from "@/public/img/bag.svg";
import c from "@/public/img/GroupLast.svg";

export default function OurService() {
  return (
    <div className="h-screen">
      <div className="lg:relative max-lg:mt-16   ">
        <Image
          src={a}
          width={360}
          height={240}
          className=" lg:absolute lg:right-0 h-[666px] max-lg:hidden"
        />
      </div>
      <div className=" z-40 mx-auto w-4/5">
        <div className="flex flex-wrap items-center justify-between max-lg:flex-col-reverse">
          <div className="w-1/2 max-lg:w-full pt-14">
            <h2 className="text-xl font-semibold text-[#2D2C2C] max-lg:text-lg max-md:text-sm">
              {" "}
              خدمات ما
            </h2>
            <h3 className="w-1/2 py-9 max-lg:py-4 text-4xl text-[#2D2C2C] max-lg:text-lg max-md:w-full max-md:text-sm">
              بهترین خدمات مسافرتی برای شما
            </h3>
            <p className="w-2/3 text-justify leading-9 text-[#5B5F62] max-lg:w-full max-lg:text-sm max-md:text-xs">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است
            </p>
            <div className="my-9 flex w-44 cursor-pointer items-center justify-center gap-4 rounded-3xl bg-white py-2">
              <Image
                src={b}
                alt="alt"
                width={360}
                height={240}
                className="h-9 w-9 max-lg:h-7 max-lg:w-7 max-md:h-5 max-md:w-5"
              />
              <p className="max-md:text-sm">سفر در جهان</p>
            </div>
          </div>
          <div className="w-1/2 max-lg:w-full">
            <Image
              src={c}
              alt="alt"
              className="h-[666px] w-[666px] max-lg:h-[299px] max-lg:w-full max-md:h-[222px]"
              width={480}
              height={360}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
