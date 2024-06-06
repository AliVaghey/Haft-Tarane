"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import qs from "query-string";
import { routes } from "@/routes/routes";
import { baseDateForm } from "@/lib/date-form";

const TourSearch = ({ currentSearchParams }) => {
  console.log("currentSearchParams", currentSearchParams);
  const searchParams = useSearchParams();
  const router = useRouter();

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
    console.log("values", values);

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
    <div className="mx-auto flex w-full -translate-y-20 rounded-lg bg-yellow-light md:w-4/5 lg:w-2/3">
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
                <FormItem className="col-span-3 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
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
                <FormItem className="col-span-3 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
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
              name="start"
              render={({ field }) => (
                <FormItem className="col-span-3 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel>تاریخ شروع</FormLabel>
                  <FormControl>
                    <DatePicker
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

export default TourSearch;
