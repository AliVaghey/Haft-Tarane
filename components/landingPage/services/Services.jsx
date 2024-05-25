import Image from "next/image";
import React from "react";
import bestImage from "@/public/img/bestImage.svg";
import bestLocation from "@/public/img/bestLocation.svg";
import bestDiscount from "@/public/img/bestDiscount.svg";

export default function Services() {
  return (
    <div>
      <div className="mx-auto w-4/5">
        <div className="flex flex-wrap items-center justify-between max-lg:flex-col">
          <div className="w-1/2 max-lg:w-full">
            <div className="p-9">
              <div>
                <Image
                  src={bestImage}
                  width={540}
                  height={480}
                  alt="alt"
                  className=""
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 max-lg:w-full">
            <div className="p-9">
              <div>
                <h4 className="text-xl text-white">خدمات اصلی</h4>
                <h2 className="py-4 text-3xl text-[#191825]">
                  ارائه بهترین خدمات
                </h2>
                <p className="mb-16 leading-9 text-[#19182580]">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است،
                </p>

                <div className="flex w-4/5 flex-col gap-9  max-md:w-full">
                  <div className="flex gap-9   p-7 max-lg:flex-col">
                    <Image
                      src={bestLocation}
                      alt="alt"
                      width="100"
                      height="100"
                      className="size-20"
                    />
                    <div>
                      <h3 className="mb-4 text-xl text-[#191825]">
                        ارائه بهترین خدمات
                      </h3>
                      <p className="text-[#999]">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-9 rounded-3xl  border border-white p-7 max-lg:flex-col-reverse">
                    <div>
                      <h3 className="mb-4 text-xl text-[#191825]">
                        برنامه ریزی سفر
                      </h3>
                      <p className="text-[#999]">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم{" "}
                      </p>
                    </div>
                    <Image
                      src={bestLocation}
                      alt="alt"
                      width="100"
                      height="100"
                      className="size-20"
                    />
                  </div>
                  <div className="flex gap-9 p-7  max-lg:flex-col">
                    <Image
                      src={bestDiscount}
                      alt="alt"
                      width="100"
                      height="100"
                      className="size-20"
                    />
                    <div>
                      <h3 className="mb-4 text-xl text-[#191825]">
                        ارائه بهترین تخفیف ها
                      </h3>
                      <p className="text-[#999]">
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
    </div>
  );
}
