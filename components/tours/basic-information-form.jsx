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
import { citySchema, enCitySchema } from "@/lib/validation/auth/city";
import { CSRFToken, axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import ChipInput from "@/components/ui/chip-input";
import {
  basicInformationSchema,
  enBasicInformationSchema,
} from "@/lib/validation/tour/basic-information";
import { Checkbox } from "../ui/checkbox";
import SearchableSelect from "../ui/searchable-select";

const BasicInformationForm = () => {
  const dictionary = useDictionary();
  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa"
        ? basicInformationSchema
        : enBasicInformationSchema,
    ),
    defaultValues: {
      title: "",
      trip_type: "",
      expiration: "",
      selling_type: "",
      tour_styles: [],
      capacity: "",
      evening_support: false,
      midnight_support: false,
      origin: "",
      destination: "",
      staying_nights: "",
      transportation_type: "",
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
    console.log("valuesssssss", values);
  };

  if (!mount) {
    return null;
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-2 lg:grid-cols-2"
        >
          <FormField
            control={control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="col-span-3 text-right lg:col-span-1">
                <FormLabel>دسته بندی</FormLabel>
                <SearchableSelect
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  api={"/api/agency/hotels"}
                  placeholder={"kkkkkkk"}
                />

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>نام شهر</FormLabel>
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
            name="trip_type"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>نام شهر</FormLabel>
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
            name="origin"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>نام شهر</FormLabel>
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
            name="destination"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>نام شهر</FormLabel>
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
            name="selling_type"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>نام شهر</FormLabel>
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
            type="number"
            name="staying_nights"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>نام شهر</FormLabel>
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
            type="number"
            name="capacity"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>نام شهر</FormLabel>
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
            type="number"
            name="expiration"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>نام شهر</FormLabel>
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

          <div className="flex items-center justify-center gap-3 rounded-lg border p-2">
            <FormField
              control={form.control}
              name="evening_support"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="pb-2">
                    <FormLabel className="cursor-pointer">
                      پشتیبانی شبانه
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="midnight_support"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="pb-2">
                    <FormLabel className="cursor-pointer">
                      پشتیبانی نیمه شب
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="tour_styles"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>نام شهر</FormLabel>
                <FormControl>
                  <ChipInput
                    initialData={getValues("tour_styles")}
                    placeholder="تگ ها"
                    onChange={(data) => {
                      field.onChange(data);
                      // setValue("tour_styles", data, {
                      //   shouldValidate: true,
                      // });
                    }}
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
  );
};

export default BasicInformationForm;
