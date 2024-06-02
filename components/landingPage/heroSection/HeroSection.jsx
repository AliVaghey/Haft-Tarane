import Image from "next/image";
import React from "react";
import cheetah from "@/public/img/cheetah.svg";
import videoBtn from "@/public/img/video-btn.svg";
import SearchBox from "../searchBox/SearchBox";
import ResponsiveBox from "../responsiveSearchBox/ResponsiveBox";

function HeroSection() {
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={cheetah}
          alt="alt"
          width={480}
          height={360}
          className="mt-40 h-96 w-[500px] max-lg:h-72 max-lg:w-[430px] max-md:h-48 max-md:w-72 md:mt-28 lg:-mb-14 lg:mt-14"
        />
        <div className="">
          <h2 className="text-4xl font-bold max-lg:text-xl max-md:text-sm ">
            خرید بلیط ارزان از{" "}
            <span className="text-[#2B303D]">بی باک سفر</span>
          </h2>
        </div>
        <div className="mb-9 ml-[777px] flex items-center gap-4 max-lg:ml-0 max-lg:mt-7 max-md:ml-4 max-md:mt-4 lg:-mt-9 ">
          <div className="flex items-center justify-between gap-3 rounded-3xl bg-white px-5 py-3 max-md:gap-1 max-md:px-4 max-md:py-2">
            <p className="max-md:text-sm">ویدئو معرفی</p>
            <Image
              src={videoBtn}
              alt="alt"
              width={100}
              height={100}
              className="h-7 w-7 max-md:h-4 max-md:w-4"
            />
          </div>
          <div className="flex items-center justify-center rounded-3xl bg-[#2B303D] px-4 pb-3 pt-2 text-white shadow-2xl max-md:px-3 max-md:py-2 ">
            <p className="max-md:text-xs">رزرو بلیط</p>
          </div>
        </div>
      </div>
      <SearchBox className="max-lg:hidden" />
      <ResponsiveBox className="max-lg:visible lg:hidden" />
    </div>
  );
}

export default HeroSection;
