"use client";

import Image from "next/image";
import circle from "@/public/img/tour-circle.svg";
import nature from "@/public/img/nature.jpg";
import { useUser } from "@/hooks/use-user";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { Button } from "@/components/ui/button";

function SpecialTours() {
  const userHook = useUser();

  const [currentTour, setCurrentTour] = useState(
    userHook.specialTours.length > 0
      ? userHook.specialTours[0]
      : {
          tour: {},
          advertisement: "",
          photo: nature,
        },
  );

  return (
    <div className="lg:mb-20 ">
      <div className="relative">
        <Image
          src={circle}
          width={100}
          height={100}
          alt=""
          className="absolute right-0 w-80 max-lg:hidden"
        />
        <div className="mx-auto w-4/5 pt-20">
          <div className="flex justify-between gap-9 max-lg:flex-col">
            <div className="w-96 max-lg:w-full">
              {" "}
              {/* <div className="flex items-center justify-center gap-4 max-lg:grid  max-lg:grid-cols-4 max-md:grid-cols-2 lg:flex-col ">
                <div className="z-10 flex  size-32 items-center justify-center rounded-2xl bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-yellow text-xl font-bold">+ 35</p>
                    <p className="">تور مسافرتی</p>
                  </div>
                </div>
                <div className="z-10 flex  size-32 items-center justify-center rounded-2xl bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-yellow text-xl font-bold">+ 56</p>
                    <p className="">هتل 5 ستاره</p>
                  </div>
                </div>
                <div className="z-10 flex  size-32 items-center justify-center rounded-2xl bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-yellow text-xl font-bold">+ 100</p>
                    <p className="">شرکت هواپیمایی</p>
                  </div>
                </div>
                <div className="z-10 flex  size-32 items-center justify-center rounded-2xl bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-yellow text-xl font-bold">+ 150</p>
                    <p className="">مقصد گردشگری</p>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="relative w-full">
              <h2 className="text-center text-3xl font-bold max-lg:text-lg max-md:text-sm">
                تورهای ویژه
              </h2>
              <p className="py-9 text-center text-xl max-lg:text-lg max-md:text-xs">
                ما به شما کمک میکنیم تا لوکیشن دلخواه خود را انتخاب کنید
              </p>
              <div className="relative">
                <Image
                  src={currentTour?.photo}
                  alt="alt"
                  width={480}
                  height={360}
                  className="h-[500px] w-[888px] rounded-2xl max-lg:h-80 max-md:h-72"
                />
                <div className="absolute right-9 top-9">
                  <h2 className="pb-7 text-2xl font-bold text-white max-lg:text-lg max-md:text-xs">
                    {currentTour?.tour?.title}
                  </h2>
                  <p className="text-lg font-semibold text-white">
                    از {currentTour?.tour?.origin} به{" "}
                    {currentTour?.tour?.destination}
                  </p>
                  <p className="mt-2 rounded-lg bg-white bg-opacity-30 p-2 text-white">
                    {currentTour?.advertisement}
                  </p>
                  <Link href={routes.tours.details(currentTour.tour.id)}>
                    <Button className="mt-5">مشاهده جزئیات</Button>
                  </Link>
                </div>
              </div>

              <div className="absolute bottom-5 flex w-full justify-center px-14">
                <Carousel
                  dir="ltr"
                  opts={{
                    align: "start",
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {userHook.specialTours.map((tour, index) => (
                      <CarouselItem
                        key={index}
                        className="cursor-pointer md:basis-1/3 lg:basis-1/5"
                        onClick={() => setCurrentTour(tour)}
                      >
                        <div
                          key={index}
                          className={cn(
                            "rounded-2xl",

                            currentTour.id === tour.id &&
                              "border-8 border-white",
                          )}
                        >
                          <Image
                            src={tour.photo}
                            width={200}
                            height={250}
                            alt="tour"
                            className="h-40 w-full rounded-2xl object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          {/* <div className="flex flex-wrap gap-5 p-2 md:p-4">
            {userHook.specialTours.map((tour, index) => (
              <div key={index}>
                <Image
                  src={tour.photo}
                  width={200}
                  height={250}
                  alt="tour"
                  className="h-40 w-28 rounded-2xl"
                />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SpecialTours;
