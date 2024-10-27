"use client";

import useMount from "@/hooks/use-mount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig } from "lucide-react";
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
import {  axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import { useState } from "react";
import { useTour } from "@/hooks/use-tour";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { baseDateForm } from "@/lib/date-form";
import {
  enPayDatesSchema,
  payDatesSchema,
} from "@/lib/validation/accounting/pay-dates";
import { cn } from "@/lib/utils";
import AdminPayDialog from "@/components/helpers/admin-pay-dialog";

const PayDates = ({ agencyId, className }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [payData, setPayData] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const mount = useMount();

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

  const onPay = async (values) => {
    setLoading(true);

    const start = baseDateForm(getValues("start"));
    const end = baseDateForm(getValues("end"));

    const formData = new FormData();

    values.description && formData.append("description", values.description);
    formData.append("receipt", values.recipt.file);


    await axios
      .post(
        `/api/admin/agency/${agencyId}/checkout?start=${start}&end=${end}`,
        formData,
      )
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

  const getPayInfo = async (values) => {

    const start = baseDateForm(values.start);
    const end = baseDateForm(values.end);

    await axios
      .get(`/api/admin/agency/${agencyId}/checkout?start=${start}&end=${end}`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.total === 0) {
            toast.info(
              `برای این آژانس در تاریخ های انتخاب شده پرداختی وجود ندارد`,
            );
          } else {
            setPayData(response.data);
            setOpen(true);
          }
        }
      })
      .catch((err) => {
      })
      .finally(() => {});
  };

  if (!mount) {
    return null;
  }

  return (
    <div className={cn("mb-4 mt-2", className)}>
      <AdminPayDialog
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onPay}
        payData={payData}
      />
      <Form {...form}>
        <form onSubmit={handleSubmit(getPayInfo)}>
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
                      // minDate={new Date()}
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
                      // minDate={new Date()}
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
              className="col-span-1 px-16 lg:mt-[23px]"
              loading={isSubmitting}
            >
              محاسبه و تسویه
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PayDates;
