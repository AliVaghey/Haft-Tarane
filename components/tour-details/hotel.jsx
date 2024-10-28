import { Plane } from "lucide-react";
import { Separator } from "../ui/separator";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDateHour } from "@/lib/jalali-date";
import { persianPriceFormat } from "@/lib/persian-price-format";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const DetailsHotels = ({ data }) => {

  return (
    <div className="mb-5 flex min-h-96 flex-col gap-5 rounded-lg bg-white p-5 lg:gap-10">
      {data &&
        data.map((item, index) => {
          let imageobject = item.hotel.photo;
          let imagesArray = [];

          for (var propName in imageobject) {
            imagesArray.push({
              id: propName,
              url: imageobject[propName],
            });
          }


          return (
            <>
              <div>
                <Carousel className="mx-auto w-5/6" dir="ltr">
                  <CarouselContent>
                    {imagesArray.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className=" h-96" key={index}>
                          <Image
                            src={img.url}
                            width={720}
                            height={480}
                            alt="hotel"
                            className="mx-auto h-full rounded-lg object-contain"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <div
                className="grid w-full grid-cols-2 gap-5 md:grid-cols-3"
                key={index}
              >
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-red-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">نام هتل</span>
                    <span>{item.hotel.name}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-red-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">آدرس</span>
                    <span>{item.hotel.address}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-red-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">تعداد ستاره</span>
                    <span>{"۵"}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-red-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">نوع اتاق</span>
                    <span>{item.room_type}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-yellow-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">قیمت اتاق یک تخته</span>
                    <span>{persianPriceFormat(item.one_bed)}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-yellow-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">قیمت اتاق دو تخته</span>
                    <span>{persianPriceFormat(item.two_bed)}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-yellow-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">قیمت تخت اضافه</span>
                    <span>{persianPriceFormat(item.plus_one)}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-yellow-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">
                      قیمت برای کودک ۶ تا ۱۲ سال
                    </span>
                    <span>{persianPriceFormat(item.cld_6)}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-yellow-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">قیمت برای کودک ۲ تا ۶ سال</span>
                    <span>{persianPriceFormat(item.cld_2)}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-yellow-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">قیمت برای نوزاد</span>
                    <span>{persianPriceFormat(item.baby)}</span>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          );
        })}
    </div>
  );
};

export default DetailsHotels;
