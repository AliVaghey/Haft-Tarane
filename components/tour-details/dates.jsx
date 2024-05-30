import { Plane } from "lucide-react";
import { Separator } from "../ui/separator";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate, jaliliDateHour } from "@/lib/jalali-date";
import { persianPriceFormat } from "@/lib/persian-price-format";

const DetailsDates = ({ data }) => {
  return (
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
                  <span className="font-bold">تاریخ شروع</span>
                  <span>{farsiNumber(jaliliDate(item.start))}</span>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <span className="rounded-lg bg-red-500 p-3 text-white">
                  <Plane strokeWidth={1.5} size={18} />
                </span>
                <div className="flex flex-col gap-0">
                  <span className="font-bold">تاریخ پایان</span>
                  <span>{farsiNumber(jaliliDate(item.end))}</span>
                </div>
              </div>
            </div>
            <Separator />
          </>
        ))}
    </div>
  );
};

export default DetailsDates;
