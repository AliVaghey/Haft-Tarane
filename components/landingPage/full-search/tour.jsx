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
import SearchableSelect from "@/components/ui/searchable-select";
import { Button } from "@/components/ui/button";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/yellow.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import qs from "query-string";
import { routes } from "@/routes/routes";
import Image from "next/image";
import { calendar, mapPin } from "@/constants/icons";
import { baseDateForm } from "@/lib/date-form";

const Tour = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      origin: "",
      destination: "",
      start: null,
      end: null,
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

    for (var propName in values) {
      if (
        values[propName] === null ||
        values[propName] === undefined ||
        values[propName] === ""
      ) {
        delete values[propName];
      }
    }

    const { start, end, origin, destination } = values;
    const page = +searchParams.get("page") || 1;

    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      start: baseDateForm(start),
      end: baseDateForm(end),
      origin,
      destination,
    };

    console.log("query", query);

    if (current["page"] === page) {
      query["page"] = null;
    }

    if (origin || destination || start || end) {
      query["all"] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href + routes.tours.root,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2 pl-0 lg:flex-row lg:pl-2"
        >
          <div className="flex h-full w-full flex-col gap-4 px-4 py-6 lg:flex-row lg:gap-3">
            <FormField
              control={control}
              name="end"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col gap-1">
                  <FormLabel className="flex items-center justify-end gap-1">
                    <span>
                      <Image
                        src={calendar}
                        width={100}
                        height={100}
                        alt="icon"
                        className="h-4 w-4"
                      />
                    </span>
                    <span>تاریخ برگشت</span>
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      className="yellow"
                      placeholder="انتخاب تاریخ"
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

            <FormField
              control={control}
              name="start"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col gap-1">
                  <FormLabel className="flex items-center justify-end gap-1">
                    <span>
                      <Image
                        src={calendar}
                        width={100}
                        height={100}
                        alt="icon"
                        className="h-4 w-4"
                      />
                    </span>
                    <span>تاریخ رفت</span>
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      className="yellow"
                      placeholder="انتخاب تاریخ"
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
              name="destination"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col gap-1">
                  <FormLabel className="flex items-center justify-end gap-1">
                    <span>
                      <Image
                        src={mapPin}
                        width={100}
                        height={100}
                        alt="icon"
                        className="h-4 w-4"
                      />
                    </span>
                    <span>مقصد</span>
                  </FormLabel>
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
              name="origin"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col gap-1">
                  <FormLabel className="flex items-center justify-end gap-1">
                    <span>
                      <Image
                        src={mapPin}
                        width={100}
                        height={100}
                        alt="icon"
                        className="h-4 w-4"
                      />
                    </span>
                    <span>مبدا</span>
                  </FormLabel>
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
          </div>
          <Button className="flex h-auto flex-col gap-1 rounded-none bg-gray-dark px-10 text-white hover:bg-gray-dark/95">
            <span>
              <Search size={18} />
            </span>
            <span className="text-base">جستجو</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Tour;
