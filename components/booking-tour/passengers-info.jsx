"use client";

import DataTableHeader from "@/components/data-table-header";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate } from "@/lib/jalali-date";
import { useState } from "react";
import PassengersFiles from "./passengers-files";

const PassengersInfo = ({ defaultData }) => {

  const [data, setData] = useState(
    defaultData.passengers ? JSON.parse(defaultData.passengers) : [],
  );


  return (
    <div className="p-2">
      <DataTableHeader
        title="جزئیات مسافران"
        description="مشاهده لیست جزئیات مسافران"
      />
      <div className="rounded-lg border border-yellow-primary">
        <div className="flex flex-col gap-1 rounded-lg p-2 shadow-lg">
          <PassengersFiles data={defaultData} />
        </div>
        <div className="flex flex-col gap-1 rounded-lg p-2 shadow-lg">
          <span className="w-fit rounded-md bg-yellow-dark p-1.5">
            مشخصات کاربر
          </span>

          <div className="flex gap-2">
            <span className="text-muted-foreground">نام کاربری : </span>
            <span> {defaultData.user.username} </span>
          </div>

          <div className="flex gap-2">
            <span className="text-muted-foreground">نام : </span>
            <span> {defaultData.user.first_name_fa} </span>
          </div>

          <div className="flex gap-2">
            <span className="text-muted-foreground">نام خانوادگی : </span>
            <span> {defaultData.user.last_name_fa} </span>
          </div>

          <div className="flex gap-2">
            <span className="text-muted-foreground">کد ملی : </span>
            <span> {defaultData.user.national_code} </span>
          </div>

          <div className="flex gap-2">
            <span className="text-muted-foreground">جنسیت : </span>
            {defaultData.user.gender === "male" && <span>مرد</span>}
            {defaultData.user.gender === "female" && <span>زن</span>}
          </div>

          <div className="flex gap-2">
            <span className="text-muted-foreground">تاریخ تولد : </span>
            <span>
              {" "}
              {farsiNumber(jaliliDate(defaultData.user.birth_date))}{" "}
            </span>
          </div>
        </div>
        {data.map((item, index) => (
          <div key={index} className="p-2">
            <span className="m-1 w-fit font-semibold">
              اتاق {farsiNumber(index + 1)}
            </span>
            <div className="flex flex-col gap-2">
              {item.passengers.map((p, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 rounded-lg p-2 shadow-lg"
                >
                  <span className="w-fit rounded-md bg-yellow-dark p-1.5">
                    مسافر {farsiNumber(i + 1)}
                  </span>

                  <div className="flex gap-2">
                    <span className="text-muted-foreground">رده سنی : </span>
                    {p.type === "adl" && <span> بزرگسال </span>}
                    {p.type === "cld_2" && <span> کودک ۲ تا ۶ سال </span>}
                    {p.type === "cld_6" && <span> کودک ۶ تا ۱۲ سال </span>}
                    {p.type === "baby" && <span> نوزاد </span>}
                  </div>

                  <div className="flex gap-2">
                    <span className="text-muted-foreground">نام : </span>
                    <span> {p.first_name} </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-muted-foreground">
                      نام خانوادگی :{" "}
                    </span>
                    <span> {p.last_name} </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-muted-foreground">کد ملی : </span>
                    <span> {p.national_code} </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-muted-foreground">ملیت : </span>
                    <span> {p.nationality} </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-muted-foreground">جنسیت : </span>
                    <span> {p.gender} </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-muted-foreground">تاریخ تولد : </span>
                    <span> {farsiNumber(jaliliDate(p.birth_day))} </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassengersInfo;
