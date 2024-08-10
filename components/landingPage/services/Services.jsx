import Image from "next/image";
import React from "react";
import a from "@/public/img/bestImage.svg";
import b from "@/public/img/bestLocation.svg";
import c from "@/public/img/bestCalender.svg";
import d from "@/public/img/bestDiscount.svg";

export default function Services() {
  return (
    <div className="mt-20 lg:mt-10">
      <div className="mx-auto w-4/5">
        <div className="grid grid-cols-2 items-center justify-between gap-9 max-lg:grid-cols-1">
          <div className=" ">
            <div>
              <Image
                src={a}
                width={540}
                height={480}
                alt="alt"
                className="max-lg:h-96 max-lg:w-full"
              />
            </div>
          </div>
          <div className="">
            <div>
              <h4 className="text-xl text-white max-lg:text-lg max-md:text-sm">
                خدمات اصلی
              </h4>
              <h2 className="py-4 text-3xl text-[#191825] max-lg:text-xl max-md:text-lg">
                ارائه بهترین خدمات
              </h2>
              <p className="pb-11 leading-9 text-[#19182580] max-md:text-sm">
                از لحظه‌ی رزرو تا رسیدن به مقصد، ما همراه شما خواهیم بود و
                اطمینان می‌دهیم که هر جزئیات سفر شما به بهترین شکل ممکن انجام
                شود
              </p>

              <div className="flex w-4/5 flex-col gap-9  max-md:w-full">
                <div className="flex    gap-9 p-7">
                  <Image
                    src={b}
                    alt="alt"
                    width={100}
                    height={100}
                    className="h-20 w-20 max-lg:h-14 max-lg:w-14 max-md:h-11 max-md:w-11"
                  />
                  <div>
                    <h3 className="pb-4 text-xl text-[#191825] max-lg:text-lg max-md:text-sm">
                      ارائه بهترین خدمات
                    </h3>
                    <p className="text-[#999] max-md:text-xs">
                      ما خدمات ویژه‌ای برای مسافران خاص از جمله کودکان، سالمندان
                      و افراد دارای نیازهای خاص ارائه می‌دهیم تا سفری راحت و
                      بی‌دغدغه را تجربه کنند.
                    </p>
                  </div>
                </div>
                <div className="flex gap-9   rounded-3xl border border-white p-7">
                  <div>
                    <h3 className="pb-4 text-xl text-[#191825] max-lg:text-lg max-md:text-sm">
                      برنامه ریزی سفر
                    </h3>
                    <p className="text-[#999] max-md:text-xs">
                      تیم پشتیبانی مشتریان ما در تمام ساعات شبانه‌روز آماده
                      پاسخگویی به سوالات و حل مشکلات شماست.
                    </p>
                  </div>
                  <Image
                    src={c}
                    alt="alt"
                    width={100}
                    height={100}
                    className="h-20 w-20 max-lg:h-14 max-lg:w-14 max-md:h-11 max-md:w-11"
                  />
                </div>
                <div className="flex gap-9  p-7">
                  <Image
                    src={d}
                    alt="alt"
                    width={100}
                    height={100}
                    className="h-20 w-20 max-lg:h-14 max-lg:w-14 max-md:h-11 max-md:w-11"
                  />
                  <div>
                    <h3 className="pb-4 text-xl text-[#191825] max-lg:text-lg max-md:text-sm">
                      ارائه بهترین تخفیف ها
                    </h3>
                    <p className="text-[#999] max-md:text-xs">
                      ما به مشتریان وفادار خود طرح‌های تخفیفی و پاداش‌های ویژه
                      ارائه می‌دهیم.{" "}
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
