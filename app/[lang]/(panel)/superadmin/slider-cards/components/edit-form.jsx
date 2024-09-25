"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { routes } from "@/routes/routes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, Trash2, Upload } from "lucide-react";
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
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { useCallback } from "react";
import {
  editSliderCardSchema,
  enEditSliderCardSchema,
} from "@/lib/validation/admin/slider-card";

const EditForm = ({ data }) => {
  const dictionary = useDictionary();

  const mount = useMount();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa"
        ? editSliderCardSchema
        : enEditSliderCardSchema,
    ),
    defaultValues: {
      link: !data?.link ? "" : data?.link,
      description: !data?.description ? "" : data?.description,
      description_color: data?.description_color,
      photo: null,
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
    console.log("values", values);

    const formData = new FormData();

    if (values.link) {
      formData.append("link", values.link);
    }
    if (values.description) {
      formData.append("description", values.description);
    }
    if (values.photo) {
      formData.append(`photo`, values.photo.file);
    }
    formData.append("description_color", values.description_color);

    await CSRFToken();

    await axios
      .post(`api/admin/slider-cards/${data.id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"اسلاید با موفقیت ویرایش شد"}</span>
            </div>,
          );

          router.push(routes.superadmin["slider-cards"].root);
          router.refresh();
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
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <FormField
            control={control}
            name="link"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>لینک</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="حداقل ۴ کاراکتر"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
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
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description_color"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>رنگ متن</FormLabel>
                <FormControl>
                  <Input type="color" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
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
                              برای انتخاب تصویر کلیک کنید و یا تصویر خود را داخل
                              کادر بکشید (حداکثر با حجم ۱ مگابایت)
                            </span>
                            <Upload size={60} className="mt-2 text-primary" />
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                          {data.photo && (
                            <div className="mt-3 flex flex-col flex-wrap items-center justify-center gap-3">
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
                            <div className="mt-3 flex flex-col flex-wrap items-center justify-center gap-3">
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
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <SubmitButton className="mt-3 w-16" loading={isSubmitting}>
            ویرایش
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
