"use client";

import Image from "next/image";
import React from "react";
import FullSearch from "../full-search/full-search";
import { chita } from "@/constants/images";
import { useUser } from "@/hooks/use-user";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        <Image
          src={chita}
          alt="alt"
          width={720}
          height={480}
          className="aspect-video w-4/5 md:w-3/5 lg:w-[28%]"
        />
        <div className="">
          <h2 className="animate-pulse text-4xl font-bold max-lg:text-xl max-md:text-sm">
            سفر ضرورتی برای زندگی
          </h2>
        </div>
      </div>

      <FullSearch />
    </div>
  );
}

export default HeroSection;
