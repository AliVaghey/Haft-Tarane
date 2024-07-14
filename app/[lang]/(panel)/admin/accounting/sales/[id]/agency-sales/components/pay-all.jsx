"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useMount from "@/hooks/use-mount";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, Upload, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import { CSRFToken, axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import { useCallback, useState } from "react";
import SearchableSelect from "@/components/ui/searchable-select";
import { Button } from "@/components/ui/button";
import { useTour } from "@/hooks/use-tour";
import { Input } from "@/components/ui/input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { dateSchema, enDatelSchema } from "@/lib/validation/tour/date";
import { DateForm } from "@/lib/date-form";
import Dropzone from "react-dropzone";
import Image from "next/image";
import {
  enPayDatesSchema,
  payDatesSchema,
} from "@/lib/validation/accounting/pay-dates";
import { cn } from "@/lib/utils";
import AdminPayDialog from "@/components/helpers/admin-pay-dialog";
import FormData from "form-data";

const PayAll = ({ agencyId, className, data }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [payData, setPayData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [open, setOpen] = useState(false);

  const mount = useMount();

  const router = useRouter();

  const onPay = async (values) => {
    setLoading(true);
    console.log("valuesssssss", values);

    const formData = new FormData();

    values.description && formData.append("description", values.description);
    formData.append("receipt", values.recipt.file);

    await CSRFToken();

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
        console.log("login-error", error);
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
        console.log("setPayDataError", err);
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
