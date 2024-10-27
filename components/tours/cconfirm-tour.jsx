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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import SearchableSelect from "@/components/ui/searchable-select";
import { Button } from "@/components/ui/button";
import { useTour } from "@/hooks/use-tour";
import { Input } from "@/components/ui/input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateForm } from "@/lib/date-form";
import {
  enProfitRateSchema,
  profitRateSchema,
} from "@/lib/validation/tour/confirm-tour";

const ConfirmTour = ({ tour_id, profit_rate }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [isOpen, setIsOpen] = useState(false);

  const mount = useMount();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? profitRateSchema : enProfitRateSchema,
    ),
    defaultValues: {
      profit_rate: String(profit_rate),
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
    const { profit_rate } = values;

    const encodedFormData = querystring.stringify({
      profit_rate,
    });

    await CSRFToken();

    await axios
      .put(`/api/agency/tour/${tour_id}/pending`, encodedFormData)
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
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 grid grid-cols-3 gap-5">
          <FormField
            control={control}
            name="profit_rate"
            render={({ field }) => (
              <FormItem className="text-right lg:col-span-1">
                <FormLabel>کمیسیون بی باک سفر</FormLabel>
                <FormControl>
                  <SearchableSelect
                    changeValue={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={getValues("profit_rate")}
                    api={"/api/agency/profit-rates"}
                    // query="name"
                    placeholder={"کمیسیون"}
                    keyValue="rate"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SubmitButton className="mt-3" loading={isSubmitting}>
          ثبت نهایی و ارسال برای ادمین
        </SubmitButton>
      </form>
    </Form>
  );
};

export default ConfirmTour;
