import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import a from "@/public/img/kish.svg";
import b from "@/public/img/shiraz.svg";
import c from "@/public/img/mashhad.svg";
import d from "@/public/img/Swiss.jpg";
import e from "@/public/img/japan.jpg";
import f from "@/public/img/Dubai.jpg";

function CheapTour() {
  return (
    <div className="lg:h-screen">
      <div className="mx-auto w-4/5">
        <h2 className="pb-20 pt-12 text-2xl font-bold max-lg:pb-9 max-lg:text-lg max-md:pb-7 max-md:text-sm">
          ارزان ترین تورها
        </h2>
        <p className="w-1/2 text-justify leading-7 max-lg:w-full">
          از لحظه‌ی رزرو تا رسیدن به مقصد، ما همراه شما خواهیم بود و اطمینان
          می‌دهیم که هر جزئیات سفر شما به بهترین شکل ممکن انجام شود
        </p>
        <Carousel
          className="mt-20"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            <CarouselItem className="flex flex-col items-center justify-center gap-9 sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
              {" "}
              <Image
                src={a}
                width={480}
                height={360}
                alt="alt"
                className="h-44 w-44 basis-1/3 rounded-[99px] object-cover object-center"
              />{" "}
              <p className="text-center ">کیش</p>
            </CarouselItem>
            <CarouselItem className="flex flex-col items-center justify-center gap-9 sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
              {" "}
              <Image
                src={b}
                width={480}
                height={360}
                alt="alt"
                className="h-44 w-44 basis-1/3 rounded-[99px] object-cover object-center"
              />{" "}
              <p className="text-center ">شیراز</p>
            </CarouselItem>
            <CarouselItem className="flex flex-col items-center justify-center gap-9 sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
              {" "}
              <Image
                src={c}
                width={480}
                height={360}
                alt="alt"
                className="h-44 w-44 basis-1/3 rounded-[99px] object-cover object-center"
              />{" "}
              <p className="text-center ">مشهد</p>
            </CarouselItem>
            <CarouselItem className="flex flex-col items-center justify-center gap-9 sm:basis-1/2 md:basis-1/4 lg:basis-1/6 ">
              {" "}
              <Image
                src={d}
                width={480}
                height={360}
                alt="alt"
                className="h-44 w-44  rounded-[99px] object-cover object-center"
              />{" "}
              <p className="text-center ">سوییس</p>
            </CarouselItem>
            <CarouselItem className="flex flex-col items-center justify-center gap-9 sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
              {" "}
              <Image
                src={e}
                width={480}
                height={360}
                alt="alt"
                className="h-44 w-44 rounded-full object-cover object-center"
              />{" "}
              <p className="text-center ">ژاپن</p>
            </CarouselItem>
            <CarouselItem className="flex flex-col items-center justify-center gap-9 sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
              {" "}
              <Image
                src={f}
                width={480}
                height={360}
                alt="alt"
                className=" h-44 w-44  rounded-[99px] object-cover object-center"
              />{" "}
              <p className="text-center ">دبی</p>
            </CarouselItem>
          </CarouselContent>
        </Carousel>{" "}
      </div>
      <div className="mt-9 flex items-center justify-center gap-4">
        <div className="cursor-pointer rounded-full border border-[#2B303D] bg-[#2B303D] p-2">
          <ChevronRight className="size-7" stroke="#fff" />
        </div>
        <div className="group cursor-pointer rounded-full border border-[#2B303D] p-2">
          <ChevronLeft className="size-7" stroke="#2B303D" />
        </div>
      </div>
    </div>
  );
}

export default CheapTour;
