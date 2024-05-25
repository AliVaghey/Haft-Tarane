import React from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import tourCircle from "@/public/img/tour-circle.svg";
import candy from "@/public/img/candy.jpg";

// carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function SpecialTours() {
  return (
    <div className="">
      <div className="pb-20">
        <h2 className="py-9 text-center text-4xl font-semibold">تورهای ویژه</h2>
        <p className="text-center text-2xl">
          ما به شما کمک میکنیم تا لوکیشن دلخواه خود را انتخاب کنید
        </p>

        <div className="relative flex  items-center justify-center gap-4 pt-16">
          <Image
            src={tourCircle}
            width={1080}
            height={720}
            className="absolute right-0  w-[444px]"
            alt="alt"
          />
          <div className="flex items-center justify-center max-lg:flex-col max-lg:gap-9">
            <div className="w-[444px]">
              <div className="flex flex-col items-center justify-center gap-4 ">
                <div className="z-10 flex size-32 items-center justify-center rounded-2xl bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-xl font-bold text-yellow-primary">
                      + 35
                    </p>
                    <p className="">تور مسافرتی</p>
                  </div>
                </div>
                <div className="z-10 flex size-32 items-center justify-center rounded-2xl bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-xl font-bold text-yellow-primary">
                      + 56
                    </p>
                    <p className="">هتل 5 ستاره</p>
                  </div>
                </div>
                <div className="z-10 flex size-32 items-center justify-center rounded-2xl bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-xl font-bold text-yellow-primary">
                      + 100
                    </p>
                    <p className="">شرکت هواپیمایی</p>
                  </div>
                </div>
                <div className="z-10 flex size-32 items-center justify-center rounded-2xl bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-xl font-bold text-yellow-primary">
                      + 150
                    </p>
                    <p className="">مقصد گردشگری</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full">
              <Image
                src={candy}
                alt="alt"
                width={1080}
                height={720}
                className="h-[555px] w-[999px] rounded-3xl max-lg:h-[333px] max-lg:w-[666px] max-md:w-96"
              />
              <div className="absolute right-7 top-14 mx-auto flex w-1/2 flex-col gap-6 max-lg:hidden">
                <h2 className=" text-3xl font-bold">ترکیه</h2>
                <p className="line-clamp-2 text-lg leading-8">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Fugit dolore doloremque distinctio, eligendi placeat, tempora
                  non beatae odio unde ex minima illum.
                </p>
              </div>
              <div className="absolute bottom-0 flex items-center justify-between ">
                <div className="mx-auto flex w-4/5 items-center justify-between gap-20 py-6">
                  {/* <Carousel>
                    <CarouselContent>
                      <CarouselItem className="flex  items-center justify-center sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                        <Image
                          src={candy}
                          alt="alt"
                          width={1080}
                          height={720}

                          className=" h-40 w-32 cursor-pointer rounded-3xl border-8 border-white max-md:size-28"
                        />
                      </CarouselItem>
                    </CarouselContent>
                  </Carousel> */}
                  <Image
                    src={candy}
                    alt="alt"
                    width={1080}
                    height={720}
                    className=" h-40 w-32 cursor-pointer rounded-3xl border-8 border-white max-md:size-28"
                  />
                  {/* <Image
                    src="/img/candy.jpg"
                    alt="alt"
                    width={1080}
                    height={720}
                    className=" w-32 h-40 rounded-3xl cursor-pointer"
                  />
                  <Image
                    src="/img/candy.jpg"
                    alt="alt"
                    width={1080}
                    height={720}
                    className=" w-32 h-40 rounded-3xl cursor-pointer"
                  />
                  <Image
                    src="/img/candy.jpg"
                    alt="alt"
                    width={1080}
                    height={720}
                    className=" w-32 h-40 rounded-3xl cursor-pointer"
                  /> */}
                  <div className="cursor-pointer rounded-full border-4 border-white p-1">
                    <ChevronLeft className="size-9" stroke="#fff" />
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
