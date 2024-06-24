import {
  defaultAirlineLogo,
  defaultAirport,
  flightPath,
} from "@/constants/images";
import { Plane } from "lucide-react";
import Image from "next/image";
import { persianPriceFormat } from "@/lib/persian-price-format";
import Link from "next/link";
import { farsiNumber } from "@/lib/farsi-number";

const FlightCard = ({ data }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="flex">
        <div className="relative hidden md:inline-block">
          <Image
            src={defaultAirport}
            width={600}
            height={600}
            alt="flight"
            className="aspect-square h-full w-72"
          />
          <div className="absolute bottom-0 w-full bg-black/30 p-2 text-center text-white">
            <span>Mahan Airline</span>
          </div>
          <div className="absolute right-5 top-5">
            <Image
              src={defaultAirlineLogo}
              width={100}
              height={100}
              alt="flight"
              className="aspect-square w-11 rounded-full"
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 p-2 px-4">
          <div className="flex w-full items-center gap-2">
            <div className="flex flex-1 flex-row items-center justify-center gap-2 rounded-sm bg-[#EFEFEF] px-5 py-1">
              <span className="text-yellow-primary">از مبدا</span>
              <span>{data.from}</span>
            </div>
            <div className="flex flex-col gap-4">
              <Image
                src={flightPath}
                width={700}
                height={200}
                alt="flight"
                className="h-9 w-72"
              />
              <span className="text-center text-xs">{`مدت زمان سفر : ۴ ساعت و ۳۰ دقیقه`}</span>
            </div>
            <div className="flex flex-1 flex-row items-center justify-center gap-2 rounded-sm bg-[#EFEFEF] px-5 py-1">
              <span className="text-yellow-primary">به مقصد</span>
              <span>{data.to}</span>
            </div>
          </div>

          <div className="flex w-full items-center gap-2">
            <div className="flex flex-1 items-center justify-start">
              <span>{farsiNumber(data.time_flight)}</span>
            </div>
            <div className="flex flex-1 items-center justify-center gap-2">
              <span>{farsiNumber("16:00")}</span>
              <span>تا</span>
              <span>{farsiNumber("18:30")}</span>
            </div>
            <div className="flex flex-1 items-center justify-end">
              <span>{farsiNumber(data.time_flight)}</span>
            </div>
          </div>

          <div className="flex w-full items-center gap-2 text-xs">
            <div className="flex flex-1 items-center justify-start">
              <span>خروج</span>
            </div>
            <div className="flex flex-1 items-center justify-center gap-2 text-center">
              <span>۲ ساعت و ۳۰ دقیقه توقف</span>
            </div>
            <div className="flex flex-1 items-center justify-end">
              <span>فرود</span>
            </div>
          </div>

          <div className="flex w-full items-center gap-2 text-xs">
            <div className="flex flex-1 flex-row items-center justify-center gap-2 rounded-sm bg-[#EFEFEF] px-5 py-1">
              <Plane
                size={14}
                strokeWidth={1}
                className="text-yellow-primary"
              />
              <span className="text-yellow-primary">فرودگاه مهر آباد</span>
              <span>{data.from}</span>
            </div>
            <div className="flex flex-1 flex-row items-center justify-center gap-2 rounded-sm bg-[#EFEFEF] px-5 py-1">
              <Plane
                size={14}
                strokeWidth={1}
                className="text-yellow-primary"
              />
              <span className="text-yellow-primary">
                فرودگاه هاشمی نژاد مشهد
              </span>
              <span>{data.to}</span>
            </div>
          </div>

          <div className="mt-4 flex w-full flex-col items-center gap-5 text-xs md:flex-row">
            <div className="flex flex-1 items-center justify-start">
              <div className="flex flex-1 flex-row items-center justify-center gap-2 rounded-sm bg-[#EFEFEF] px-5 py-2">
                <span className="text-red-primary">{data.type_flight}</span>:
                <span>{persianPriceFormat(data.price_final)} ریال</span>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-start">
              <div className="flex flex-1 flex-row items-center justify-center gap-2 rounded-sm bg-[#F8DCDC] px-5 py-2">
                <span>{farsiNumber(data.capacity)} صندلی باقی مانده</span>
              </div>
            </div>

            <Link href={""} className="flex flex-1 items-center justify-start">
              <div className="flex flex-1 flex-row items-center justify-center gap-2 rounded-sm bg-[#FCF7D1] px-5 py-2">
                <span>خرید بلیط</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
