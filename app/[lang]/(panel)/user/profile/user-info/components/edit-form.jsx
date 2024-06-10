"use client";

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
import { CSRFToken, axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  enUserProfileSchema,
  userProfileSchema,
} from "@/lib/validation/user-info";

const EditForm = ({ data }) => {
  const dictionary = useDictionary();

  const mount = useMount();
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? userProfileSchema : enUserProfileSchema,
    ),
    defaultValues: {
      first_name_fa: data.first_name_fa,
      last_name_fa: data.last_name_fa,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      national_code: data.national_code,
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    console.log("values", values);

    const { first_name_fa, last_name_fa, gender, email, phone, national_code } =
      values;

    const encodedFormData = querystring.stringify({
      first_name_fa,
      last_name_fa,
      gender,
      email,
      phone,
      national_code,
    });

    await CSRFToken();

    await axios
      .put("/api/user/info", encodedFormData)
      .then((response) => {
        if (response.status === 204) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"اطلاعات کاربری با موفقیت ویرایش شد"}</span>
            </div>,
          );
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
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <FormField
              control={control}
              name="first_name_fa"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input
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
              name="last_name_fa"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input
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
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl>
                    <Input
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
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>شماره تماس</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="۰۹" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-primary" />
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
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 rounded-lg bg-white px-2">
                  <FormLabel className="mt-5">جنسیت : </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-2"
                    >
                      <FormItem className="flex items-center gap-1">
                        <FormLabel className="mt-2 font-normal">مرد</FormLabel>
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center gap-1">
                        <FormLabel className="mt-2 font-normal">زن</FormLabel>
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
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
  );
};

export default EditForm;
