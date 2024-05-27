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
import a from "@/public/img/in-airplane.svg";
import b from "@/public/img/out-airplane.svg";
import c from "@/public/img/arrow.svg";
import d from "@/public/img/tour.svg";
import e from "@/public/img/train.svg";
import f from "@/public/img/origin.svg";
import g from "@/public/img/destination.svg";
import h from "@/public/img/calendar.svg";
import i from "@/public/img/person.svg";
import search from "@/public/img/search-icon.svg";

// import DatePicker from "react-multi-date-picker";
// import { Calendar } from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

export default function SearchBox({ className }) {
  return (
    <div className={cn(className)}>
      <div className="rtl mx-auto w-4/5">
        <Tabs defaultValue="in" className="" dir="rtl">
          <TabsList>
            <TabsTrigger value="in">
              <div className="flex items-center justify-center gap-2">
                <p> پرواز داخلی </p>
                <Image
                  src={a}
                  alt="alt"
                  width={100}
                  height={100}
                  className="h-4 w-4"
                />
              </div>
            </TabsTrigger>
            <TabsTrigger value="out">
              {" "}
              <div className="flex items-center justify-center gap-2">
                <p>پرواز خارجی </p>
                <Image
                  src={b}
                  alt="alt"
                  width={100}
                  height={100}
                  className="h-4 w-4"
                />
              </div>
            </TabsTrigger>
            <TabsTrigger value="class">
              {" "}
              <div className="flex items-center justify-center gap-2">
                <p> کلاس پرواز </p>
                <Image
                  src={c}
                  alt="alt"
                  width={100}
                  height={100}
                  className="h-2 w-2"
                />
              </div>
            </TabsTrigger>
            <TabsTrigger value="tour">
              {" "}
              <div className="flex items-center justify-center gap-2">
                <p>تور </p>

                <Image
                  src={d}
                  alt="alt"
                  width={100}
                  height={100}
                  className="h-4 w-4"
                />
              </div>
            </TabsTrigger>
            <TabsTrigger value="train">
              <div className="flex items-center justify-center gap-2">
                <p> قطار </p>
                <Image
                  src={e}
                  alt="alt"
                  width={100}
                  height={100}
                  className="h-4 w-4"
                />
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="in"
            className="w-[999px] rounded-b-xl rounded-l-xl bg-white shadow-2xl"
          >
            <div className="flex justify-around">
              {" "}
              <div className="flex w-full justify-around py-4 ">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">مبدأ</p>
                    <Image
                      src={f}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="مبدأ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">تهران</SelectItem>
                      <SelectItem value="option2">کیش</SelectItem>
                      <SelectItem value="option3">مشهد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">مقصد</p>
                    <Image
                      src={g}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="مقصد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">تهران</SelectItem>
                      <SelectItem value="option2">کیش</SelectItem>
                      <SelectItem value="option3">مشهد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">تاریخ رفت و برگشت</p>
                    <Image
                      src={h}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="تاریخ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">3</SelectItem>
                      <SelectItem value="option2">9</SelectItem>
                      <SelectItem value="option3">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">تعداد مسافران</p>
                    <Image
                      src={i}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="تعداد مسافران" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">3</SelectItem>
                      <SelectItem value="option2">4</SelectItem>
                      <SelectItem value="option3">9</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="group flex w-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-l-xl bg-[#2B303D] max-lg:w-20">
                <Image
                  src={search}
                  alt="alt"
                  width={100}
                  height={100}
                  className="h-9 w-9"
                />
                <p className="bg-dark_grey group-hover:bg-dark_grey group-hover:text-primary_yellow rounded-xl border border-[#2B303D] text-white max-lg:text-sm">
                  جست و جو
                </p>
              </div>{" "}
            </div>
          </TabsContent>
          <TabsContent
            value="out"
            className="w-[1111px] rounded-b-xl rounded-l-xl bg-white shadow-2xl"
          >
            <div className="flex justify-between">
              {" "}
              <div className="flex w-full justify-around py-4 ">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">مبدأ</p>
                    <Image
                      src={f}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="مبدأ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">تهران</SelectItem>
                      <SelectItem value="option2">کیش</SelectItem>
                      <SelectItem value="option3">مشهد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="2 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">مقصد</p>
                    <Image
                      src={g}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="مقصد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">تهران</SelectItem>
                      <SelectItem value="option2">کیش</SelectItem>
                      <SelectItem value="option3">مشهد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">تاریخ رفت و برگشت</p>
                    <Image
                      src={h}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="تاریخ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">3</SelectItem>
                      <SelectItem value="option2">9</SelectItem>
                      <SelectItem value="option3">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">تعداد مسافران</p>
                    <Image
                      src={i}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="تعداد مسافران" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">3</SelectItem>
                      <SelectItem value="option2">4</SelectItem>
                      <SelectItem value="option3">9</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="group flex w-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-l-xl bg-[#2B303D] max-lg:w-20">
                <Image
                  src={search}
                  alt="alt"
                  width={100}
                  height={100}
                  className="h-9 w-9"
                />
                <p className="bg-dark_grey group-hover:bg-dark_grey group-hover:text-primary_yellow rounded-xl border border-[#2B303D] text-white max-lg:text-sm">
                  جست و جو
                </p>
              </div>{" "}
            </div>
          </TabsContent>
          <TabsContent
            value="class"
            className="w-[1111px] rounded-b-xl rounded-l-xl bg-white shadow-2xl"
          >
            <div className="flex justify-between">
              {" "}
              <div className="flex w-full justify-around py-4 ">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">مبدأ</p>
                    <Image
                      src={f}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="مبدأ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">تهران</SelectItem>
                      <SelectItem value="option2">کیش</SelectItem>
                      <SelectItem value="option3">مشهد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">مقصد</p>
                    <Image
                      src={g}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="مقصد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">تهران</SelectItem>
                      <SelectItem value="option2">کیش</SelectItem>
                      <SelectItem value="option3">مشهد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">تاریخ رفت و برگشت</p>
                    <Image
                      src={h}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="تاریخ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">3</SelectItem>
                      <SelectItem value="option2">9</SelectItem>
                      <SelectItem value="option3">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">تعداد مسافران</p>
                    <Image
                      src={i}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="تعداد مسافران" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">3</SelectItem>
                      <SelectItem value="option2">4</SelectItem>
                      <SelectItem value="option3">9</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="group flex w-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-l-xl bg-[#2B303D] max-lg:w-20">
                <Image
                  src={search}
                  alt="alt"
                  width={100}
                  height={100}
                  className="h-9 w-9"
                />
                <p className="bg-dark_grey group-hover:bg-dark_grey group-hover:text-primary_yellow rounded-xl border border-[#2B303D] text-white max-lg:text-sm">
                  جست و جو
                </p>
              </div>{" "}
            </div>
          </TabsContent>
          <TabsContent
            value="tour"
            className="w-[1111px] rounded-b-xl rounded-l-xl bg-white shadow-2xl"
          >
            <div className="flex justify-between">
              {" "}
              <div className="flex w-full justify-around py-4 ">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">مبدأ</p>
                    <Image
                      src={f}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="مبدأ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">تهران</SelectItem>
                      <SelectItem value="option2">کیش</SelectItem>
                      <SelectItem value="option3">مشهد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">مقصد</p>
                    <Image
                      src={g}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="مقصد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">تهران</SelectItem>
                      <SelectItem value="option2">کیش</SelectItem>
                      <SelectItem value="option3">مشهد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">تاریخ رفت و برگشت</p>
                    <Image
                      src={h}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="تاریخ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">3</SelectItem>
                      <SelectItem value="option2">9</SelectItem>
                      <SelectItem value="option3">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">تعداد مسافران</p>
                    <Image
                      src={i}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="تعداد مسافران" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">3</SelectItem>
                      <SelectItem value="option2">4</SelectItem>
                      <SelectItem value="option3">9</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="group flex w-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-l-xl bg-[#2B303D] max-lg:w-20">
                <Image
                  src={search}
                  alt="alt"
                  width={100}
                  height={100}
                  className="h-9 w-9"
                />
                <p className="bg-dark_grey group-hover:bg-dark_grey group-hover:text-primary_yellow rounded-xl border border-[#2B303D] text-white max-lg:text-sm">
                  جست و جو
                </p>
              </div>{" "}
            </div>
          </TabsContent>
          <TabsContent
            value="train"
            className="w-[1111px] rounded-b-xl rounded-l-xl bg-white shadow-2xl"
          >
            <div className="flex justify-between">
              {" "}
              <div className="flex w-full justify-around py-4 ">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">مبدأ</p>
                    <Image
                      src={f}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="مبدأ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">تهران</SelectItem>
                      <SelectItem value="option2">کیش</SelectItem>
                      <SelectItem value="option3">مشهد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">مقصد</p>
                    <Image
                      src={g}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="مقصد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">تهران</SelectItem>
                      <SelectItem value="option2">کیش</SelectItem>
                      <SelectItem value="option3">مشهد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">تاریخ رفت و برگشت</p>
                    <Image
                      src={h}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="تاریخ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">3</SelectItem>
                      <SelectItem value="option2">9</SelectItem>
                      <SelectItem value="option3">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-6 p-2">
                    {" "}
                    <p className="">تعداد مسافران</p>
                    <Image
                      src={i}
                      alt="alt"
                      className="h-4 w-4"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="تعداد مسافران" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">3</SelectItem>
                      <SelectItem value="option2">4</SelectItem>
                      <SelectItem value="option3">9</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="group flex w-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-l-xl bg-[#2B303D] max-lg:w-20">
                <Image
                  src={search}
                  alt="alt"
                  width={100}
                  height={100}
                  className="h-9 w-9"
                />
                <p className="bg-dark_grey group-hover:bg-dark_grey group-hover:text-primary_yellow rounded-xl border border-[#2B303D] text-white max-lg:text-sm">
                  جست و جو
                </p>
              </div>{" "}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
