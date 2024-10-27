"use client";

import Image from "next/image";
import circle from "@/public/img/tour-circle.svg";
import { useUser } from "@/hooks/use-user";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate } from "@/lib/jalali-date";
import { specialTour } from "@/constants/images";

function SpecialTours() {
  const userHook = useUser();

  const [currentTour, setCurrentTour] = useState(
    userHook.specialTours.length > 0
      ? userHook.specialTours[0]
      : {
          tour: {},
          advertisement: "",
          photo: specialTour,
          dates: [],
        },
  );

  useEffect(() => {
    if (userHook.specialTours.length > 0) {
      setCurrentTour(userHook.specialTours[0]);
    }
  }, [userHook.specialTours]);

  return (
    <div className="lg:mb-20">
      <div className="relative">
        <Image
          src={circle}
          width={100}
          height={100}
          alt=""
          className="absolute right-0 w-80 max-lg:hidden"
        />
        <div className="mx-auto w-full pt-20">
          <div className="flex justify-between gap-9 max-lg:flex-col">
            <div className="relative flex w-full flex-col items-center justify-center gap-2">
              <h2 className="text-center text-3xl font-bold max-lg:text-lg max-md:text-sm">
                تور های ویژه
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
                  className="h-[450px] w-[750px] rounded-2xl max-lg:h-80 max-md:h-72"
                />

                {userHook.specialTours.length > 0 && (
                  <div className="absolute right-0 top-0 h-full w-full rounded-2xl bg-black bg-opacity-30 px-6 py-4 md:px-10">
                    <h2 className="pb-4 text-2xl font-bold text-white max-lg:text-lg max-md:text-xs">
                      {currentTour?.tour?.title}
                    </h2>
                    {/* <p className="text-lg font-semibold text-white">
                      از {currentTour?.tour?.origin} به{" "}
                      {currentTour?.tour?.destination}
                    </p> */}
                    <p className="text-xs font-semibold text-white">
                      {currentTour?.advertisement}
                    </p>
                    <div className="mt-3 flex flex-col gap-1">
                      {currentTour.dates.map((item, index) => (
                        <Link
                          key={index}
                          href={`${window.location.href.split("?")[0]}/tours/${currentTour.id}?cid=${21}&start=${item.start}&end=${item.end}`}
                        >
                          <Button className="h-8 text-xs">
                            {" "}
                            از تاریخ {farsiNumber(jaliliDate(item.start))} تا
                            {"  "}
                            {farsiNumber(jaliliDate(item.end))}{" "}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {userHook.specialTours.length > 0 && (
                <div className=" bottom-5 flex w-full justify-center px-14 md:w-[900px]">
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
                              "rounded-lg border-4 border-transparent",
                              currentTour.id === tour.id &&
                                "border-4 border-white",
                            )}
                          >
                            <Image
                              src={tour.photo}
                              width={200}
                              height={250}
                              alt="tour"
                              className="h-40 w-full rounded-lg object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              )}
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
