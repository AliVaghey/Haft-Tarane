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
      <div className="w-4/5 mx-auto rtl">
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
                  className="w-4 h-4"
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
                  className="w-4 h-4"
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
                  className="w-2 h-2"
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
                  className="w-4 h-4"
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
                  className="w-4 h-4"
                />
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="in"
            className="bg-white rounded-b-xl rounded-l-xl shadow-2xl w-[1111px]"
          >
            <div className="flex justify-between">
              {" "}
              <div className="w-full flex justify-around py-7 ">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">مبدأ</p>
                    <Image
                      src={f}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">مقصد</p>
                    <Image
                      src={g}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">تاریخ رفت و برگشت</p>
                    <Image
                      src={h}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">تعداد مسافران</p>
                    <Image
                      src={i}
                      alt="alt"
                      className="w-4 h-4"
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
              <div className="w-44 max-lg:w-20 bg-[#2B303D] rounded-l-xl flex flex-col justify-center items-center gap-2 group cursor-pointer">
                <Image
                  src={search}
                  alt="alt"
                  width={100}
                  height={100}
                  className="w-9 h-9"
                />
                <p className="border border-[#2B303D] rounded-xl text-white bg-dark_grey group-hover:bg-dark_grey group-hover:text-primary_yellow max-lg:text-sm">
                  جست و جو
                </p>
              </div>{" "}
            </div>
          </TabsContent>
          <TabsContent
            value="out"
            className="bg-white rounded-b-xl rounded-l-xl shadow-2xl w-[1111px]"
          >
            <div className="flex justify-between">
              {" "}
              <div className="w-full flex justify-around py-7 ">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">مبدأ</p>
                    <Image
                      src={f}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">مقصد</p>
                    <Image
                      src={g}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">تاریخ رفت و برگشت</p>
                    <Image
                      src={h}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">تعداد مسافران</p>
                    <Image
                      src={i}
                      alt="alt"
                      className="w-4 h-4"
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
              <div className="w-44 max-lg:w-20 bg-[#2B303D] rounded-l-xl flex flex-col justify-center items-center gap-2 group cursor-pointer">
                <Image
                  src={search}
                  alt="alt"
                  width={100}
                  height={100}
                  className="w-9 h-9"
                />
                <p className="border border-[#2B303D] rounded-xl text-white bg-dark_grey group-hover:bg-dark_grey group-hover:text-primary_yellow max-lg:text-sm">
                  جست و جو
                </p>
              </div>{" "}
            </div>
          </TabsContent>
          <TabsContent
            value="class"
            className="bg-white rounded-b-xl rounded-l-xl shadow-2xl w-[1111px]"
          >
            <div className="flex justify-between">
              {" "}
              <div className="w-full flex justify-around py-7 ">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">مبدأ</p>
                    <Image
                      src={f}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">مقصد</p>
                    <Image
                      src={g}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">تاریخ رفت و برگشت</p>
                    <Image
                      src={h}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">تعداد مسافران</p>
                    <Image
                      src={i}
                      alt="alt"
                      className="w-4 h-4"
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
              <div className="w-44 max-lg:w-20 bg-[#2B303D] rounded-l-xl flex flex-col justify-center items-center gap-2 group cursor-pointer">
                <Image
                  src={search}
                  alt="alt"
                  width={100}
                  height={100}
                  className="w-9 h-9"
                />
                <p className="border border-[#2B303D] rounded-xl text-white bg-dark_grey group-hover:bg-dark_grey group-hover:text-primary_yellow max-lg:text-sm">
                  جست و جو
                </p>
              </div>{" "}
            </div>
          </TabsContent>
          <TabsContent
            value="tour"
            className="bg-white rounded-b-xl rounded-l-xl shadow-2xl w-[1111px]"
          >
            <div className="flex justify-between">
              {" "}
              <div className="w-full flex justify-around py-7 ">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">مبدأ</p>
                    <Image
                      src={f}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">مقصد</p>
                    <Image
                      src={g}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">تاریخ رفت و برگشت</p>
                    <Image
                      src={h}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">تعداد مسافران</p>
                    <Image
                      src={i}
                      alt="alt"
                      className="w-4 h-4"
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
              <div className="w-44 max-lg:w-20 bg-[#2B303D] rounded-l-xl flex flex-col justify-center items-center gap-2 group cursor-pointer">
                <Image
                  src={search}
                  alt="alt"
                  width={100}
                  height={100}
                  className="w-9 h-9"
                />
                <p className="border border-[#2B303D] rounded-xl text-white bg-dark_grey group-hover:bg-dark_grey group-hover:text-primary_yellow max-lg:text-sm">
                  جست و جو
                </p>
              </div>{" "}
            </div>
          </TabsContent>
          <TabsContent
            value="train"
            className="bg-white rounded-b-xl rounded-l-xl shadow-2xl w-[1111px]"
          >
            <div className="flex justify-between">
              {" "}
              <div className="w-full flex justify-around py-7 ">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">مبدأ</p>
                    <Image
                      src={f}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">مقصد</p>
                    <Image
                      src={g}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">تاریخ رفت و برگشت</p>
                    <Image
                      src={h}
                      alt="alt"
                      className="w-4 h-4"
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-between items-center gap-6 p-2">
                    {" "}
                    <p className="">تعداد مسافران</p>
                    <Image
                      src={i}
                      alt="alt"
                      className="w-4 h-4"
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
              <div className="w-44 max-lg:w-20 bg-[#2B303D] rounded-l-xl flex flex-col justify-center items-center gap-2 group cursor-pointer">
                <Image
                  src={search}
                  alt="alt"
                  width={100}
                  height={100}
                  className="w-9 h-9"
                />
                <p className="border border-[#2B303D] rounded-xl text-white bg-dark_grey group-hover:bg-dark_grey group-hover:text-primary_yellow max-lg:text-sm">
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
