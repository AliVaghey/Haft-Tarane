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
import { citySchema, enCitySchema } from "@/lib/validation/auth/city";
import { CSRFToken, axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import {
  adminUserSchema,
  enadminUserSchema,
} from "@/lib/validation/auth/admin-user";

const EditForm = ({ data }) => {
  const dictionary = useDictionary();

  const mount = useMount();
  const pathname = usePathname();
  const router = useRouter();

  const isAddPage = pathname.endsWith(routes.admin.users.edit(data.id));

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? adminUserSchema : enadminUserSchema,
    ),
    defaultValues: {
      username: data.username,
      national_code: data.national_code,
      email: data.email,
      phone: data.phone,
      access_type: data.access_type,
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {

    const encodedFormData = querystring.stringify({
      username: values.username,
      national_code: values.national_code,
      email: values.email,
      phone: values.phone,
      access_type: values.access_type,
    });

    await CSRFToken();

    await axios
      .put(`/api/admin/user/${data.id}`, encodedFormData)
      .then((response) => {
        if (response.status === 204) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"کاربر با موفقیت ویرایش اضافه شد"}</span>
            </div>,
          );

          router.push(routes.admin.users.root);
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

  if (!mount) {
    return null;
  }

  return (
    <Dialog
      open={isAddPage}
      onOpenChange={() => router.push(routes.admin.users.root)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mr-4 text-right">ویرایش کاربر</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>نام و نام خانوادگی</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-2xl"
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>شماره تماس</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-2xl"
                        autoComplete="off"
                        placeholder="۰۹"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="national_code"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>کد ملی</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-2xl"
                        autoComplete="off"
                        placeholder="۱۰ رقم"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>ایمیل</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-2xl"
                        autoComplete="off"
                        placeholder="ایمیل"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton className="mt-3" loading={isSubmitting}>
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
