import Image from "next/image";
import Link from "next/link";
import React from "react";
import flight from "@/public/img/flightlanding.svg";
import alc from "@/public/img/alc.svg";

export default function AboutUs() {
  return (
    <div>
      <div>
        <Image
          src={flight}
          alt="airolane"
          width={100}
          height={100}
          className="-z-10 w-full"
        />
        <div className=" px-44">
          <div className="-mt-20">
            <div className=" flex w-72 items-center justify-between gap-7">
              <Link href="/about">
                <p className="w-32 cursor-pointer rounded-xl bg-yellow-primary py-3 text-center text-black">
                  درباره ما
                </p>
              </Link>
              <Link href="/contact">
                <p className="w-32 cursor-pointer rounded-xl border border-yellow-primary bg-white py-3 text-center text-[#a6a6a6]">
                  تماس با ما
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex gap-3 max-lg:mb-20 max-lg:items-center max-lg:justify-center ">
          <div>
            <Image
              src={alc}
              alt="alt"
              width={100}
              height={100}
              className="rotate-180"
            />{" "}
          </div>
          <div className="mx-auto  mt-4 w-4/5  ">
            <div className="grid grid-cols-2 items-center justify-center gap-6 max-lg:grid-cols-1 ">
              <div className="rounded-xl border border-[#D9D9D9] bg-[#EFEFEF] p-9 lg:h-80">
                <h2 className="pb-7 text-2xl font-bold text-yellow-primary">
                  اهداف ما
                </h2>
                <p className="text-justify leading-9">
                  هدف اصلی ما در بی باک سفر، ارائه‌ی خدماتی با کیفیت و استاندارد
                  در سطح بین‌المللی است. با تمرکز بر رضایت مشتریان، ما سعی
                  می‌کنیم تجربه‌ی سفر شما را به یک تجربه‌ی لاکچری و ناشناخته
                  تبدیل کنیم. از لحظه‌ی رزرو تا رسیدن به مقصد، ما همراه شما
                  خواهیم بود و اطمینان می‌دهیم که هر جزئیات سفر شما به بهترین
                  شکل ممکن انجام شود.
                </p>
              </div>
              <div className="rounded-xl border  border-[#D9D9D9] bg-white  p-9 lg:h-80">
                <h2 className="pb-7 text-2xl font-bold text-yellow-primary">
                  تیم بی باک سفر
                </h2>
                <p className="text-justify leading-9">
                  ما در بی باک سفر مفتخریم که یکی از پیشروان در صنعت هواپیمایی
                  هستیم و خدماتی بی‌نظیر را به مسافران عزیز ارائه می‌دهیم. با
                  تیمی از کارشناسان حرفه‌ای در زمینه‌ی هواپیمایی، ما بهترین
                  شرایط و تجربه را برای سفرهای شما فراهم می‌کنیم{" "}
                </p>
              </div>
              <div className="rounded-xl border  border-[#D9D9D9] bg-white  p-9 lg:h-80">
                <div className="w-1/2">
                  <p className="text-justify leading-9">
                    با تشکر از انتخاب شما برای سفر با بیلیتو. ما در انتظار
                    خدمت‌رسانی به شما هستیم و امیدواریم که تجربه‌ی سفری
                    فوق‌العاده را برای شما فراهم کنیم.
                  </p>
                  <div className="my-3">
                    <div className="flex items-center gap-3  ">
                      {" "}
                      <h2 className="text-5xl text-yellow-primary">+</h2>
                      <h2 className="text-5xl text-[#a6a6a6]">254</h2>
                    </div>

                    <p className="my-4 text-2xl text-[#a6a6a6]">
                      مقالات معتبر از بلیتو
                    </p>
                    <div>
                      <p className="w-40 rounded-xl bg-yellow-primary py-2 text-center text-white">
                        مشاهده بیشتر
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-[#D9D9D9] bg-[#EFEFEF] p-9  lg:h-80">
                <h2 className="pb-7 text-2xl font-bold text-yellow-primary">
                  خدمات ما{" "}
                </h2>
                <p className="text-justify leading-9">
                  ما در بی باک سفر مفتخریم که یکی از پیشروان در صنعت هواپیمایی
                  هستیم و خدماتی بی‌نظیر را به مسافران عزیز ارائه می‌دهیم. با
                  تیمی از کارشناسان حرفه‌ای در زمینه‌ی هواپیمایی، ما بهترین
                  شرایط و تجربه را برای سفرهای شما فراهم می‌کنیم
                </p>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={alc}
              alt="alt"
              width={100}
              height={100}
              className="-mt-44"
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
