"use client";

import { chita } from "@/constants/images";
import { Bus, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { Button } from "../ui/button";
import { jaliliDate } from "@/lib/jalali-date";
import { farsiNumber } from "@/lib/farsi-number";
import { useRouter } from "next/navigation";
import qs from "query-string";

const TourCard = ({ data }) => {
  const router = useRouter();

  const handleLink = (values) => {
    const query = {
      // ...current,
      ["cid"]: values.costs[0].id,
      ["start"]: values.dates[0].start,
      ["end"]: values.dates[0].end,
    };

    const url = qs.stringifyUrl(
      {
        url: `${window.location.href.split("?")[0]}/${values.id}`,
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
            src={data.costs.length > 0 ? data.costs[0].hotel.photo : chita}
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
            <span>{data.title}</span>
          </h1>

          <div className="flex gap-2">
            <MapPin size={18} strokeWidth={1.5} />
            <span>
              نام هتل : {data.costs.length > 0 && data.costs[0].hotel.name}
            </span>
          </div>

          <div className="flex gap-2">
            <MapPin size={18} strokeWidth={1.5} />
            <span>
              آدرس هتل : {data.costs.length > 0 && data.costs[0].hotel.address}
            </span>
          </div>

          <div className="flex gap-2">
            <Calendar size={18} strokeWidth={1.5} />

            {data.dates.length > 0 && (
              <span>
                از تاریخ {farsiNumber(jaliliDate(data.dates[0].start))} تا{" "}
                {farsiNumber(jaliliDate(data.dates[0].end))}
              </span>
            )}
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
          <span>{persianPriceFormat(data.min_cost)} تومان</span>

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

export default TourCard;
