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
import { bannerSchema, enBannerSchema } from "@/lib/validation/admin/banner";

const EditForm = ({ data }) => {
  const dictionary = useDictionary();
  console.log("datauuuuuuuu", data);

  const mount = useMount();
  const pathname = usePathname();
  const router = useRouter();

  const isAddPage = pathname.endsWith(routes.superadmin.banners.edit(data?.id));

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? bannerSchema : enBannerSchema,
    ),
    defaultValues: {
      sort: data?.sort,
      link: data?.link,
      description: data?.description,
      text_color: data?.text_color,
      background_color: data?.background_color,
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
    const { sort, link, description, text_color, background_color } = values;

    const encodedFormData = querystring.stringify({
      sort,
      link,
      description,
      text_color,
      background_color,
    });

    await CSRFToken();

    await axios
      .put(`/api/admin/banner/${data.id}`, encodedFormData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"بنر با موفقیت ویرایش شد"}</span>
            </div>,
          );

          router.push(routes.superadmin.banners.root);
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

  if (!mount) {
    return null;
  }

  return (
    <Dialog
      open={isAddPage}
      onOpenChange={() => router.push(routes.superadmin.banners.root)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mr-4 text-right">افزودن بنر</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
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
                name="sort"
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
                name="text_color"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>رنگ متن</FormLabel>
                    <FormControl>
                      <Input
                        type="color"
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
                name="background_color"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>رنگ پس زمینه</FormLabel>
                    <FormControl>
                      <Input
                        type="color"
                        autoComplete="off"
                        placeholder="توضیحات الزامی میباشد"
                        {...field}
                      />
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
      </DialogContent>
    </Dialog>
  );
};

export default EditForm;
