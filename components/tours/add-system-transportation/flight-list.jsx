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
import { axios } from "@/lib/axios";
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
import { persianPriceFormat } from "@/lib/persian-price-format";
import { jaliliDateHour } from "@/lib/jalali-date";
import { farsiNumber } from "@/lib/farsi-number";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  enFlightListSchema,
  flightListSchema,
} from "@/lib/validation/tour/flight-list";
import { ScrollArea } from "@/components/ui/scroll-area";

const FlightList = ({ flights, addTransportation }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [isOpen, setIsOpen] = useState(false);

  const mount = useMount();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? flightListSchema : enFlightListSchema,
    ),
    defaultValues: {
      returning: "0",
      start_date: new Date(),
      flight: {},
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
    const { flight, returning, start_date } = values;

    let newValues = {
      ...flight,
      returning: returning,
    };

    if (returning === "1") {
      newValues.start_date = baseDateForm(start_date);
    }

    await addTransportation(newValues);
  };

  return (
    <div className="w-full rounded-lg border border-muted-foreground p-2 text-muted-foreground">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2"
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="returning"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع پرواز</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب کنید" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">رفت</SelectItem>
                      <SelectItem value="1">برگشت</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="col-span-3 mt-1.5 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel className="text-xs">
                    تاریخ رفت (در صورتی که پرواز برگشت میباشد نیاز است این فیلد
                    را پر کنید)
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      disabled={getValues("returning") === "0"}
                      value={getValues("start_date")}
                      onChange={(date) => {
                        date?.isValid
                          ? setValue("start_date", new Date(date))
                          : "";
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

          <FormField
            control={form.control}
            name="flight"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-col gap-2 rounded-lg px-2">
                <FormLabel className="mt-5">انتخاب پرواز : </FormLabel>
                <FormControl>
                  <RadioGroup
                    dir="rtl"
                    onValueChange={(e) => {
                      const flightIndex = flights.findIndex(
                        (i) => i.number_flight === e,
                      );

                      const currentFlight = flights[flightIndex];

                      field.onChange(currentFlight);
                    }}
                    defaultValue={field.value}
                    className="flex w-full flex-col items-end gap-6 "
                  >
                    {flights.map((item, index) => (
                      <FormItem key={index} className="w-full">
                        {" "}
                        <ScrollArea
                          dir={dictionary["language"] === "en" ? "ltr" : "rtl"}
                          className="w-full flex-1 overflow-x-auto overflow-y-auto"
                        >
                          <div className="flex w-full flex-wrap items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value={item.number_flight} />
                            </FormControl>
                            <FormLabel className="mt-1 w-full font-normal">
                              <div className="mt-1 flex min-w-full flex-nowrap gap-4 justify-self-end border-b text-sm">
                                <div className="flex flex-col gap-2">
                                  <span>شماره پرواز</span>
                                  <span>{item.number_flight}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <span>قیمت</span>
                                  <span>
                                    {persianPriceFormat(item.price_final)} ریال
                                  </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <span>ایرلاین</span>
                                  <span>{item.airline}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <span>تاریخ حرکت</span>
                                  <span>
                                    {farsiNumber(
                                      jaliliDateHour(
                                        `${item.date_flight} ${item.time_flight}`,
                                      ),
                                    )}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <span>ظرفیت</span>
                                  <span>{item.capacity}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <span>نوع پرواز</span>
                                  <span>{item.type_flight}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <span>نوع بلیط</span>
                                  <span>{item.type}</span>
                                </div>
                              </div>
                            </FormLabel>
                          </div>
                        </ScrollArea>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton className="mt-auto" loading={isSubmitting}>
            ثبت حمل و نقل
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default FlightList;
