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

const PayDates = ({ tour_id, className }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const mount = useMount();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? payDatesSchema : enPayDatesSchema,
    ),
    defaultValues: {
      start: null,
      end: null,
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    console.log("valuesssssss", values);

    // const { start, end } = values;

    // const encodedFormData = querystring.stringify({
    //   start: DateForm(start),
    //   end: DateForm(end),
    // });

    // console.log("encodedFormData", encodedFormData);

    // await CSRFToken();

    // await axios
    //   .post(`/api/agency/tour/${tour_id}/date`, encodedFormData)
    //   .then((response2) => {
    //     if (response2.status === 201) {
    //       toast.success(
    //         <div className="flex items-center gap-2">
    //           <span>
    //             <CircleCheckBig className="text-green-600" />
    //           </span>
    //           <span>{"تاریخ با موفقیت اضافه شد"}</span>
    //         </div>,
    //       );

    //       tourHook.setFlag(!tourHook.flag);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("login-error", error);
    //     toast.error(
    //       <ToastError
    //         text={
    //           error?.response?.data?.message ||
    //           defaultMessages.errors.internalError
    //         }
    //       />,
    //     );
    //   });
  };

  if (!mount) {
    return null;
  }

  return (
    <div className={cn("mb-4 mt-2", className)}>
      {/* <AdminPayDialog
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onPay}
      />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-7 gap-5">
            <FormField
              control={control}
              name="start"
              render={({ field }) => (
                <FormItem className="col-span-7 flex flex-col gap-1 text-right lg:col-span-3">
                  <FormLabel>از تاریخ</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={getValues("start")}
                      onChange={(date) => {
                        date?.isValid ? setValue("start", new Date(date)) : "";
                      }}
                      format={false ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      minDate={new Date()}
                      style={{
                        width: "100%",
                        paddingTop: "19px",
                        paddingBottom: "19px",
                        borderColor: "rgb(226 232 240)",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="end"
              render={({ field }) => (
                <FormItem className="col-span-7 flex flex-col gap-1 text-right lg:col-span-3">
                  <FormLabel>تا تاریخ</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={getValues("end")}
                      onChange={(date) => {
                        date?.isValid ? setValue("end", new Date(date)) : "";
                      }}
                      format={false ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      minDate={new Date()}
                      style={{
                        width: "100%",
                        paddingTop: "19px",
                        paddingBottom: "19px",
                        borderColor: "rgb(226 232 240)",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton
              className="col-span-1 mt-[23px]"
              loading={isSubmitting}
            >
              محاسبه و تسویه
            </SubmitButton>
          </div>
        </form>
      </Form> */}
    </div>
  );
};

export default PayDates;
