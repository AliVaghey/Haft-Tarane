"use client";

import { chita } from "@/constants/images";
import { Bus, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { Button } from "../ui/button";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { jaliliDate } from "@/lib/jalali-date";
import { farsiNumber } from "@/lib/farsi-number";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const SpecialTourCard = ({ data }) => {
  console.log("data,,,,,,,,,,,,,,,,,", data);

  const router = useRouter();

  const searchParams = useSearchParams();

  const handleLink = (values) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      // ...current,
      ["cid"]: values.cost.id,
      ["start"]: values.date.start,
      ["end"]: values.date.end,
    };

    let baseUrl = window.location.href.split("?")[0];
    baseUrl = baseUrl.slice(0, baseUrl.lastIndexOf("/"));
    baseUrl = baseUrl.slice(0, baseUrl.lastIndexOf("/"));

    console.log("baseUrl", baseUrl);

    const url = qs.stringifyUrl(
      {
        url: `${baseUrl}/tours/${values.tour_id}`,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="rounded-lg bg-yellow-light shadow-lg">
      <div className="flex h-full gap-5 p-1 px-2">
        <div className="my-auto ">
          <Image
            src={
              data.hotel.photo &&
              data.hotel.photo.length > 0 &&
              data.hotel.photo[0]
            }
            width={360}
            height={360}
            className=" my-auto max-h-48 w-60 rounded-lg rounded-r-lg object-cover"
            alt="hotel"
          />
        </div>

        <div className="flex flex-col gap-2 p-4 text-sm text-muted-foreground">
          <h1 className="text-base font-bold">مجری تور : {data.agency_name}</h1>
          <h1 className="flex items-center gap-1 text-base font-bold">
            <span className="font-normal">عنوان تور :</span>
            <span>{data.tour_name}</span>
          </h1>

          <div className="flex gap-2">
            <MapPin size={18} strokeWidth={1.5} />
            <span>نام هتل : {data.cost.hotel.name}</span>
          </div>

          <div className="flex gap-2">
            <MapPin size={18} strokeWidth={1.5} />
            <span>آدرس هتل : {data.cost.hotel.address}</span>
          </div>

          <div className="flex gap-2">
            <Calendar size={18} strokeWidth={1.5} />

            <span>
              از تاریخ {farsiNumber(jaliliDate(data.date.start))} تا{" "}
              {farsiNumber(jaliliDate(data.date.end))}
            </span>
          </div>

          <div className="flex gap-2">
            <Bus size={18} strokeWidth={1.5} />

            <span>
              از {data.origin} به {data.destination}
            </span>
          </div>
        </div>

        <div className="mr-auto flex min-h-full flex-col items-center justify-center gap-2 border-r border-yellow-dark px-5">
          <span>شروع قیمت از :</span>
          <span>{persianPriceFormat(data.min_cost)}</span>

          <Button
            onClick={() => handleLink(data)}
            className="h-8 px-5 hover:bg-yellow-primary"
          >
            رزرو تور
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecialTourCard;
