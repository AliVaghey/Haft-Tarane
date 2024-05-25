import React from "react";
import Image from "next/image";
import branches from "@/public/img/branches.svg";
import location from "@/public/img/location.svg";
import collaberation from "@/public/img/collaberation.svg";
import about from "@/public/img/about.svg";

export default function About() {
  return (
    <div>
      <div className="my-14 px-20">
        <div className="mx-auto flex w-4/5 flex-wrap items-center justify-center gap-12  rounded-2xl bg-gray-dark py-9">
          <div className="flex items-center gap-3">
            <Image
              src={branches}
              alt="alt"
              width={100}
              height={100}
              className="h-9 w-9"
            />
            <p className="text-xl text-white">شعب ما</p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={location}
              alt="alt"
              width={100}
              height={100}
              className="h-9 w-9"
            />
            <p className="text-xl text-white">مقاصد محبوب</p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={collaberation}
              alt="alt"
              width={100}
              height={100}
              className="h-9 w-9"
            />
            <p className="text-xl text-white">همکاری با ما</p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={about}
              alt="alt"
              width={100}
              height={100}
              className="h-9 w-9"
            />
            <p className="text-xl text-white">درباره بی باک سفر</p>
          </div>
        </div>
      </div>
    </div>
  );
}
