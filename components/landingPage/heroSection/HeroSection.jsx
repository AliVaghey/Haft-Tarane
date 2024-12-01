"use client";

import Image from "next/image";
import React from "react";
import FullSearch from "../full-search/full-search";
import { chita } from "@/constants/images";
import { useUser } from "@/hooks/use-user";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

function HeroSection() {
  const userHook = useUser();

  const pathname = usePathname();

  return (
    <div className="mb-10 pt-[72px] lg:mb-0">
      {(pathname === "/fa" ||
        pathname === "/en" ||
        pathname === "/fa-ir" ||
        pathname === "/en-us") && (
        <div className="flex flex-col gap-1 p-1.5 text-xs">
          {userHook.banners.map((banner, bannerIndex) =>
            banner.link ? (
              <div
                key={bannerIndex}
                className="flex w-full cursor-pointer items-center justify-between rounded-sm pl-2 shadow-md"
                style={{
                  backgroundColor: banner.background_color,
                  color: banner.text_color,
                }}
              >
                <Link href={banner.link} className="flex-1 px-2 py-1">
                  {banner.description}
                </Link>
                <X
                  onClick={() =>
                    userHook.setBanners(
                      userHook.banners.filter(
                        (filterItem, filterIndex) =>
                          filterIndex !== bannerIndex,
                      ),
                    )
                  }
                  className="cursor-pointer text-black"
                  size={16}
                  strokeWidth={1}
                />
              </div>
            ) : (
              <div
                key={bannerIndex}
                className="flex w-full items-center justify-between rounded-sm px-2 py-1 shadow-md"
                style={{
                  backgroundColor: banner.background_color,
                  color: banner.text_color,
                }}
              >
                <span>{banner.description}</span>
                <X
                  onClick={() =>
                    userHook.setBanners(
                      userHook.banners.filter(
                        (filterItem, filterIndex) =>
                          filterIndex !== bannerIndex,
                      ),
                    )
                  }
                  className="cursor-pointer text-black"
                  size={16}
                  strokeWidth={1}
                />
              </div>
            ),
          )}
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        <div className={cn("my-4 grid grid-cols-1 ")}>
          <div className="flex w-full items-center justify-center">
            <Image
              src={chita}
              alt="alt"
              width={720}
              height={480}
              className={cn("aspect-video w-2/3")}
              // className="aspect-video w-4/5 md:w-3/5 lg:w-[28%]"
            />
          </div>
        </div>
        <div className="">
          <h2
            className={` animate-pulse text-4xl font-bold max-lg:text-xl max-md:text-xl ${
            userHook?.sliderCards &&
            userHook?.sliderCards.length > 0 ?
            "mb-16" : "mb-2"}`}
          >
            سفر ضرورتی برای زندگی
          </h2>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        {userHook?.sliderCards && userHook?.sliderCards.length > 0 && (
          <div className="mt-8 flex w-full items-center justify-center lg:mt-0 lg:w-1/2">
            <Carousel
              opts={{ loop: true }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="mx-auto aspect-video w-[90%] lg:w-3/4"
              dir="ltr"
            >
              <CarouselContent className="w-full">
                {userHook.sliderCards.map((item, index) => (
                  <CarouselItem key={index}>
                    <Link
                      href={item?.link || "#"}
                      className="relative aspect-video w-full"
                    >
                      <Image
                        src={item?.photo}
                        width={720}
                        height={480}
                        alt="hotel"
                        className="mx-auto aspect-video rounded-lg object-cover"
                      />
                      <div
                        style={{ color: item?.description_color || "yellow" }}
                        // className="absolute bottom-5 left-10 right-5 block w-[80%] rounded-lg py-2 text-center text-lg font-semibold md:left-14"
                        className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 text-center text-lg font-semibold"
                      >
                        <span>{item?.description}</span>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="translate-x-14 border-0 bg-white bg-opacity-50" />
              <CarouselNext className="-translate-x-[70px] border-0 bg-white bg-opacity-50" />
            </Carousel>
          </div>
        )}
      </div>
      {/*<FullSearch />*/}
    </div>
  );
}

export default HeroSection;
