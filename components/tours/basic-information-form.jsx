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
import { axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
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
import Link from "next/link";
import { Button } from "../ui/button";
import ChipSearchableSelect from "../ui/chip-searchable-select";

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
          tour_styles: data.tour_styles ? data.tour_styles : [],
          capacity: data.capacity,
          evening_support: data.evening_support,
          midnight_support: data.midnight_support,
          origin: data.origin,
          destination: data.destination,
          staying_nights: data.staying_nights,
          transportation_type: data.transportation_type,
          support: data.support ? String(data.support.id) : "",
          labels: data.labels ? data.labels : [],
        }
      : {
          title: "",
          trip_type: "",
          expiration: "",
          selling_type: "نقدی",
          tour_styles: [],
          capacity: "",
          evening_support: false,
          midnight_support: false,
          origin: "",
          destination: "",
          staying_nights: "",
          transportation_type: "",
          support: "",
          labels: [],
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
      support,
      labels,
    } = values;

    

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
      support,
      labels: JSON.stringify(labels),
    });

    if (data) {
      await axios
        .put(`/api/agency/tour/${data.id}`, encodedFormData)
        .then(async (response) => {

          if (response.status === 204) {
            tourHook.setFlag(!tourHook.flag);
            toast.success(
              <ToastSuccess text={"اطلاعات اصلی  با موفقیت ویرایش شدند"} />,
            );
            router.push(routes.agency.tours.edit["travel-plans"](data.id));
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
    } else {
      await axios
        .post("/api/agency/tour", encodedFormData)
        .then((response) => {

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
                    searchable={true}
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
                    searchable={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="support"
            render={({ field }) => (
              <FormItem className="col-span-3 text-right lg:col-span-1">
                <FormLabel>نام پشتیبان</FormLabel>
                <FormControl>
                  <SearchableSelect
                    changeValue={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={getValues("support")}
                    api={"/api/agency/supports"}
                    query="name"
                    keyValue="id"
                    placeholder={"نام پشتیبان"}
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="داخلی">داخلی</SelectItem>
                    <SelectItem value="خارجی">خارجی</SelectItem>
                    <SelectItem value="طبیعت گردی">طبیعت گردی</SelectItem>
                  </SelectContent>
                </Select>
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
                  {/* <Input
                    className=""
                    autoComplete="off"
                    placeholder="نوع پرداخت"
                    {...field}
                  /> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب کنید" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="نقدی">نقدی</SelectItem>
                    </SelectContent>
                  </Select>
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
                <FormLabel>انقضا</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className=""
                    autoComplete="off"
                    placeholder="تعداد روزهایی که قبل از شروع تور ثبت نام متوقف میشود"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center justify-center gap-1 rounded-lg border p-2">
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
                      پشتیبانی شبانه (از ساعت ۲۰ تا ۲۴)
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
                      پشتیبانی نیمه شب (از ساعت ۲۴ تا ۸ صبح)
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
                  <ChipSearchableSelect
                    api={`/api/options?category=tour_styles`}
                    initialData={getValues("tour_styles")}
                    placeholder="امکانات"
                    query="name"
                    keyValue="value"
                    searchable={false}
                    onChange={(data) => {
                      setValue("tour_styles", data, { shouldValidate: true });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="labels"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>برچسب ها</FormLabel>
                <FormControl>
                  <ChipSearchableSelect
                    api={`/api/options?category=labels`}
                    initialData={getValues("labels")}
                    placeholder="برچسب ها"
                    query="name"
                    keyValue="value"
                    searchable={false}
                    onChange={(data) => {
                      setValue("labels", data, { shouldValidate: true });
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
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="system">سیستمی</SelectItem>
                    <SelectItem value="my_transportation">
                      حمل و نقل من
                    </SelectItem>
                    <SelectItem value="hotel">هتل</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-5 flex flex-col items-center justify-center gap-2 md:flex-row">
          <SubmitButton loading={isSubmitting}>
            {data ? "ذخیره" : "ارسال"}
          </SubmitButton>

          {data && (
            <Link href={routes.agency.tours.edit["travel-plans"](data.id)}>
              <Button
                type="button"
                variant="outline"
                className="border-primary"
              >
                بعدی
              </Button>
            </Link>
          )}
        </div>
      </form>
    </Form>
  );
};

export default BasicInformationForm;
