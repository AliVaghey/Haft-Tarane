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

function CheapTour() {
  return (
    <div className="h-screen">
      <div className="w-4/5 mx-auto">
        <h2 className="text-2xl pt-12 pb-20 max-lg:pb-9 max-md:pb-7 font-bold max-lg:text-lg max-md:text-sm">
          ارزان ترین تورها
        </h2>
        <p className="w-1/2 leading-7 max-lg:w-full text-justify">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          قرار گیرد.
        </p>
        <Carousel
          className="mt-20"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            <CarouselItem className="sm:basis-1/2 md:basis-1/4 lg:basis-1/6 flex flex-col items-center justify-center gap-9">
              {" "}
              <Image
                src={a}
                width={480}
                height={360}
                alt="alt"
                className="w-40 h-56 rounded-[99px] object-cover object-center basis-1/3"
              />{" "}
              <p className="text-center ">کیش</p>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 md:basis-1/4 lg:basis-1/6 flex flex-col items-center justify-center gap-9">
              {" "}
              <Image
                src={b}
                width={480}
                height={360}
                alt="alt"
                className="w-40 h-56 rounded-[99px] object-cover object-center basis-1/3"
              />{" "}
              <p className="text-center ">شیراز</p>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 md:basis-1/4 lg:basis-1/6 flex flex-col items-center justify-center gap-9">
              {" "}
              <Image
                src={c}
                width={480}
                height={360}
                alt="alt"
                className="w-40 h-56 rounded-[99px] object-cover object-center basis-1/3"
              />{" "}
              <p className="text-center ">مشهد</p>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 md:basis-1/4 lg:basis-1/6 flex flex-col items-center justify-center gap-9">
              {" "}
              <Image
                src={a}
                width={480}
                height={360}
                alt="alt"
                className="w-40 h-56 rounded-[99px] object-cover object-center basis-1/3"
              />{" "}
              <p className="text-center ">کیش</p>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 md:basis-1/4 lg:basis-1/6 flex flex-col items-center justify-center gap-9">
              {" "}
              <Image
                src={b}
                width={480}
                height={360}
                alt="alt"
                className="w-40 h-56 rounded-[99px] object-cover object-center basis-1/3"
              />{" "}
              <p className="text-center ">شیراز</p>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 md:basis-1/4 lg:basis-1/6 flex flex-col items-center justify-center gap-9">
              {" "}
              <Image
                src={c}
                width={480}
                height={360}
                alt="alt"
                className="w-40 h-56 rounded-[99px] object-cover object-center basis-1/3"
              />{" "}
              <p className="text-center ">مشهد</p>
            </CarouselItem>
          </CarouselContent>
        </Carousel>{" "}
      </div>
      <div className="flex justify-center items-center gap-4 mt-9">
        <div className="border border-[#2B303D] rounded-full p-2 bg-[#2B303D] cursor-pointer">
          <ChevronRight className="size-7" stroke="#fff" />
        </div>
        <div className="border border-[#2B303D] rounded-full p-2 cursor-pointer group">
          <ChevronLeft className="size-7" stroke="#2B303D" />
        </div>
      </div>
    </div>
  );
}

export default CheapTour;
