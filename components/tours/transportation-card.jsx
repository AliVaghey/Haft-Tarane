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

const TransportationCard = ({ data, number }) => {
  const tourHook = useTour();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteTranspotation = async () => {
    setIsLoading(true);

    await CSRFToken();

    // await axios
    //   .delete(`/api/agency/tour/date/${data.id}`)
    //   .then((response) => {
    //     toast.success(<ToastSuccess text="تاریخ مورد نظر با موفقیت حذف شد" />);
    //     tourHook.setFlag(!tourHook.flag);
    //   })
    //   .catch((error) => {
    //     toast.error(
    //       <ToastError
    //         text={
    //           error?.response?.data?.message ||
    //           defaultMessages.errors.internalError
    //         }
    //       />,
    //     );
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  console.log("data", data);

  return (
    <div className="flex flex-col items-center gap-5 lg:flex-row">
      {data.origin}
      {/* <div className="flex-1 rounded-lg border-2 p-1 ">
        {farsiNumber(jaliliDate(data.start))}
      </div>
      <div className="flex-1 rounded-lg border-2 p-1 ">
        {farsiNumber(jaliliDate(data.end))}
      </div>
      <SubmitButton
        className="h-8 bg-red-primary px-2 text-white"
        onClick={() => {
          handleDeleteTranspotation();
        }}
        loading={isLoading}
      >
        <Trash2 size={16} strokeWidth={1.5} />
      </SubmitButton> */}
    </div>
  );
};

export default TransportationCard;
