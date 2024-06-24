"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeftRight, Search } from "lucide-react";
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
import { useEffect } from "react";

const FlightSearch = ({ currentSearchParams }) => {
  console.log("currentSearchParams", currentSearchParams);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { from, to, date } = currentSearchParams;

  const form = useForm({
    defaultValues: {
      from,
      to,
      date: date ? new Date(date) : new Date(),
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

    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      date: values.date ? baseDateForm(values.date) : null,
      from: values.from,
      to: values.to,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  const changeCities = () => {
    const current = qs.parse(searchParams.toString());
    console.log("getValues", getValues("from"));
    const query = {
      ...current,
      date: current.date ? baseDateForm(new Date(current.date)) : null,
      from: current.to,
      to: current.from,
    };

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
    <div className="mx-auto flex w-[95%] -translate-y-20 rounded-lg bg-yellow-light md:w-5/6 lg:w-4/5 xl:w-2/3">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2 pl-2"
        >
          <div className="flex w-full gap-2 px-8 py-6 text-muted-foreground">
            <FormField
              control={control}
              name="from"
              render={({ field }) => (
                <FormItem className="col-span-3 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel>مبدا</FormLabel>
                  <FormControl>
                    <SearchableSelect
                      changeValue={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={currentSearchParams.from}
                      api={"/api/airports"}
                      query="name"
                      keyValue="IATA_code"
                      placeholder={"مبدا"}
                      // searchable={true}
                      changable={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              onClick={() => {
                setValue("from", getValues("to"));
                // setValue("to", getValues("from"));
                changeCities();
              }}
              className="mt-6 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white p-2 transition-all duration-100 hover:bg-primary hover:text-white"
            >
              <ArrowLeftRight size={18} />
            </div>

            <FormField
              control={control}
              name="to"
              render={({ field }) => (
                <FormItem className="col-span-3 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel>مقصد</FormLabel>
                  <FormControl>
                    <SearchableSelect
                      changeValue={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={currentSearchParams.to}
                      api={"/api/airports"}
                      query="name"
                      keyValue="IATA_code"
                      placeholder={"مقصد"}
                      // searchable={true}
                      changable={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="date"
              render={({ field }) => (
                <FormItem className="col-span-3 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel>تاریخ رفت</FormLabel>
                  <FormControl>
                    <DatePicker
                      className="yellow"
                      value={getValues("date")}
                      onChange={(date) => {
                        date?.isValid ? setValue("date", new Date(date)) : "";
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
            {/* <FormField
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
            /> */}
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

export default FlightSearch;
