"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { routes } from "@/routes/routes";
import { useRouter } from "next/navigation";
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
import { Checkbox } from "@/components/ui/checkbox";
import SearchableSelect from "@/components/ui/searchable-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ToastSuccess from "@/components/toast/toast-success";
import { useTour } from "@/hooks/use-tour";

const BasicInformationForm = ({ data }) => {
  const tourHook = useTour();

  const dictionary = useDictionary();
  const mount = useMount();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa"
        ? basicInformationSchema
        : enBasicInformationSchema,
    ),
    defaultValues: data
      ? {
          title: data.title,
          trip_type: data.trip_type,
          expiration: data.expiration,
          selling_type: data.selling_type,
          tour_styles: data.tour_styles ? JSON.parse(data.tour_styles) : [],
          capacity: data.capacity,
          evening_support: data.evening_support,
          midnight_support: data.midnight_support,
          origin: data.origin,
          destination: data.destination,
          staying_nights: data.staying_nights,
          transportation_type: data.transportation_type,
        }
      : {
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
    console.log("valuesssssss", `{${values.tour_styles.join(",")}}`);
    const {
      title,
      trip_type,
      expiration,
      selling_type,
      tour_styles,
      capacity,
      evening_support,
      midnight_support,
      origin,
      destination,
      staying_nights,
      transportation_type,
    } = values;

    await CSRFToken();

    const encodedFormData = querystring.stringify({
      title,
      trip_type,
      expiration,
      selling_type,
      tour_styles: JSON.stringify(tour_styles),
      capacity,
      evening_support: evening_support ? "1" : "0",
      midnight_support: midnight_support ? "1" : "0",
      origin,
      destination,
      staying_nights,
      transportation_type,
    });

    if (data) {
      await axios
        .put(`/api/agency/tour/${data.id}`, encodedFormData)
        .then(async (response) => {
          console.log("edit-draft-response", response.data);

          if (response.status === 204) {
            tourHook.setFlag(!tourHook.flag);
            toast.success(
              <ToastSuccess text={"اطلاعات اصلی  با موفقیت ویرایش شدند"} />,
            );
            router.push(routes.agency.tours.edit["travel-plans"](data.id));
          }
        })
        .catch((error) => {
          console.log("edit-draft-error", error);
          toast.error(
            <ToastError
              text={
                error?.response?.data?.message ||
                defaultMessages.errors.internalError
              }
            />,
          );
        });
    } else {
      await axios
        .post("/api/agency/tour", encodedFormData)
        .then((response) => {
          console.log("draft-response", response.data);

          if (response.status === 201) {
            toast.success(
              <ToastSuccess text={"پیش نویس تور با موفقیت ایجاد شد"} />,
            );
            router.push(
              routes.agency.tours.edit["travel-plans"](response.data.data.id),
            );
          }
        })
        .catch((error) => {
          console.log("draft-error", error);
          toast.error(
            <ToastError
              text={
                error?.response?.data?.message ||
                defaultMessages.errors.internalError
              }
            />,
          );
        });
    }
  };

  if (!mount) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-5">
          <FormField
            control={control}
            name="origin"
            render={({ field }) => (
              <FormItem className="col-span-3 text-right lg:col-span-1">
                <FormLabel>مبدا</FormLabel>
                <FormControl>
                  <SearchableSelect
                    changeValue={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={getValues("origin")}
                    api={"/api/cities"}
                    query="name"
                    placeholder={"مبدا"}
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
              <FormItem className="col-span-3 text-right lg:col-span-1">
                <FormLabel>مقصد</FormLabel>
                <FormControl>
                  <SearchableSelect
                    changeValue={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={getValues("destination")}
                    api={"/api/cities"}
                    query="name"
                    placeholder={"مقصد"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="trip_type"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>نوع تور</FormLabel>
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
            name="selling_type"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>نوع پرداخت</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    autoComplete="off"
                    placeholder="نوع پرداخت"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="staying_nights"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>تعداد شب</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className=""
                    autoComplete="off"
                    placeholder="تعداد شب"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="capacity"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>ظرفیت</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className=""
                    autoComplete="off"
                    placeholder="ظرفیت"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="expiration"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>روز های باقی مانده</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className=""
                    autoComplete="off"
                    placeholder="روز های باقی مانده"
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
                <FormLabel>مدل های تور</FormLabel>
                <FormControl>
                  <ChipInput
                    initialData={getValues("tour_styles")}
                    placeholder="امکانات"
                    onChange={(data) => {
                      console.log("data", data);
                      setValue("tour_styles", data, { shouldValidate: true });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transportation_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع حمل و نقل</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع حمل و نقل" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="system">سیستم</SelectItem>
                    <SelectItem value="self">شخصی</SelectItem>
                    <SelectItem value="none">هیچ کدام</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <SubmitButton className="mt-3" loading={isSubmitting}>
          {data ? "ویرایش" : "ارسال"}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default BasicInformationForm;
