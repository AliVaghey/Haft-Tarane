"use client";

import { useCallback, useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Upload } from "lucide-react";
import { useDictionary } from "@/providers/dictionary-provider";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import Dropzone from "react-dropzone";
import {
  enReciptSchema,
  reciptSchema,
} from "@/lib/validation/accounting/recipt";
import Image from "next/image";
import { persianPriceFormat } from "@/lib/persian-price-format";

const AdminPayDialog = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  dates,
  payData,
}) => {
  const dictionary = useDictionary();

  const [isMounted, setIsmounted] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? reciptSchema : enReciptSchema,
    ),
    defaultValues: {
      start: dates ? dates.start : undefined,
      end: dates ? dates.end : undefined,
      recipt: null,
      description: "",
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    setIsmounted(true);
  }, []);

  const onSubmit = async (values) => {
    onConfirm(values);
  };

  const onDrop = useCallback(
    (files) =>
      files.map((file) => {
        setValue(
          "recipt",
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
    [getValues("recipt")],
  );

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description=""
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <div>
        <div className="w-full">
          <div className="flex w-full flex-col gap-2 text-xs font-semibold">
            <div className="flex gap-2">
              <span>قیمت کل :</span>
              <span>{persianPriceFormat(payData?.total)} تومان</span>
            </div>

            <div className="flex gap-2">
              <span>سود بی باک سفر :</span>
              <span>{persianPriceFormat(payData?.profit)} تومان</span>
            </div>

            <div className="flex gap-2">
              <span>بدهی آژانس :</span>
              <span>{persianPriceFormat(payData?.debt)} تومان</span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={control}
                name="start"
                render={({ field }) => (
                  <FormItem className="col-span-3 hidden lg:col-span-1">
                    <FormControl>
                      <Input
                        className="rounded-2xl focus-visible:ring-primary"
                        autoComplete="off"
                        placeholder=""
                        {...field}
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
                  <FormItem className="col-span-3 hidden lg:col-span-1">
                    <FormControl>
                      <Input
                        className="rounded-2xl focus-visible:ring-primary"
                        autoComplete="off"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-3 mt-2 lg:col-span-1">
                    <FormLabel>توضیحات</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-2xl focus-visible:ring-primary"
                        autoComplete="off"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="recipt"
                render={({ field }) => (
                  <FormItem className="mt-5 w-full">
                    <FormControl>
                      <Dropzone
                        maxSize={1024 * 1024 * 5}
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
                                <span>آپلود رسید</span>
                                <span className="mt-2 text-xs">
                                  برای انتخاب رسید کلیک کنید و یا فایل خود را
                                  داخل کادر بکشید (حداکثر با حجم ۵ مگابایت)
                                </span>
                                <Upload
                                  size={60}
                                  className="mt-2 text-primary"
                                />
                              </div>
                            </div>
                            {getValues("recipt") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                {getValues("recipt")?.type ===
                                  "application/pdf" && (
                                  <span>{getValues("recipt")?.name}</span>
                                )}

                                {getValues("recipt")?.type.startsWith(
                                  "image/",
                                ) && (
                                  <Image
                                    src={URL.createObjectURL(
                                      getValues("recipt").file,
                                    )}
                                    className="aspect-video w-32 rounded-lg"
                                    width={240}
                                    height={160}
                                    alt="reciept"
                                  />
                                )}
                              </div>
                            )}
                          </section>
                        )}
                      </Dropzone>
                    </FormControl>
                    <FormMessage className="text-primary" />
                  </FormItem>
                )}
              />

              <div className="mr-2 flex w-full items-center justify-center gap-3 space-x-2 pt-6">
                <SubmitButton
                  loading={loading}
                  className="flex h-8 w-24 items-center justify-center gap-2 bg-green-500 hover:bg-green-600"
                >
                  پرداخت
                </SubmitButton>

                <Button
                  type="button"
                  disabled={loading}
                  variant="outline"
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                  className="h-8 w-24"
                >
                  لغو
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AdminPayDialog;
