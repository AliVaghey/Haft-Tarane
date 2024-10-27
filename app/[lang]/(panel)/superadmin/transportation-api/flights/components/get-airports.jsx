"use client";

import SubmitButton from "@/components/submit-button";
import ToastError from "@/components/toast/toast-error";
import { CSRFToken, axios } from "@/lib/axios";
import { defaultMessages } from "@/lib/default-messages";
import { CircleCheckBig } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const GetAirports = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    await CSRFToken();

    await axios
      .get("api/admin/save-airports")
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"لیست فرودگاه ها با موفقیت آپدیت شد"}</span>
            </div>,
          );
        }
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
    <div>
      <SubmitButton
        className="bg-red-primary text-white hover:bg-red-dark"
        onClick={getData}
        loading={isLoading}
      >
        دریافت لیست فرودگاه ها
      </SubmitButton>
    </div>
  );
};

export default GetAirports;
