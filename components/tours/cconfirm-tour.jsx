"use client";

import SubmitButton from "@/components/submit-button";
import { useState } from "react";
import ToastSuccess from "@/components/toast/toast-success";
import ToastError from "@/components/toast/toast-error";
import { CSRFToken, axios } from "@/lib/axios";
import { toast } from "sonner";
import { defaultMessages } from "@/lib/default-messages";
import { useRouter } from "next/navigation";
import { routes } from "@/routes/routes";

const ConfirmTour = ({ tour_id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const confirmTour = async () => {
    setIsLoading(true);

    await CSRFToken();

    await axios
      .put(`/api/agency/tour/${tour_id}/pending`)
      .then((response) => {
        toast.success(
          <ToastSuccess text="اطلاعات تور با موفقیت برای ادمین ارسال شد" />,
        );
        router.push(routes.agency.tours.pending);
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
    <SubmitButton loading={isLoading} onClick={confirmTour} className="mr-auto">
      ثبت نهایی و ارسال برای ادمین
    </SubmitButton>
  );
};

export default ConfirmTour;
