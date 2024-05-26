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
import { DateForm } from "@/lib/date-form";
import {
  entransportationSchema,
  transportationSchema,
} from "@/lib/validation/tour/transportation";

const AddTransportation = ({ tour_id }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [isOpen, setIsOpen] = useState(false);

  const mount = useMount();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa"
        ? transportationSchema
        : entransportationSchema,
    ),
    defaultValues: {
      type: "",
      duration: "",
      company_name: "",
      transportation_type: "",
      origin: "",
      destination: "",
      start: new Date(),
      end: new Date(),
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

    const {
      type,
      duration,
      company_name,
      transportation_type,
      origin,
      destination,
      start,
      end,
    } = values;

    const encodedFormData = querystring.stringify({
      start: DateForm(start),
      end: DateForm(end),
      type,
      duration,
      company_name,
      transportation_type,
      origin,
      destination,
    });

    console.log("encodedFormData", encodedFormData);

    await CSRFToken();

    await axios
      .post(`/api/agency/tour/${tour_id}/transportation`, encodedFormData)
      .then((response2) => {
        if (response2.status === 201) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"حمل و نقل با موفقیت اضافه شد"}</span>
            </div>,
          );

          tourHook.setFlag(!tourHook.flag);
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
      });
  };

  if (!mount) {
    return null;
  }

  return (
    <div className="">
      <Button onClick={() => setIsOpen(true)}>افزودن حمل و نقل</Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle className="mr-4 text-right">
              افزودن حمل و نقل
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>نوع</FormLabel>
                        <FormControl>
                          <Input
                            className=""
                            autoComplete="off"
                            placeholder="حداقل ۲ کاراکتر"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>مدت زمان سفر</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className=""
                            autoComplete="off"
                            placeholder="بر اساس ساعت"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="origin"
                    render={({ field }) => (
                      <FormItem className="col-span-3 text-right lg:col-span-1">
                        <FormLabel>مبدا</FormLabel>
                        <FormControl>
                          <SearchableSelect
                            changeValue={(value) => {
                              field.onChange(value);
                            }}
                            defaultValue={getValues("origin")}
                            api={"/api/cities"}
                            query="name"
                            placeholder={"مبدا"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem className="col-span-3 text-right lg:col-span-1">
                        <FormLabel>مقصد</FormLabel>
                        <FormControl>
                          <SearchableSelect
                            changeValue={(value) => {
                              field.onChange(value);
                            }}
                            defaultValue={getValues("destination")}
                            api={"/api/cities"}
                            query="name"
                            placeholder={"مقصد"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="start"
                    render={({ field }) => (
                      <FormItem className="col-span-3 flex flex-col gap-1 text-right lg:col-span-1">
                        <FormLabel>تاریخ شروع</FormLabel>
                        <FormControl>
                          <DatePicker
                            value={getValues("start")}
                            onChange={(date) => {
                              date?.isValid
                                ? setValue("start", new Date(date))
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

                  <FormField
                    control={control}
                    name="end"
                    render={({ field }) => (
                      <FormItem className="col-span-3 flex flex-col gap-1 text-right lg:col-span-1">
                        <FormLabel>تاریخ پایان</FormLabel>
                        <FormControl>
                          <DatePicker
                            value={getValues("end")}
                            onChange={(date) => {
                              date?.isValid
                                ? setValue("end", new Date(date))
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

                  <FormField
                    control={control}
                    name="company_name"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>نام شرکت مسافربری</FormLabel>
                        <FormControl>
                          <Input
                            className=""
                            autoComplete="off"
                            placeholder="حداقل ۲ کاراکتر"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="transportation_type"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>نوع وسیله نقلیه</FormLabel>
                        <FormControl>
                          <Input
                            className=""
                            autoComplete="off"
                            placeholder="حداقل ۲ کاراکتر"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <SubmitButton className="mt-3" loading={isSubmitting}>
                  ارسال
                </SubmitButton>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTransportation;
