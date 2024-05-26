import Image from "next/image";
import React from "react";
import a from "@/public/img/bestImage.svg";
import b from "@/public/img/bestLocation.svg";
import c from "@/public/img/bestCalender.svg";
import d from "@/public/img/bestDiscount.svg";

export default function Services() {
  return (
    <div className=" mt-6 max-lg:mt-64">
      <div className="w-4/5 mx-auto">
        <div className="grid grid-cols-2 justify-between max-lg:grid-cols-1 items-center gap-9">
          <div className=" ">
            <div>
              <Image
                src={a}
                width={540}
                height={480}
                alt="alt"
                className="max-lg:w-full max-lg:h-96"
              />
            </div>
          </div>
          <div className="">
            <div>
              <h4 className="text-white text-xl max-lg:text-lg max-md:text-sm">
                خدمات اصلی
              </h4>
              <h2 className="text-[#191825] text-3xl max-lg:text-xl max-md:text-lg py-4">
                ارائه بهترین خدمات
              </h2>
              <p className="text-[#19182580] leading-9 pb-11 max-md:text-sm">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است،
              </p>

              <div className="w-4/5 max-md:w-full flex flex-col  gap-9">
                <div className="flex    gap-9 p-7">
                  <Image
                    src={b}
                    alt="alt"
                    width={100}
                    height={100}
                    className="w-20 h-20 max-lg:w-14 max-lg:h-14 max-md:w-11 max-md:h-11"
                  />
                  <div>
                    <h3 className="text-[#191825] text-xl max-lg:text-lg max-md:text-sm pb-4">
                      ارائه بهترین خدمات
                    </h3>
                    <p className="text-[#999] max-md:text-xs">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                    </p>
                  </div>
                </div>
                <div className="flex p-7   gap-9 border border-white rounded-3xl">
                  <div>
                    <h3 className="text-[#191825] text-xl max-lg:text-lg max-md:text-sm pb-4">
                      برنامه ریزی سفر
                    </h3>
                    <p className="text-[#999] max-md:text-xs">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم{" "}
                    </p>
                  </div>
                  <Image
                    src={c}
                    alt="alt"
                    width={100}
                    height={100}
                    className="w-20 h-20 max-lg:w-14 max-lg:h-14 max-md:w-11 max-md:h-11"
                  />
                </div>
                <div className="flex p-7  gap-9">
                  <Image
                    src={d}
                    alt="alt"
                    width={100}
                    height={100}
                    className="w-20 h-20 max-lg:w-14 max-lg:h-14 max-md:w-11 max-md:h-11"
                  />
                  <div>
                    <h3 className="text-[#191825] text-xl max-lg:text-lg max-md:text-sm pb-4">
                      ارائه بهترین تخفیف ها
                    </h3>
                    <p className="text-[#999] max-md:text-xs">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
