"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import SearchableSelect from "@/components/ui/searchable-select";
import { Button } from "@/components/ui/button";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/yellow.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import qs from "query-string";
import { routes } from "@/routes/routes";
import { baseDateForm } from "@/lib/date-form";

const HotelSearch = ({ currentSearchParams }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pathname = usePathname();

  const { page, all, origin, destination, start, end } = currentSearchParams;

  const form = useForm({
    defaultValues: {
      origin,
      destination,
      start: start ? new Date(start) : null,
      end: end ? new Date(end) : null,
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

  const onSubmit = async (values) => {
    for (var propName in values) {
      if (
        values[propName] === null ||
        values[propName] === undefined ||
        values[propName] === ""
      ) {
        delete values[propName];
      }
    }

    const page = +searchParams.get("page") || 1;

    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      start: values.start ? baseDateForm(values.start) : null,
      end: values.end ? baseDateForm(values.end) : null,
      origin: values.origin,
      destination: values.destination,
    };

    console.log("query", query);

    if (current["page"] === page) {
      query["page"] = null;
    }

    if (values.origin || values.destination || values.start || values.end) {
      query["all"] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="mx-auto -mt-5 flex w-full rounded-lg bg-yellow-light">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2 pl-2"
        >
          <div className="flex w-full gap-2 px-8 py-6 text-muted-foreground">
            <FormField
              control={control}
              name="origin"
              render={({ field }) => (
                <FormItem className="col-span-3 hidden flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel>مبدا</FormLabel>
                  <FormControl>
                    <SearchableSelect
                      changeValue={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                      api={
                        pathname.startsWith("/fa/tours")
                          ? "/api/tour-origin"
                          : "/api/cities"
                      }
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
                <FormItem className="col-span-3 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel>شهر</FormLabel>
                  <FormControl>
                    <SearchableSelect
                      changeValue={(value) => {
                        field.onChange(value);
                        setValue("origin", value);
                      }}
                      defaultValue={field.value}
                      api={"/api/hotel-cities"}
                      query="name"
                      placeholder={"شهر"}
                      searchable={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="start"
              render={({ field }) => (
                <FormItem className="col-span-3 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel>تاریخ شروع</FormLabel>
                  <FormControl>
                    <DatePicker
                      className="yellow"
                      value={getValues("start")}
                      onChange={(date) => {
                        date?.isValid ? setValue("start", new Date(date)) : "";
                      }}
                      format={false ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      minDate={new Date()}
                      style={{
                        width: "100%",
                        paddingTop: "19px",
                        paddingBottom: "19px",
                        borderColor: "rgb(226 232 240)",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="end"
              render={({ field }) => (
                <FormItem className="col-span-3 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel>تاریخ پایان</FormLabel>
                  <FormControl>
                    <DatePicker
                      className="yellow"
                      value={getValues("end")}
                      onChange={(date) => {
                        date?.isValid ? setValue("end", new Date(date)) : "";
                      }}
                      format={false ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      minDate={new Date()}
                      style={{
                        width: "100%",
                        paddingTop: "19px",
                        paddingBottom: "19px",
                        borderColor: "rgb(226 232 240)",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end gap-2 p-2">
            <SubmitButton className="w-fit" loading={isSubmitting}>
              جستجو...
              <Search />
            </SubmitButton>
            <Button
              type="button"
              onClick={() => {
                reset();
                router.push(routes.tours.root);
              }}
              className="w-fit"
            >
              حذف فیلتر ها
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HotelSearch;
