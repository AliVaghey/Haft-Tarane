"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { routes } from "@/routes/routes";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, Loader, Trash2, Upload, X } from "lucide-react";
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
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import {
  editSpecialTourSchema,
  enEditSpecialTourSchema,
} from "@/lib/validation/admin/special-tour";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import FormData from "form-data";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate } from "@/lib/jalali-date";
import { cn } from "@/lib/utils";

const AddForm = ({ data }) => {
  const dictionary = useDictionary();

  const [currentTourId, setCurrentTourId] = useState(data.tour.id);
  const [datesData, setDatesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const mount = useMount();
  const pathname = usePathname();
  const router = useRouter();

  const isAddPage = pathname.endsWith(
    routes.superadmin["special-tours"].edit(data.id),
  );

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa"
        ? editSpecialTourSchema
        : enEditSpecialTourSchema,
    ),
    defaultValues: {
      tour_id: data.tour.title,
      photo: null,
      importance: data.importance,
      advertisement: data.advertisement,
      dates: data.dates ? data.dates.map((d) => d.id) : [],
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

    const formData = new FormData();

    formData.append("importance", values.importance);
    formData.append("advertisement", values.advertisement);
    values.photo && formData.append(`photo`, values.photo.file);
    formData.append(`dates`, JSON.stringify(values.dates));

    

    await axios
      .post(`api/admin/special-tour/${data.id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"تور ویژه با موفقیت ویرایش شد"}</span>
            </div>,
          );

          router.push(routes.superadmin["special-tours"].root);
          router.refresh();
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

  useEffect(() => {
    if (data.dates) {
      fetchDates();
    }
  }, [currentTourId]);

  const fetchDates = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/agency/tour/${currentTourId}`)
      .then((response) => {
        setDatesData(response.data.data.dates);
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
        setIsLoading(false);
      });
  };

  const onDrop = useCallback(
    (files) =>
      files.map((file) => {
        setValue(
          "photo",
          {
            file: file,
            size: String(file.size),
            name: file.name,
            type: file.type,
          },
          {
            shouldValidate: true,
          },
        );
      }),
    [getValues("photo")],
  );

  if (!mount) {
    return null;
  }

  return (
    <Dialog
      open={isAddPage}
      onOpenChange={() => router.push(routes.superadmin["special-tours"].root)}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="mr-4 text-right">افزودن شهر</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <ScrollArea className="h-96 overflow-y-auto p-5" dir="rtl">
                <FormField
                  control={control}
                  name="tour_id"
                  render={({ field }) => (
                    <FormItem className="col-span-3 lg:col-span-1">
                      <FormLabel>نام تور</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          autoComplete="off"
                          value={data.tour.title}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dates"
                  render={() => (
                    <FormItem className="flex flex-col gap-1">
                      <div>
                        <FormLabel>تاریخ ها</FormLabel>
                      </div>
                      {isLoading ? (
                        <div>
                          <Loader
                            size={18}
                            className="mx-auto animate-spin text-primary"
                          />
                        </div>
                      ) : (
                        datesData.length > 0 &&
                        datesData.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="dates"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className={cn(
                                    "flex items-center gap-2",
                                    item.expired && "text-red-primary",
                                  )}
                                >
                                  <FormControl>
                                    <Checkbox
                                      disabled={item.expired}
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    از {farsiNumber(jaliliDate(item.start))} تا
                                    {"  "}
                                    {farsiNumber(jaliliDate(item.end))}{" "}
                                    {item.expired && "منقضی شده"}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="importance"
                  render={({ field }) => (
                    <FormItem className="col-span-3 lg:col-span-1">
                      <FormLabel>اولویت</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          autoComplete="off"
                          placeholder="بین ۱ تا ۲۵۵"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="advertisement"
                  render={({ field }) => (
                    <FormItem className="col-span-3 lg:col-span-1">
                      <FormLabel>توضیحات</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="توضیحات الزامی میباشد"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem className="col-span-3 lg:col-span-1">
                      <FormLabel>تصویر</FormLabel>
                      <FormControl>
                        <Dropzone
                          maxSize={1024 * 1024 * 1}
                          maxFiles={10}
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
                                  <span>آپلود تصویر</span>
                                  <span className="mt-2 text-xs">
                                    برای انتخاب تصویر کلیک کنید و یا تصویر خود
                                    را داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                                  </span>
                                  <Upload
                                    size={60}
                                    className="mt-2 text-primary"
                                  />
                                </div>
                              </div>
                              {data.photo && (
                                <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                  <span>عکس فعلی:</span>
                                  <Image
                                    src={data.photo}
                                    className="aspect-video w-32 rounded-lg"
                                    width={240}
                                    height={160}
                                    alt="product"
                                  />
                                </div>
                              )}
                              {getValues("photo") && (
                                <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                  <span>عکس جدید:</span>
                                  <div className="relative">
                                    <Image
                                      src={URL.createObjectURL(
                                        getValues("photo").file,
                                      )}
                                      className="aspect-video w-32 rounded-lg"
                                      width={240}
                                      height={160}
                                      alt="product"
                                    />
                                    <div className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-red-primary p-1 text-white">
                                      <Trash2
                                        className=""
                                        size={16}
                                        strokeWidth={1.5}
                                        onClick={() =>
                                          setValue("photo", null, {
                                            shouldValidate: true,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </section>
                          )}
                        </Dropzone>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SubmitButton className="mt-3 w-16" loading={isSubmitting}>
                  ارسال
                </SubmitButton>
              </ScrollArea>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddForm;
