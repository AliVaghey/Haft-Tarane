"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import inAirplane from "@/public/img/in-airplane.svg";
import outAirplane from "@/public/img/out-airplane.svg";
import arrow from "@/public/img/arrow.svg";
import tour from "@/public/img/tour.svg";
import train from "@/public/img/train.svg";
import origin from "@/public/img/origin.svg";
import destination from "@/public/img/destination.svg";
import calender from "@/public/img/calendar.svg";
import person from "@/public/img/person.svg";
import search from "@/public/img/search-icon.svg";

const tabData = [
  { value: "in", label: "پرواز داخلی", img: inAirplane},
  { value: "out", label: "پرواز خارجی", img: outAirplane },
  { value: "class", label: "کلاس پرواز", img: arrow },
  { value: "tour", label: "تور", img: tour },
  { value: "train", label: "قطار", img: train },
];

const formData = [
  { label: "مبدأ", placeholder: "origin", img: origin },
  { label: "مقصد", placeholder: "destination", img: destination },
  {
    label: "تاریخ رفت و برگشت",
    placeholder: "date",
    img: calender,
    isDatePicker: true,
  },
  { label: "تعداد مسافران", placeholder: "num", img: person },
];

export default function SearchTabs({ className }) {
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className={cn("pb-16 pt-20", className)}>
      <div className="mx-auto w-4/5 max-lg:w-full max-lg:px-4">
        <Tabs defaultValue="in" className="w-full max-lg:hidden" dir="rtl">
          <TabsList className="flex w-[600px] items-center justify-between max-lg:w-[444px]">
            {tabData.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 text-lg max-lg:text-sm"
              >
                {tab.label}
                <Image
                  src={tab.img}
                  width={1080}
                  height={720}
                  className="size-4 max-lg:size-3"
                  alt="alt"
                />
              </TabsTrigger>
            ))}
          </TabsList>
          {tabData.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="rounded-b-xl rounded-l-xl bg-white shadow-2xl"
            >
              <div className="flex">
                <div className="mx-auto flex w-4/5 items-center justify-between gap-4 py-7 max-lg:w-full max-lg:px-9">
                  {formData.map((field) => (
                    <div
                      key={field.placeholder}
                      className="flex flex-col items-center justify-center gap-4"
                    >
                      <div className="flex items-center justify-between gap-6">
                        <p className="text-2xl max-lg:text-sm">{field.label}</p>
                        <Image
                          src={field.img}
                          alt="alt"
                          className="size-7 max-lg:size-3"
                          width={1080}
                          height={720}
                        />
                      </div>
                      {field.isDatePicker ? (
                        <DatePicker
                          calendar={persian}
                          locale={persian_fa}
                          range
                          highlightToday
                          showOtherDays
                          shadow
                        />
                      ) : (
                        <Select>
                          <SelectTrigger className="w-[180px] max-lg:w-[99px]">
                            <SelectValue
                              placeholder={`${tab.value}${field.placeholder}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">option1</SelectItem>
                            <SelectItem value="option2">option2</SelectItem>
                            <SelectItem value="option3">option3</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
                <div className="group flex w-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-l-xl bg-gray-dark max-lg:w-20">
                  <Image
                    src={search}
                    alt="alt"
                    width={1080}
                    height={720}
                    className="size-6 max-lg:size-4"
                  />
                  <p className="rounded-xl border border-gray-dark bg-gray-dark text-white group-hover:bg-gray-dark group-hover:text-yellow-primary max-lg:text-sm">
                    جست و جو
                  </p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="flex w-full items-center justify-center">
          <Button variant="outline" className="lg:hidden">
            بلیط
          </Button>
        </div>
      </div>
    </div>
  );
}
