import { Plane } from "lucide-react";
import { Separator } from "../ui/separator";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDateHour } from "@/lib/jalali-date";
import { persianPriceFormat } from "@/lib/persian-price-format";

const DetailsTourPlan = ({ data }) => {
  console.log("data.flight", data[0].flight);
  return data.length > 0 && data[0].flight ? (
    <div className="mb-5 flex min-h-96 flex-col gap-5 rounded-lg bg-white p-5 lg:gap-10">
      {data &&
        data.map((item, index) => {
          const { flight } = item;

          console.log("flight", flight);
          return (
            <>
              <div
                className="grid w-full grid-cols-2 gap-5 md:grid-cols-3"
                key={index}
              >
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-red-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">مبدا</span>
                    <span>{flight.from}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-red-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">مقصد</span>
                    <span>{flight.to}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-red-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">نوع</span>
                    {/* <span>{flight.carrier}</span> */}
                    <span>{"هواپیما مسافربری"}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-orange-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">زمان حرکت</span>
                    <span>
                      {farsiNumber(
                        jaliliDateHour(
                          `${flight.date_flight} ${flight.time_flight}`,
                        ),
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-orange-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">زمان رسیدن</span>
                    <span>{farsiNumber(jaliliDateHour(flight.end))}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-orange-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">مدت زمان سفر</span>
                    <span>{farsiNumber(flight.duration)}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-teal-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">نوع وسیله نقلیه</span>
                    <span>{flight.carrier}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-teal-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">نام شرکت مسافربری</span>
                    <span>{flight.airline}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-teal-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">نوع بلیط</span>
                    <span>{flight.type}</span>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="rounded-lg bg-teal-500 p-3 text-white">
                    <Plane strokeWidth={1.5} size={18} />
                  </span>
                  <div className="flex flex-col gap-0">
                    <span className="font-bold">قیمت</span>
                    <span>
                      {farsiNumber(persianPriceFormat(+flight.price_final))}
                    </span>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          );
        })}
    </div>
  ) : (
    <div className="mb-5 flex min-h-96 flex-col gap-5 rounded-lg bg-white p-5 lg:gap-10">
      {data &&
        data.map((item, index) => (
          <>
            <div
              className="grid w-full grid-cols-2 gap-5 md:grid-cols-3"
              key={index}
            >
              <div className="flex flex-1 items-center gap-3">
                <span className="rounded-lg bg-red-500 p-3 text-white">
                  <Plane strokeWidth={1.5} size={18} />
                </span>
                <div className="flex flex-col gap-0">
                  <span className="font-bold">مبدا</span>
                  <span>{item.origin}</span>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <span className="rounded-lg bg-red-500 p-3 text-white">
                  <Plane strokeWidth={1.5} size={18} />
                </span>
                <div className="flex flex-col gap-0">
                  <span className="font-bold">مقصد</span>
                  <span>{item.destination}</span>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <span className="rounded-lg bg-red-500 p-3 text-white">
                  <Plane strokeWidth={1.5} size={18} />
                </span>
                <div className="flex flex-col gap-0">
                  <span className="font-bold">نوع</span>
                  <span>{item.type}</span>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <span className="rounded-lg bg-orange-500 p-3 text-white">
                  <Plane strokeWidth={1.5} size={18} />
                </span>
                <div className="flex flex-col gap-0">
                  <span className="font-bold">زمان حرکت</span>
                  <span>{farsiNumber(jaliliDateHour(item.start))}</span>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <span className="rounded-lg bg-orange-500 p-3 text-white">
                  <Plane strokeWidth={1.5} size={18} />
                </span>
                <div className="flex flex-col gap-0">
                  <span className="font-bold">زمان رسیدن</span>
                  <span>{farsiNumber(jaliliDateHour(item.end))}</span>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <span className="rounded-lg bg-orange-500 p-3 text-white">
                  <Plane strokeWidth={1.5} size={18} />
                </span>
                <div className="flex flex-col gap-0">
                  <span className="font-bold">مدت زمان سفر</span>
                  <span>{farsiNumber(item.duration)}</span>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <span className="rounded-lg bg-teal-500 p-3 text-white">
                  <Plane strokeWidth={1.5} size={18} />
                </span>
                <div className="flex flex-col gap-0">
                  <span className="font-bold">نوع وسیله نقلیه</span>
                  <span>{item.transportation_type}</span>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <span className="rounded-lg bg-teal-500 p-3 text-white">
                  <Plane strokeWidth={1.5} size={18} />
                </span>
                <div className="flex flex-col gap-0">
                  <span className="font-bold">نام شرکت مسافربری</span>
                  <span>{item?.company_name}</span>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <span className="rounded-lg bg-teal-500 p-3 text-white">
                  <Plane strokeWidth={1.5} size={18} />
                </span>
                <div className="flex flex-col gap-0">
                  <span className="font-bold">قیمت</span>
                  <span>{farsiNumber(persianPriceFormat(+item.price))}</span>
                </div>
              </div>
            </div>
            <Separator />
          </>
        ))}
    </div>
  );
};

export default DetailsTourPlan;
