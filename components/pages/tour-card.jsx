import { chita } from "@/constants/images";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { Button } from "../ui/button";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { jaliliDate } from "@/lib/jalali-date";
import { farsiNumber } from "@/lib/farsi-number";

const TourCard = ({ data }) => {
  return (
    <div className="rounded-lg bg-yellow-light shadow-lg">
      <div className="flex h-full gap-5">
        <div>
          <Image
            src={data.costs.length > 0 ? data.costs[0].hotel.photo : chita}
            width={360}
            height={360}
            className="h-full w-52 rounded-r-lg object-cover object-center"
            alt="hotel"
          />
        </div>

        <div className="flex flex-col gap-2 p-4 text-sm text-muted-foreground">
          <h1 className="text-base font-bold">{data.agency_name}</h1>
          <h1 className="flex items-center gap-1 text-base font-bold">
            <span className="font-normal">عنوان تور:</span>
            <span>{data.title}</span>
          </h1>

          <div className="flex gap-2">
            <MapPin size={18} strokeWidth={1.5} />
            <span>{data.costs.length > 0 && data.costs[0].hotel.address}</span>
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
            <Calendar size={18} strokeWidth={1.5} />

            <span>
              از {data.origin} به {data.destination}
            </span>
          </div>
        </div>

        <div className="mr-auto flex min-h-full flex-col items-center justify-center gap-2 border-r border-yellow-dark px-5">
          <span>شروع قیمت از :</span>
          <span>{persianPriceFormat(data.min_cost)}</span>
          <Link href={routes.tours.details(data.id)}>
            <Button>مشاهده جزئیات</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
