"use client";

import { useCallback, useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Upload, X } from "lucide-react";
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

import { addFileSchema, enAddFileSchema } from "@/lib/validation/tour/add-file";
import Dropzone from "react-dropzone";
import { CSRFToken, axios } from "@/lib/axios";
import ToastError from "../toast/toast-error";
import { toast } from "sonner";

const AddPassengerFile = ({ data }) => {
  const dictionary = useDictionary();

  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsmounted] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? addFileSchema : enAddFileSchema,
    ),
    defaultValues: {
      title: "",
      file: { path: null },
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
    console.log("values", values);

    const formData = new FormData();

    if (values.file.path === null) {
      toast.error("انتخاب فایل الزامی میباشد");
    }

    formData.append(`${values.title}`, values.file);

    await CSRFToken();

    await axios
      .post(`/api/agency/reservation/${data.id}/files`, formData)
      .then((uploadResponse) => {
        console.log("uploadResponse", uploadResponse);
        toast.success("آپلود فایل با موفقیت انجام شد");
        setIsOpen(false);
        reset();
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
      .finally(() => {});
  };

  const onDrop = useCallback(
    (files) =>
      files.map((file) => {
        setValue("file", file, {
          shouldValidate: true,
        });
      }),
    [getValues("file")],
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Button className="h-8 text-xs" onClick={() => setIsOpen(true)}>
        افزودن مدرک
      </Button>
      <Modal
        title={"افزودن مدارک"}
        description={"افزودن مدارک تور"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-3 lg:col-span-1">
                      <FormLabel>عنوان</FormLabel>
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
                  name="file"
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
                                  <span>آپلود تصاویر</span>
                                  <span className="mt-2 text-xs">
                                    برای انتخاب تصاویر کلیک کنید و یا تصاویر خود
                                    را داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                                  </span>
                                  <Upload
                                    size={60}
                                    className="mt-2 text-primary"
                                  />
                                </div>
                              </div>
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                {getValues("file").path}
                              </div>
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
                    loading={isSubmitting}
                    variant="destructive"
                    className="flex h-8 w-24 items-center justify-center gap-2"
                  >
                    افزودن
                  </SubmitButton>

                  <Button
                    type="button"
                    disabled={isSubmitting}
                    variant="outline"
                    onClick={() => setIsOpen(false)}
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
    </div>
  );
};

export default AddPassengerFile;
