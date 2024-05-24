"use client";

import SubmitButton from "@/components/submit-button";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CostItems from "./cost-items";
import { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { toast } from "sonner";
import { useTour } from "@/hooks/use-tour";
import { CSRFToken, axios } from "@/lib/axios";

const HotelCosts = ({ data, number, tour_id }) => {
  const tourHook = useTour();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteHotel = async () => {
    setIsLoading(true);

    await CSRFToken();

    await axios
      .delete(`/api/agency/tour/cost/${data.id}`)
      .then(async (response) => {
        tourHook.setFlag(!tourHook.flag);
        toast.success(
          <div className="flex items-center gap-2">
            <span>
              <CircleCheckBig className="text-green-600" />
            </span>
            <span>{"پکیج انتخاب شده حذف شد"}</span>
          </div>,
        );
      })
      .catch((erroe) => {
        console.log("erroe", erroe);
        toast.error("مشکلی پیش آمده است. لطفا مجددا تلاش فرمایید");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="shadow-cards flex flex-col gap-2 rounded-xl border p-2">
      <div className="flex items-center justify-between px-3 py-2">
        <span className="font-semibold text-muted-foreground">
          {number}- {data.hotel.name}
        </span>
        <SubmitButton
          className="h-8 bg-red-primary px-2 text-xs text-white hover:bg-red-dark"
          onClick={() => {
            handleDeleteHotel();
          }}
          loading={isLoading}
        >
          <div className="flex items-center gap-1">
            <Trash2 size={16} strokeWidth={2} />
            <span>حذف پکیج</span>
          </div>
        </SubmitButton>
      </div>
      <Separator className="my-1" />
      <div className="flex rounded-md border bg-gray-background text-muted-foreground">
        <CostItems
          price={data.one_bed}
          title="استاندارد یک تخته"
          tour_id={tour_id}
        />
        <CostItems
          price={data.two_bed}
          title="استاندارد دو تخته"
          tour_id={tour_id}
        />
        <CostItems
          price={data.plus_one}
          title="استاندارد نفر اضافه"
          tour_id={tour_id}
        />
        <CostItems
          price={data.cld_6}
          title="استاندارد کودک ۶ تا ۱۲ سال"
          tour_id={tour_id}
        />
        <CostItems
          price={data.cld_2}
          title="استاندارد کودک ۲ تا ۶ سال"
          tour_id={tour_id}
        />
        <CostItems
          price={data.baby}
          title="استاندارد نوزاد"
          tour_id={tour_id}
        />
      </div>
    </div>
  );
};

export default HotelCosts;
