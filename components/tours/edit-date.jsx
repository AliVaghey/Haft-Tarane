"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useMount from "@/hooks/use-mount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, Edit } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useTour } from "@/hooks/use-tour";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { dateSchema, enDatelSchema } from "@/lib/validation/tour/date";
import { DateForm } from "@/lib/date-form";

const EditDate = ({ data }) => {
  console.log("datauuuuu", data);

  const dictionary = useDictionary();

  const tourHook = useTour();

  const [isOpen, setIsOpen] = useState(false);

  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? dateSchema : enDatelSchema,
    ),
    defaultValues: {
      start: new Date(data.start),
      end: new Date(data.end),
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

    const { start, end } = values;

    const encodedFormData = querystring.stringify({
      start: DateForm(start),
      end: DateForm(end),
    });

    console.log("encodedFormData", encodedFormData);

    await CSRFToken();

    await axios
      .put(`/api/agency/tour/date/${data.id}`, encodedFormData)
      .then((response2) => {
        if (response2.status === 200) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"تاریخ با موفقیت ویرایش شد"}</span>
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
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex h-7 items-center gap-1 bg-blue-500 px-2 text-xs text-white hover:bg-blue-700"
      >
        <Edit size={16} strokeWidth={1.5} />
        <span>ویرایش</span>
      </Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle className="mr-4 text-right">ویرایش تاریخ</DialogTitle>
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
                </div>
                <SubmitButton className="mt-3" loading={isSubmitting}>
                  ویرایش
                </SubmitButton>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditDate;