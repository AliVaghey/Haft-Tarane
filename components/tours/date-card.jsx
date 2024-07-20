"use client";

import { useState } from "react";
import SubmitButton from "../submit-button";
import { Trash2 } from "lucide-react";
import { jaliliDate } from "@/lib/jalali-date";
import { farsiNumber } from "@/lib/farsi-number";
import ToastSuccess from "@/components/toast/toast-success";
import ToastError from "@/components/toast/toast-error";
import { CSRFToken, axios } from "@/lib/axios";
import { toast } from "sonner";
import { useTour } from "@/hooks/use-tour";
import DateStatus from "./date-status";
import EditDate from "./edit-date";

const DateCard = ({ data, number, transportation_type }) => {
  const tourHook = useTour();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteDate = async () => {
    setIsLoading(true);

    await CSRFToken();

    await axios
      .delete(`/api/agency/tour/date/${data.id}`)
      .then((response) => {
        toast.success(<ToastSuccess text="تاریخ مورد نظر با موفقیت حذف شد" />);
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

  return (
    <div className="flex w-full flex-col items-center gap-5 border-b pb-4 lg:flex-row">
      <span className="mt-1 text-xs text-muted-foreground">{number}-</span>
      <div className="w-full flex-1 rounded-lg border-2 p-1">
        {farsiNumber(jaliliDate(data.start))}
      </div>
      <div className="w-full flex-1 rounded-lg border-2 p-1">
        {farsiNumber(jaliliDate(data.end))}
      </div>
      {(transportation_type === "my_transportation" ||
        transportation_type === "hotel") && (
        <>
          <SubmitButton
            className="h-8 bg-red-primary px-2 text-white hover:bg-red-dark"
            onClick={() => {
              handleDeleteDate();
            }}
            loading={isLoading}
          >
            <Trash2 size={16} strokeWidth={1.5} />
          </SubmitButton>
          <EditDate data={data} />
        </>
      )}
      <div className="col-span-2 flex items-center gap-4 md:gap-10">
        <DateStatus date={data} />
        {/* <DatePrice date={data} /> */}
      </div>
    </div>
  );
};

export default DateCard;
