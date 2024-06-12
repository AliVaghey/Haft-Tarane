"use client";

import { useState } from "react";
import SubmitButton from "../submit-button";
import { Trash2 } from "lucide-react";
import { jaliliDate, jaliliDateHour } from "@/lib/jalali-date";
import { farsiNumber } from "@/lib/farsi-number";
import ToastSuccess from "@/components/toast/toast-success";
import ToastError from "@/components/toast/toast-error";
import { CSRFToken, axios } from "@/lib/axios";
import { toast } from "sonner";
import { useTour } from "@/hooks/use-tour";
import { Separator } from "@/components/ui/separator";
import { Train } from "lucide-react";
import { Bed } from "lucide-react";
import { LocateIcon } from "lucide-react";
import { Plane } from "lucide-react";
import { Bus } from "lucide-react";
import { Pyramid } from "lucide-react";
import { MapPin } from "lucide-react";
import { persianPriceFormat } from "@/lib/persian-price-format";

const TransportationCard = ({ data, number, lenght }) => {
  console.log("lenght", lenght);
  const tourHook = useTour();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteTranspotation = async () => {
    setIsLoading(true);

    await CSRFToken();

    await axios
      .delete(`/api/agency/tour/transportation/${data.id}`)
      .then((response) => {
        toast.success(
          <ToastSuccess text="حمل و نقل مورد نظر با موفقیت حذف شد" />,
        );
        tourHook.setFlag(!tourHook.flag);
      })
      .catch((error) => {
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              defaultMessages.errors.internalError
            }
          />,
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  console.log("data", data);

  return (
    <div className="flex flex-col text-muted-foreground">
      {number === 1 && (
        <div className="flex flex-row gap-4">
          <div className="flex h-20 flex-col items-center">
            <Separator
              orientation="vertical"
              className="flex-1 bg-transparent"
            />
            <div className="rounded-full bg-gray-background p-3">
              <Pyramid size={18} strokeWidth={1.5} className="text-blue-500" />
            </div>
            <Separator orientation="vertical" className="flex-1" />
          </div>
          <div className="my-auto flex-1">
            <div className="flex items-center gap-3 rounded-lg bg-gray-background p-2 md:p-3 lg:px-6">
              <span className="text-base text-black">شروع تور</span>
              <span className="text-base">{data.origin}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row gap-4">
        <div className="flex h-20 flex-col items-center">
          <Separator orientation="vertical" className="flex-1" />
          <div className="rounded-full bg-gray-background p-3">
            <MapPin size={18} strokeWidth={1.5} className="text-blue-500" />
          </div>
          <Separator orientation="vertical" className="flex-1" />
        </div>
        <div className="my-auto flex-1">
          <div className="flex items-center gap-3 rounded-lg bg-gray-background p-2 md:p-3 lg:px-6">
            <span className="text-base text-black">{`مقصد ${farsiNumber(number)}`}</span>
            <span className="text-base">{data.destination}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex h-40 flex-col items-center">
          <Separator orientation="vertical" className="flex-1" />
          <div className="rounded-full bg-gray-background p-3">
            {data.type === "قطار" && (
              <Train size={18} strokeWidth={1.5} className="text-blue-500" />
            )}
            {data.type === "هواپیما" && (
              <Plane size={18} strokeWidth={1.5} className="text-blue-500" />
            )}
            {data.type === "اتوبوس" && (
              <Bus size={18} strokeWidth={1.5} className="text-blue-500" />
            )}
          </div>
          <Separator orientation="vertical" className="flex-1" />
        </div>
        <div className="my-auto flex-1">
          <div className="flex flex-wrap gap-3 rounded-lg bg-gray-background p-2 md:p-3 lg:px-6">
            <div className="flex w-full justify-between">
              <span className="text-base text-black">
                {` ترنسفر با `}
                <span className="text-base text-muted-foreground">
                  {data.type}
                </span>
              </span>
              <SubmitButton
                loading={isLoading}
                onClick={handleDeleteTranspotation}
                className="h-8 bg-red-primary px-2 text-white hover:bg-red-dark"
              >
                <Trash2 size={18} strokeWidth={1.5} />
              </SubmitButton>
            </div>
            <div className="grid w-full grid-cols-1 text-sm lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span>مبدا : </span>
                  <span>{data.origin} </span>
                  <span>{farsiNumber(jaliliDateHour(data.start))}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>مقصد : </span>
                  <span>{data.destination}</span>
                  <span>{farsiNumber(jaliliDateHour(data.end))}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>قیمت : </span>
                  <span>
                    {farsiNumber(persianPriceFormat(+data.price))} تومان
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <span>نوع وسیله نقلیه : </span>
                  <span>{data.transportation_type}</span>
                </div>
                <div>
                  <span>شرکت مسافربری : </span>
                  <span>{data.company_name}</span>
                </div>
                <div>
                  <span>مدت زمان سفر : </span>
                  <span>{data.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {number !== lenght && (
        <div className="flex flex-row gap-4">
          <div className="flex h-20 flex-col items-center">
            <Separator orientation="vertical" className="flex-1" />
            <div className="rounded-full bg-gray-background p-3">
              <Bed size={18} strokeWidth={1.5} className="text-blue-500" />
            </div>
            <Separator orientation="vertical" className="flex-1" />
          </div>
          <div className="my-auto flex-1">
            <div className="flex items-center gap-3 rounded-lg bg-gray-background p-2 md:p-3 lg:px-6">
              <span className="text-base text-black">
                {` اقامت در `}
                <span className="text-base text-muted-foreground">
                  {data.destination}
                </span>
              </span>
              <span className="text-base">۳ روز</span>
            </div>
          </div>
        </div>
      )}

      {number === lenght && (
        <div className="flex flex-row gap-4">
          <div className="flex h-20 flex-col items-center">
            <Separator orientation="vertical" className="flex-1" />
            <div className="rounded-full bg-gray-background p-3">
              <Pyramid size={18} strokeWidth={1.5} className="text-blue-500" />
            </div>
            <Separator
              orientation="vertical"
              className="flex-1 bg-transparent"
            />
          </div>
          <div className="my-auto flex-1">
            <div className="flex items-center gap-3 rounded-lg bg-gray-background p-2 md:p-3 lg:px-6">
              <span className="text-base text-black">پایان تور</span>
              <span className="text-base">{data.destination}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportationCard;
