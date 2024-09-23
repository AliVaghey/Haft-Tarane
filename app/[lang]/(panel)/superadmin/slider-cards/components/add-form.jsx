"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { routes } from "@/routes/routes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, Upload } from "lucide-react";
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
import Image from "next/image";
import Dropzone from "react-dropzone";
import { useCallback } from "react";
import {
  enSliderCardSchema,
  sliderCardSchema,
} from "@/lib/validation/admin/slider-card";

const AddForm = () => {
  const dictionary = useDictionary();

  const mount = useMount();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? sliderCardSchema : enSliderCardSchema,
    ),
    defaultValues: {
      link: "",
      description: "",
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

    formData.append("link", values.link);
    formData.append("description", values.description);
    if (values.photo) {
      formData.append(`photo`, values.photo.file);
    }

    await CSRFToken();

    await axios
      .post(`api/admin/slider-cards`, formData)
      .then((response) => {
        if (response.status === 201) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"اسلاید جدید با موفقیت اضافه شد"}</span>
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
                <FormMessage />
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
                              برای انتخاب تصویر کلیک کنید و یا تصویر خود را داخل
                              کادر بکشید (حداکثر با حجم ۱ مگابایت)
                            </span>
                            <Upload size={60} className="mt-2 text-primary" />
                          </div>
                        </div>
                        {getValues("photo") && (
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            <Image
                              src={URL.createObjectURL(getValues("photo").file)}
                              className="aspect-video w-32 rounded-lg"
                              width={240}
                              height={160}
                              alt="product"
                            />
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
        </form>
      </Form>
    </div>
  );
};

export default AddForm;
