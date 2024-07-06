"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { defaultAirport } from "@/constants/images";
import {
  Bed,
  Bus,
  Calendar,
  Dot,
  MapPin,
  Moon,
  Plane,
  Star,
  Train,
  User,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { farsiNumber } from "@/lib/farsi-number";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { jaliliDate } from "@/lib/jalali-date";
import { Separator } from "../ui/separator";
import AddPassengers from "./add-passengers";

const SecondDetails = ({ data }) => {
  console.log("dataooooooooooooppppppppppp", data);
  const router = useRouter();

  const searchParams = useSearchParams();

  const handleLink = (values) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ["cid"]: values.cost.id,
      ["start"]: values.date.start,
      ["end"]: values.date.end,
    };

    const url = qs.stringifyUrl(
      {
        url: `${window.location.href.split("?")[0]}/booking`,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="w-full rounded-lg bg-yellow-dark px-3 py-5">
      <div className="mt-3 flex w-full flex-col gap-4">
        <div className="flex flex-col items-center justify-between rounded-lg border-2 border-yellow-primary p-4 md:flex-row">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold">
              {data.cost.tour.title}
            </span>
            <span>{data.cost.hotel.name}</span>
            <div className="flex gap-1 text-yellow-500">
              {new Array(+data.hotel.star || 5).fill("").map((h, i) => (
                <Star key={i} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm">
              کد تور : {farsiNumber(data.cost.tour.id)}
            </span>
            <div className="rounded-lg bg-yellow-400 px-5 py-1.5">
              ظرفیت : {farsiNumber(data.capacity)} نفر
            </div>
          </div>
        </div>

        {data.cost.tour.transportation_type === "system" ? (
          <div className="flex flex-col gap-4 rounded-lg border-2 border-yellow-primary p-4">
            <div className="font-semibold">اطلاعات رفت و برگشت :</div>
            <Separator className="h-0.5 bg-yellow-primary" />
            <div className="grid grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <Plane size={16} />{" "}
                <span>
                  {data.transportation[0].flight.airline}{" "}
                  {data.transportation[0].flight.from}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />{" "}
                <span>
                  {farsiNumber(jaliliDate(data.date.start))}{" "}
                  {farsiNumber(data.transportation[0].flight.time_flight)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Plane size={16} />{" "}
                <span>
                  {data.transportation[1].flight.airline}{" "}
                  {data.transportation[1].flight.from}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />{" "}
                <span>
                  {farsiNumber(jaliliDate(data.date.end))}{" "}
                  {farsiNumber(data.transportation[1].flight.time_flight)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 rounded-lg border-2 border-yellow-primary p-4">
            <div className="font-semibold">اطلاعات رفت و برگشت :</div>
            <Separator className="h-0.5 bg-yellow-primary" />
            <div className="grid grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <Plane size={16} />{" "}
                <span>
                  {data.transportation[0].company_name}{" "}
                  {data.transportation[0].origin}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />{" "}
                <span>
                  {farsiNumber(jaliliDate(data.date.start))}{" "}
                  {farsiNumber(data.transportation[0].start)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Plane size={16} />{" "}
                <span>
                  {data.transportation[1].company_name}{" "}
                  {data.transportation[1].origin}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />{" "}
                <span>
                  {farsiNumber(jaliliDate(data.date.end))}{" "}
                  {farsiNumber(data.transportation[1].start)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 rounded-lg border-2 border-yellow-primary p-4">
          <div className="font-semibold">توضیحات تور :</div>
          <Separator className="h-0.5 bg-yellow-primary" />
          <div className="flex flex-col gap-2">
            {data.certificate.tab_descriptions !== null &&
              data.certificate.tab_descriptions.map((d, i) => (
                <div key={i} className="flex">
                  <Dot />
                  <span>{d}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border-2 border-yellow-primary p-4">
          <div className="font-semibold">خدمات تور :</div>
          <Separator className="h-0.5 bg-yellow-primary" />
          <div className="flex flex-col gap-2">
            {data.certificate.free_services !== null &&
              data.certificate.free_services.map((d, i) => (
                <div key={i} className="flex">
                  <Dot />
                  <span>{d}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border-2 border-yellow-primary p-4">
          <div className="font-semibold">مدارک مورد نیاز :</div>
          <Separator className="h-0.5 bg-yellow-primary" />
          <div className="flex flex-col gap-2">
            {data.certificate.certificates !== null &&
              data.certificate.certificates.map((d, i) => (
                <div key={i} className="flex">
                  <Dot />
                  <span>{d}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border-2 border-yellow-primary p-4">
          <div className="font-semibold">شرایط کنسلی :</div>
          <Separator className="h-0.5 bg-yellow-primary" />
          <div className="flex flex-col gap-2">
            <span className="inline-block w-fit rounded-lg bg-yellow-primary p-2">
              {data.certificate.cancel_rules}
            </span>
          </div>
        </div>

        <div className="flex flex-col rounded-lg border-2 border-yellow-primary p-4">
          <div className="font-semibold">اطلاعات حمل و نقل :</div>
          <Separator className="mt-4 h-0.5 bg-yellow-primary" />
          <div className="mt-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 pr-3">
              <MapPin size={20} className="text-yellow-600" />
              <span>شروع تور : {data.cost.tour.origin}</span>
            </div>
            <div className="mr-10 h-8 border-r border-dashed border-black" />
            {(data.cost.tour.transportation_type === "my_transportation" ||
              data.cost.tour.transportation_type === "hotel") &&
              data.transportation.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex w-fit flex-col rounded-lg border-2 border-dashed border-yellow-primary p-2 pl-20">
                    <div className="flex items-center gap-2">
                      {item.type === "هواپیما" && (
                        <Plane size={20} className="text-yellow-600" />
                      )}
                      {item.type === "قطار" && (
                        <Train size={20} className="text-yellow-600" />
                      )}
                      {item.type === "اتوبوس" && (
                        <Bus size={20} className="text-yellow-600" />
                      )}
                      <span>
                        {item.type === "هواپیما" && "فرودگاه"}
                        {item.type === "قطار" && "راه آهن"}
                        {item.type === "اتوبوس" && "ترمینال"} {item.origin}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Plane size={20} className="text-yellow-600" />
                      <span>{item.company_name}</span>
                      <span>رفت: {farsiNumber(item.start)}</span>
                    </div>
                  </div>
                  <div className="mr-10 h-8 border-r border-dashed border-black" />
                  {data.transportation.length > index + 1 && (
                    <>
                      <div className="flex items-center gap-2 pr-3">
                        <Bed size={20} className="text-yellow-600" />
                        <span>
                          {farsiNumber(data.cost.tour.staying_nights)} شب اقامت
                          در {data.cost.tour.destination}
                        </span>
                      </div>
                      <div className="mr-10 h-8 border-r border-dashed border-black" />
                    </>
                  )}
                </div>
              ))}

            {data.cost.tour.transportation_type === "system" &&
              data.transportation.map((i, index) => {
                const item = i.flight;
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex w-fit flex-col rounded-lg border-2 border-dashed border-yellow-primary p-2 pl-20">
                      <div className="flex items-center gap-2">
                        {/* {item.type === "هواپیما" && (
                          <Plane size={20} className="text-yellow-600" />
                        )}
                        {item.type === "قطار" && (
                          <Train size={20} className="text-yellow-600" />
                        )}
                        {item.type === "اتوبوس" && (
                          <Bus size={20} className="text-yellow-600" />
                        )} */}
                        <Plane size={20} className="text-yellow-600" />
                        {/* <span>
                          {item.type === "هواپیما" && "فرودگاه"}
                          {item.type === "قطار" && "راه آهن"}
                          {item.type === "اتوبوس" && "ترمینال"} {item.origin}
                        </span> */}
                        <span>فرودگاه {item.from}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Plane size={20} className="text-yellow-600" />
                        <span>{item.airline}</span>
                        <span>رفت: {farsiNumber(item.time_flight)}</span>
                      </div>
                    </div>
                    <div className="mr-10 h-8 border-r border-dashed border-black" />
                    {data.transportation.length > index + 1 && (
                      <>
                        <div className="flex items-center gap-2 pr-3">
                          <Bed size={20} className="text-yellow-600" />
                          <span>
                            {farsiNumber(data.cost.tour.staying_nights)} شب
                            اقامت در {data.cost.tour.destination}
                          </span>
                        </div>
                        <div className="mr-10 h-8 border-r border-dashed border-black" />
                      </>
                    )}
                  </div>
                );
              })}
            <div className="flex items-center gap-2 pr-3">
              <MapPin size={20} className="text-yellow-600" />
              <span>پایان تور : {data.cost.tour.destination}</span>
            </div>
          </div>
        </div>

        <AddPassengers defaultData={data} />
      </div>
    </div>
  );
};

export default SecondDetails;
