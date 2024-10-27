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
import { CSRFToken, axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import { useState } from "react";
import SearchableSelect from "@/components/ui/searchable-select";
import { Button } from "@/components/ui/button";
import { useTour } from "@/hooks/use-tour";
import { Input } from "@/components/ui/input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { DateForm, baseDateForm } from "@/lib/date-form";
import {
  entransportationSchema,
  transportationSchema,
} from "@/lib/validation/tour/transportation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  enGetFlightsSchema,
  getFlightsSchema,
} from "@/lib/validation/tour/get-flights";

const GetFlights = ({ setFlights }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [isOpen, setIsOpen] = useState(false);
  const [deviceTypes, setDeviceTypes] = useState([]);

  const mount = useMount();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? getFlightsSchema : enGetFlightsSchema,
    ),
    defaultValues: {
      from: "",
      to: "",
      date: new Date(),
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

    const { from, to, date } = values;

    const encodedFormData = querystring.stringify({
      from,
      to,
      date: baseDateForm(date),
    });


    await CSRFToken();

    await axios
      .post(`/api/flights`, encodedFormData)
      .then((response) => {
        if (response.status === 200) {
          setFlights(response.data);
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
      });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <FormField
              control={control}
              name="from"
              render={({ field }) => (
                <FormItem className="col-span-3 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel>مبدا</FormLabel>
                  <FormControl>
                    <SearchableSelect
                      changeValue={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={getValues("from")}
                      api={"/api/airports"}
                      // query="name"
                      keyValue={"IATA_code"}
                      placeholder={"مبدا"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="to"
              render={({ field }) => (
                <FormItem className="col-span-3 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel>مقصد</FormLabel>
                  <FormControl>
                    <SearchableSelect
                      changeValue={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={getValues("to")}
                      api={"/api/airports"}
                      // query="name"
                      keyValue={"IATA_code"}
                      placeholder={"مقصد"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="date"
              render={({ field }) => (
                <FormItem className="col-span-3 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel>تاریخ شروع</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={getValues("date")}
                      onChange={(date) => {
                        date?.isValid ? setValue("date", new Date(date)) : "";
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
          </div>
          <SubmitButton className="mt-auto" loading={isSubmitting}>
            جستجو
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default GetFlights;
