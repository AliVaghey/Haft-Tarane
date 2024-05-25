import Image from "next/image";
import React from "react";
import circle from "@/public/img/bestCircleGroup.svg"
import bag from "@/public/img/bag.svg"
import group from "@/public/img/GroupLast.svg"

export default function OurService() {
  return (
    <div className="pb-16">
      <div className="relative">
        <Image
          src={circle}
          width={360}
          height={240}
          className=" absolute right-0 h-[777px] -mt-72"
        />
      </div>
      <div className="w-4/5 mx-auto z-40 relative">
        <div className="flex flex-wrap max-lg:flex-col-reverse justify-between items-center">
          <div className="w-1/2 max-lg:w-full">
            <h2 className="text-xl text-[#2D2C2C] font-semibold"> خدمات ما</h2>
            <h3 className="text-[#2D2C2C] text-4xl w-1/2 py-9">
              بهترین خدمات مسافرتی برای شما
            </h3>
            <p className="w-2/3 leading-9 text-justify text-[#5B5F62]">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است
            </p>
            <div className="bg-white w-44 flex justify-center items-center gap-4 py-2 rounded-3xl my-9 cursor-pointer">
              <Image
                src={bag}
                alt="alt"
                width={360}
                height={240}
                className="size-9"
              />
              <p>سفر در جهان</p>
            </div>
          </div>
          <div className="w-1/2 max-lg:w-full">
            <Image
              src={group}
              alt="alt"
              className="size-[666px]"
              width={1080}
              height={720}
            />
            {/* <Image
              src="/img/circle.svg"
              alt="alt"
              width={100}
              height={100}
              className="size-[555px] z-10 relative"
            />
            <div className="absolute bottom-1/2 left-32 translate-y-1/2 z-20 max-lg:hidden">
              <Image
                src="/img/easyGroup.svg"
                width={360}
                height={240}
                className="size-64 "
              />
            </div> */}
            {/* <div>
              <div className="bg-white p-7 size-96 max-md:size-64 rounded-3xl absolute bottom-1/2 translate-y-1/2 z-20 max-md:bottom-72 max-md:left-11 max-lg:bottom-[277px] max-lg:right-20  ">
                <Image
                  src="/img/specialTourImage.svg"
                  alt="alt"
                  className="w-full "
                  width={480}
                  height={360}
                />
                <h2 className="py-4 text-center text-xl tracking-wide	">
                  آغاز ماجراجویی اینجاست
                </h2>
                <p className="text-[#2D3134] max-lg:hidden ">
                  تورهای گروهی بی باک سفر، تجربه‌ای ناب از سفر
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
