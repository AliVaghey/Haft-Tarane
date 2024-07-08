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

const PayDates = ({ tour_id }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [isOpen, setIsOpen] = useState(false);

  const mount = useMount();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? payDatesSchema : enPayDatesSchema,
    ),
    defaultValues: {
      start: new Date(),
      end: new Date(),
      images: [],
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

  const onDrop = useCallback(
    (files) =>
      files.map((file) => {
        setValue(
          "images",
          [
            ...getValues("images"),
            {
              file: file,
              size: String(file.size),
              name: file.name,
              type: file.type,
            },
          ],
          {
            shouldValidate: true,
          },
        );
      }),
    [getValues("images")],
  );

  if (!mount) {
    return null;
  }

  return (
    <div className="">
      <Button onClick={() => setIsOpen(true)}>افزودن تاریخ</Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle className="mr-4 text-right">افزودن تاریخ</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
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
                    name="images"
                    render={({ field }) => (
                      <FormItem className="mt-5 w-full">
                        <FormControl>
                          <Dropzone
                            maxSize={1024 * 1024 * 3}
                            maxFiles={1}
                            onDrop={onDrop}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <section>
                                <div
                                  {...getRootProps()}
                                  className="mx-auto flex cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-primary p-4"
                                >
                                  <input {...getInputProps()} />
                                  <div className="flex flex-col items-center text-muted-foreground">
                                    <span>آپلود تصاویر</span>
                                    <span className="mt-2 text-xs">
                                      برای انتخاب تصاویر کلیک کنید و یا تصاویر
                                      خود را داخل کادر بکشید (حداکثر با حجم ۱
                                      مگابایت)
                                    </span>
                                    <Upload
                                      size={60}
                                      className="mt-2 text-primary"
                                    />
                                  </div>
                                </div>
                                <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                  {getValues("images").map((img, index) => (
                                    <div
                                      className="relative rounded-lg"
                                      key={index}
                                    >
                                      <Image
                                        src={URL.createObjectURL(img.file)}
                                        className="aspect-video w-32 rounded-lg"
                                        width={240}
                                        height={160}
                                        alt="product"
                                      />
                                      <div
                                        onClick={() => {
                                          setValue(
                                            "images",
                                            getValues("images").filter(
                                              (imgItem, imgIndex) =>
                                                imgIndex !== index,
                                            ),
                                            {
                                              shouldValidate: true,
                                            },
                                          );
                                        }}
                                        className="absolute -left-2 -top-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-primary"
                                      >
                                        <X size={16} className="text-white" />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </section>
                            )}
                          </Dropzone>
                        </FormControl>
                        <FormMessage className="text-primary" />
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

export default PayDates;
