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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "@/components/submit-button";
import SearchableSelect from "@/components/ui/searchable-select";
import { Button } from "@/components/ui/button";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/yellow.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import qs from "query-string";
import { routes } from "@/routes/routes";
import Image from "next/image";
import { calendar, mapPin, user } from "@/constants/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { farsiNumber } from "@/lib/farsi-number";
import { baseDateForm } from "@/lib/date-form";

const DomesticFlight = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [totalPeople, setTotalPeople] = useState(1);
  const [peopleCount, setPeopleCount] = useState({
    adult: 1,
    child: 0,
    baby: 0,
  });

  useEffect(() => {
    const { adult, child, baby } = peopleCount;
    setTotalPeople(adult + child + baby);
  }, [peopleCount]);

  const handlePeopleCount = (op, key) => {
    if (key === "adult") {
      if (baby >= adult && op < 0) {
        setPeopleCount({
          ...peopleCount,
          [key]: peopleCount[key] + op,
          baby: peopleCount["baby"] + op,
        });
      } else {
        setPeopleCount({ ...peopleCount, [key]: peopleCount[key] + op });
      }
    } else {
      setPeopleCount({ ...peopleCount, [key]: peopleCount[key] + op });
    }
  };

  const form = useForm({
    defaultValues: {
      origin: "",
      destination: "",
      start: null,
      end: null,
      flightClass: "all",
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

    const { start, end, origin, destination, flightClass } = values;
    const page = +searchParams.get("page") || 1;

    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      start: baseDateForm(start),
      end: baseDateForm(end),
      origin,
      destination,
      flightClass,
      adult: adult === 0 ? null : adult,
      child: child === 0 ? null : child,
      baby: baby === 0 ? null : baby,
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
        url: window.location.href + routes.flights.root,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  const { adult, child, baby } = peopleCount;

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2 pl-0 lg:flex-row lg:pl-2"
        >
          <div className="flex h-full w-full flex-col gap-4 px-4 py-6 lg:flex-row lg:gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center justify-end gap-1">
                    <span>
                      <Image
                        src={user}
                        width={100}
                        height={100}
                        alt="icon"
                        className="h-4 w-4"
                      />
                    </span>
                    <span>تعداد مسافران</span>
                  </div>
                  <Button variant="outline" type="button">
                    تعداد مسافران {farsiNumber(totalPeople)} نفر
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent asChild>
                <div className="flex flex-col gap-5 px-5 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span>بزرگسال</span>
                      <span className="text-xs text-muted-foreground">
                        بالای ۱۲ سال
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        disabled={adult + child >= 9}
                        type="button"
                        className="h-5 w-5 rounded-full p-3"
                        onClick={() => handlePeopleCount(1, "adult")}
                      >
                        +
                      </Button>
                      <span>{farsiNumber(adult)}</span>
                      <Button
                        disabled={adult === 1}
                        type="button"
                        className="h-5 w-5 rounded-full p-3"
                        onClick={() => handlePeopleCount(-1, "adult")}
                      >
                        -
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span>کودک</span>
                      <span className="text-xs text-muted-foreground">
                        ۲ تا ۱۲ سال
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        disabled={adult + child >= 9}
                        type="button"
                        className="h-5 w-5 rounded-full p-3"
                        onClick={() => handlePeopleCount(1, "child")}
                      >
                        +
                      </Button>
                      <span>{farsiNumber(child)}</span>
                      <Button
                        disabled={child <= 0}
                        type="button"
                        className="h-5 w-5 rounded-full p-3"
                        onClick={() => handlePeopleCount(-1, "child")}
                      >
                        -
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span>نوزاد</span>
                      <span className="text-xs text-muted-foreground">
                        زیر ۲ سال
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        disabled={baby >= adult}
                        type="button"
                        className="h-5 w-5 rounded-full p-3"
                        onClick={() => handlePeopleCount(1, "baby")}
                      >
                        +
                      </Button>
                      <span>{farsiNumber(baby)}</span>
                      <Button
                        disabled={baby <= 0}
                        type="button"
                        className="h-5 w-5 rounded-full p-3"
                        onClick={() => handlePeopleCount(-1, "baby")}
                      >
                        -
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <FormField
              control={control}
              name="flightClass"
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
                    <span>کلاس پرواز</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="کلاس پرواز" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup className="flex flex-row-reverse">
                        <SelectItem
                          value="all"
                          className="flex cursor-pointer items-center justify-center gap-2 px-4 py-1 text-center text-sm"
                        >
                          همه کلاس ها
                        </SelectItem>
                        <SelectItem
                          value="economy"
                          className="flex cursor-pointer items-center justify-center gap-2 px-4 py-1 text-center text-sm"
                        >
                          اکونومی
                        </SelectItem>
                        <SelectItem
                          value="business"
                          className="flex cursor-pointer items-center justify-center gap-2 px-4 py-1 text-center text-sm"
                        >
                          بیزینس
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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

export default DomesticFlight;
