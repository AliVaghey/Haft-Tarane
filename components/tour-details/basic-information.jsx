import { Plane } from "lucide-react";

const DetailsBasicInformation = ({ data }) => {
  return (
    <div className="mb-5 flex min-h-96 flex-col gap-5 rounded-lg bg-white p-5 lg:gap-10">
      {/* basic-information-1 */}
      <div className="flex w-full items-center">
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-lg bg-red-500 p-3 text-white">
            <Plane strokeWidth={1.5} size={18} />
          </span>
          <div className="flex flex-col gap-0">
            <span className="font-bold">عنوان تور</span>
            <span>{data.title}</span>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-lg bg-red-500 p-3 text-white">
            <Plane strokeWidth={1.5} size={18} />
          </span>
          <div className="flex flex-col gap-0">
            <span className="font-bold">سبک تور</span>
            <span>{data.trip_type}</span>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-lg bg-red-500 p-3 text-white">
            <Plane strokeWidth={1.5} size={18} />
          </span>
          <div className="flex flex-col gap-0">
            <span className="font-bold">تعداد شب اقامت</span>
            <span>{data.staying_nights}</span>
          </div>
        </div>
      </div>

      {/* basic-information-2 */}
      <div className="flex w-full items-center">
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-lg bg-orange-400 p-3 text-white">
            <Plane strokeWidth={1.5} size={18} />
          </span>
          <div className="flex flex-col gap-0">
            <span className="font-bold">ظرفیت تور</span>
            <span>{data.capacity}</span>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-lg bg-orange-400 p-3 text-white">
            <Plane strokeWidth={1.5} size={18} />
          </span>
          <div className="flex flex-col gap-0">
            <span className="font-bold">نام پشتیبان</span>
            <span>{"علی محمدی"}</span>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-lg bg-orange-400 p-3 text-white">
            <Plane strokeWidth={1.5} size={18} />
          </span>
          <div className="flex flex-col gap-0">
            <span className="font-bold">نوع حمل و نقل</span>
            <span>
              {data.transportations &&
                data.transportations[0].transportation_type}
            </span>
          </div>
        </div>
      </div>

      {/* basic-information-3 */}
      <div className="flex w-full items-center">
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-lg bg-teal-400 p-3 text-white">
            <Plane strokeWidth={1.5} size={18} />
          </span>
          <div className="flex flex-col gap-0">
            <span className="font-bold">انقضا</span>
            <span>{data.expiration} روز قبل از شروع تور</span>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-lg bg-teal-400 p-3 text-white">
            <Plane strokeWidth={1.5} size={18} />
          </span>
          <div className="flex flex-col gap-0">
            <span className="font-bold">مبدا</span>
            <span>{data.origin}</span>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-lg bg-teal-400 p-3 text-white">
            <Plane strokeWidth={1.5} size={18} />
          </span>
          <div className="flex flex-col gap-0">
            <span className="font-bold">مقصد</span>
            <span>{data.destination}</span>
          </div>
        </div>
      </div>

      {/* basic-information-4 */}
      <div className="flex w-full items-center">
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-lg bg-blue-400 p-3 text-white">
            <Plane strokeWidth={1.5} size={18} />
          </span>
          <div className="flex flex-col gap-0">
            <span className="font-bold">نوع پرداخت</span>
            <span>{data.selling_type}</span>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-lg bg-blue-400 p-3 text-white">
            <Plane strokeWidth={1.5} size={18} />
          </span>
          <div className="flex flex-col gap-0">
            <span className="font-bold">سبک های تور</span>
            <span className="flex flex-wrap items-center gap-1">
              {data.tour_styles &&
                data.tour_styles.map((item, index) => (
                  <p className="mr-2" key={index}>
                    {item}
                  </p>
                ))}
            </span>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <span className="rounded-lg bg-blue-400 p-3 text-white">
            <Plane strokeWidth={1.5} size={18} />
          </span>
          <div className="flex flex-col gap-0">
            <span className="font-bold">نام آژانس</span>
            <span>{data.agency_name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsBasicInformation;
