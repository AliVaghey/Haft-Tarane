import { Plane } from "lucide-react";
import { Separator } from "../ui/separator";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDateHour } from "@/lib/jalali-date";

const DetailsDocuments = ({ data }) => {
  return (
    <div className="mb-5 flex min-h-96 flex-col gap-5 rounded-lg bg-white p-5 lg:gap-10">
      {data && (
        <div className="grid w-full grid-cols-1 gap-5">
          <div className="flex flex-1 items-center gap-3">
            <span className="rounded-lg bg-yellow-500 p-3 text-white">
              <Plane strokeWidth={1.5} size={18} />
            </span>
            <div className="flex flex-col gap-0">
              <span className="font-bold">سرویس های رایگان</span>
              <div className="flex gap-1">
                {data.free_services &&
                  data.free_services.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3">
            <span className="rounded-lg bg-red-500 p-3 text-white">
              <Plane strokeWidth={1.5} size={18} />
            </span>
            <div className="flex flex-col gap-0">
              <span className="font-bold">مدارک مورد نیاز</span>
              <div className="flex gap-1">
                {data.certificates &&
                  data.certificates.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3">
            <span className="rounded-lg bg-teal-500 p-3 text-white">
              <Plane strokeWidth={1.5} size={18} />
            </span>
            <div className="flex flex-col gap-0">
              <span className="font-bold">قوانین کنسلی</span>
              <span>{data.cancel_rules}</span>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3">
            <span className="rounded-lg bg-blue-500 p-3 text-white">
              <Plane strokeWidth={1.5} size={18} />
            </span>
            <div className="flex flex-col gap-0">
              <span className="font-bold">توضیحات</span>
              <span>{data.descriptions}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsDocuments;
