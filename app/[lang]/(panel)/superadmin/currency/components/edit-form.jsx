"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { routes } from "@/routes/routes";
import { usePathname, useRouter } from "next/navigation";
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
import { toast } from "sonner";
import { axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import {
  adminHotelSchema,
  enAdminHotelSchema,
} from "@/lib/validation/auth/hotel";
import { Separator } from "@/components/ui/separator";
import { Upload } from "lucide-react";
import Image from "next/image";
import { X } from "lucide-react";
import Dropzone from "react-dropzone";
import { useCallback, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const AddForm = ({ data }) => {
  const dictionary = useDictionary();

  const mount = useMount();
  const router = useRouter();

  let imageobject = data.gallery;
  let imagesArray = [];

  for (var propName in imageobject) {
    imagesArray.push({
      id: propName,
      url: imageobject[propName],
    });
  }

  const [gallery, setGallery] = useState(imagesArray);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? adminHotelSchema : enAdminHotelSchema,
    ),
    defaultValues: {
      name: data.name,
      address: data.address,
      country: data.country,
      state: data.state,
      city: data.city,
      stars: data.stars,
      images: [],
    },
    mode: "onSubmit",
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    getValues,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const { images } = values;

    const encodedFormData = querystring.stringify({
      name: values.name,
      address: values.address,
      country: values.country,
      state: values.state,
      city: values.city,
      stars: values.stars,
    });

    

    await axios
      .put(`/api/admin/hotel/${data.id}`, encodedFormData)
      .then(async (response) => {
        if (response.status === 204) {
          await uploadingImages(data.id, images);
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

  const uploadingImages = async (id, images) => {
    const formData = new FormData();

    images.map((img, index) => {
      formData.append(`photo_${index}`, img.file);
    });

    

    const doUpload = async () => {
      return new Promise(async (resolve) => {
        await axios
          .post(`/api/admin/hotel/${id}/photos`, formData)
          .then((uploadResponse) => {
            resolve("آپلود تصاویر با موفقیت انجام شد");
          })
          .catch((uploadError) => {
            resolve("آپلود تصاویر انجام نشد");
          })
          .finally(() => {});
      });
    };

    toast.promise(doUpload, {
      loading: "هتل با موفقیت ویرایش شد. در حال آپلود تصاویر...",
      success: () => {
        router.push(routes.superadmin["your-hotels"].root);
        router.refresh();
        return "تصاویر با موفقیت آپلود شدند";
      },
      error: "مشکلی پیش آمده است. تصاویر آپلود نشدند",
    });
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

  const deleteImage = async (imageId) => {
    try {
      setDeleteLoading(true);

      

      const response = await axios.delete(
        `/api/admin/hotel/${data.id}/photo/${imageId}`,
      );

      if (response.status === 204) {
        router.refresh();
        const newImageArray = gallery.filter((item) => item.id !== imageId);
        setGallery(newImageArray);
        toast.success(
          <div className="flex items-center gap-2">
            <span>
              <CircleCheckBig className="text-green-600" />
            </span>
            <span>{"تصویر مورد نظر حذف شد"}</span>
          </div>,
        );
      }
      if (response.status === 200) {
        toast.error(
          <div className="flex items-center gap-2">
            <span>
              <CircleAlert className="text-primary" />
            </span>
            <span>{response.message}</span>
          </div>,
        );
      }
    } catch (error) {
      toast.error("مشکلی پیش آمده است. لطفا مجددا تلاش فرمایید");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (!mount) {
    return null;
  }

  return (
    <div className="mx-auto w-full">
      <div className="mx-auto flex w-full items-center gap-3 md:w-2/3 lg:w-1/3">
        <Separator className="h-0.5 flex-1 bg-red-dark" />
        <span className="text-xl">ویرایش هتل</span>
        <Separator className="h-0.5 flex-1 bg-red-dark" />
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          <div className="flex flex-col gap-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel className="text-muted-foreground">
                    نام هتل
                  </FormLabel>
                  <FormControl>
                    {/* <Input
                      className="rounded-lg shadow-lg"
                      autoComplete="off"
                      placeholder="حداقل ۲ کاراکتر"
                      {...field}
                    /> */}
                    <Textarea
                      placeholder="حداقل ۲ کاراکتر"
                      className="h-16 resize-y focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-primary" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel className="text-muted-foreground">آدرس</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-lg shadow-lg"
                      autoComplete="off"
                      placeholder="حداقل ۵ کاراکتر"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-primary" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel className="text-muted-foreground">کشور</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-lg shadow-lg"
                      autoComplete="off"
                      placeholder="حداقل ۲ کاراکتر"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-primary" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="state"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel className="text-muted-foreground">استان</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-lg shadow-lg"
                      autoComplete="off"
                      placeholder="حداقل ۲ کاراکتر"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-primary" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel className="text-muted-foreground">شهر</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-lg shadow-lg"
                      autoComplete="off"
                      placeholder="حداقل ۲ کاراکتر"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-primary" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="stars"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>ستاره هتل</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="off"
                      placeholder="بین ۱ تا ۵"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-primary" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="images"
            render={({ field }) => (
              <FormItem className="mt-5 w-full">
                {gallery.length > 0 && <h1>تصاویر فعلی :</h1>}

                <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                  {gallery.map((img, index) => (
                    <div className="relative rounded-lg" key={index}>
                      <Image
                        src={img.url}
                        className="aspect-video w-32 rounded-lg"
                        width={240}
                        height={160}
                        alt="product"
                      />
                      <div
                        onClick={() => {
                          if (!deleteLoading) {
                            deleteImage(img.id);
                          }
                        }}
                        className={cn(
                          "absolute -left-2 -top-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-primary",
                          deleteLoading && "bg-primary/70",
                        )}
                      >
                        {deleteLoading ? (
                          <Loader2Icon
                            size={16}
                            className="animate-spin text-white"
                          />
                        ) : (
                          <X size={16} className="text-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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
                            <span>آپلود تصاویر</span>
                            <span className="mt-2 text-xs">
                              برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                              داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                            </span>
                            <Upload size={60} className="mt-2 text-primary" />
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                          {getValues("images").map((img, index) => (
                            <div className="relative rounded-lg" key={index}>
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
                                      (imgItem, imgIndex) => imgIndex !== index,
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

          <div className="flex w-full items-center justify-center">
            <SubmitButton
              className="mt-3 w-24 bg-gradient-to-r from-primary to-yellow-light transition-all duration-200 hover:shadow-lg"
              loading={isSubmitting}
            >
              ویرایش
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddForm;
