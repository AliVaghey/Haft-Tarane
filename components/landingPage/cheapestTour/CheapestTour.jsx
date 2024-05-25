import React from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import cityPic from "@/public/img/kish.svg";

// carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CheapestTour() {
  const places = [
    { src: cityPic, text: "کیش" },
    { src: cityPic, text: "قشم" },
    { src: cityPic, text: "چابهار" },
    { src: cityPic, text: "مشهد" },
    { src: cityPic, text: "شیراز" },
    { src: cityPic, text: "شیراز" },
    { src: cityPic, text: "شیراز" },
  ];

  return (
    <div className="mx-auto w-4/5 py-14">
      <h2 className="py-7 text-3xl font-bold">ارزان ترین تورها</h2>
      <div className="w-1/2 max-lg:w-full ">
        <p className="text-justify leading-9">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          قرار گیرد.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-14 py-14">
        <div>
          <Carousel>
            <CarouselContent>
              {places.map((place, index) => (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/3  md:basis-1/4 lg:basis-1/6 flex items-center justify-center"
                  // className="flex flex-col items-center justify-center gap-4"
                >
                  <Image
                    src={place.src}
                    alt="alt"
                    width={1080}
                    height={720}
                    className="h-56 w-40 rounded-[99px] object-cover object-center"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* // <p className="text-xl">{place.text}</p> */}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="cursor-pointer rounded-full border border-gray-dark bg-gray-dark p-2">
          <ChevronRight className="size-7" stroke="#fff" />
        </div>
        <div className="group cursor-pointer rounded-full border border-gray-dark p-2">
          <ChevronLeft className="size-7" stroke="#2B303D" />
        </div>
      </div>
    </div>
  );
}
