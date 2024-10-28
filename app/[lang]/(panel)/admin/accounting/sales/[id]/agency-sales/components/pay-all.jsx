"use client";

import useMount from "@/hooks/use-mount";
import { CircleCheckBig } from "lucide-react";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import {  axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import { useState } from "react";
import { useTour } from "@/hooks/use-tour";
import { cn } from "@/lib/utils";
import AdminPayDialog from "@/components/helpers/admin-pay-dialog";
import FormData from "form-data";

const PayAll = ({ agencyId, className }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [payData, setPayData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [open, setOpen] = useState(false);

  const mount = useMount();

  const onPay = async (values) => {
    setLoading(true);

    const formData = new FormData();

    values.description && formData.append("description", values.description);
    formData.append("receipt", values.recipt.file);


    await axios
      .post(`/api/admin/agency/${agencyId}/checkout`, formData)
      .then((response2) => {
        if (response2.status === 201) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"بدهی با موفقیت پرداخت شد"}</span>
            </div>,
          );

          tourHook.setFlag(!tourHook.flag);

          setOpen(false);
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
        setLoading(false);
      });
  };

  const getPayInfo = async () => {
    setLoading2(true);

    await axios
      .get(`/api/admin/agency/${agencyId}/checkout`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.total === 0) {
            toast.info(`برای این آژانس پرداختی وجود ندارد`);
          } else {
            setPayData(response.data);
            setOpen(true);
          }
        }
      })
      .catch((err) => {
      })
      .finally(() => {
        setLoading2(false);
      });
  };

  if (!mount) {
    return null;
  }

  return (
    <div className={cn("mb-4 mt-2 flex w-full flex-row-reverse", className)}>
      <AdminPayDialog
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onPay}
        payData={payData}
      />
      <SubmitButton
        loading={loading2}
        className="h-8"
        onClick={() => getPayInfo()}
      >
        تسویه حساب همه
      </SubmitButton>
    </div>
  );
};

export default PayAll;
