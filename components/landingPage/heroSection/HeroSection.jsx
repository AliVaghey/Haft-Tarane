import Image from "next/image";
import React from "react";
import cheetah from "@/public/img/cheetah.svg";
import videoBtn from "@/public/img/video-btn.svg";
import SearchBox from "../searchBox/SearchBox";
import ResponsiveBox from "../responsiveSearchBox/ResponsiveBox";

function HeroSection() {
  return (
    <div className="h-screen ">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={cheetah}
          alt="alt"
          width={480}
          height={360}
          className="w-[777px] max-lg:w-80 max-lg:h-60 h-96 max-md:w-44 max-md:h-32"
        />
        <div className="">
          <h2 className="text-4xl max-md:text-sm font-bold max-lg:text-xl ">
            خرید بلیط ارزان از{" "}
            <span className="text-[#2B303D]">بی باک سفر</span>
          </h2>
        </div>
        <div className="flex items-center gap-4 lg:-mt-9 max-md:mt-4 mb-9 ml-[777px] max-lg:ml-0 max-lg:mt-7 max-md:ml-4 ">
          <div className="flex justify-between items-center gap-3 max-md:gap-1 bg-white max-md:px-4 max-md:py-2 px-5 py-3 rounded-3xl">
            <p className="max-md:text-sm">ویدئو معرفی</p>
            <Image
              src={videoBtn}
              alt="alt"
              width={100}
              height={100}
              className="w-7 h-7 max-md:w-4 max-md:h-4"
            />
          </div>
          <div className="bg-[#2B303D] text-white max-md:px-3 max-md:py-2 px-4 py-2 rounded-3xl flex items-center justify-center shadow-2xl ">
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
