"use client";

import DataTableHeader from "@/components/data-table-header";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate } from "@/lib/jalali-date";
import {
  Bed,
  Bus,
  Calendar,
  Dot,
  MapPin,
  Plane,
  Star,
  Train,
} from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import PassengersFiles from "./passengers-files";

const UserBookInfo = ({ defaultData }) => {
  console.log("defaultDatapppppppppppppppppppppp", defaultData);

  const [data, setData] = useState(
    defaultData.passengers ? JSON.parse(defaultData.passengers) : [],
  );

  console.log("data", data);
  return (
    <div className="p-2">
      <DataTableHeader
        title="جزئیات تور"
        description="مشاهده تمام جزئیات تور"
      />

      <div className="rounded-lg bg-yellow-dark">
        <div className="flex flex-col gap-3 rounded-lg p-2 shadow-lg"></div>

        <div className="flex flex-col gap-3 rounded-lg p-2 shadow-lg">
          <div className="flex flex-col justify-between rounded-lg border-2 border-yellow-primary p-4 md:flex-row">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold">
                {defaultData.tour.title}
              </span>
              <span>{defaultData.hotel.name}</span>
              <div className="flex gap-1 text-yellow-500">
                {new Array(+defaultData.hotel.star || 5)
                  .fill("")
                  .map((h, i) => (
                    <Star key={i} />
                  ))}
              </div>

              {defaultData?.tour?.support?.name && (
                <span className="text-muted-foreground">
                  پشتیبان تور : {defaultData?.tour?.support?.name}
                </span>
              )}

              {defaultData?.tour?.support?.phone && (
                <span className="text-muted-foreground">
                  شماره تماس پشتیبان :{" "}
                  {farsiNumber(defaultData?.tour?.support?.phone)}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-muted-foreground">
                آژانس {defaultData?.agency?.name}
              </span>
              <div className="rounded-lg bg-yellow-400 px-5 py-1.5 text-center">
                کد تور : {farsiNumber(defaultData.tour.id)}
              </div>
            </div>
          </div>

          {defaultData.tour.transportation_type === "system" ? (
            <div className="flex flex-col gap-4 rounded-lg border-2 border-yellow-primary p-4">
              <div className="font-semibold">اطلاعات رفت و برگشت :</div>
              <Separator className="h-0.5 bg-yellow-primary" />
              <div className="grid grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-2">
                  <Plane size={16} />{" "}
                  <span>
                    {defaultData.transportation[0].flight.airline}{" "}
                    {defaultData.transportation[0].flight.from}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />{" "}
                  <span>
                    {farsiNumber(jaliliDate(defaultData.date.start))}{" "}
                    {farsiNumber(
                      defaultData.transportation[0].flight.time_flight,
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Plane size={16} />{" "}
                  <span>
                    {defaultData.transportation[1].flight.airline}{" "}
                    {defaultData.transportation[1].flight.from}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />{" "}
                  <span>
                    {farsiNumber(jaliliDate(defaultData.date.end))}{" "}
                    {farsiNumber(
                      defaultData.transportation[1].flight.time_flight,
                    )}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 rounded-lg border-2 border-yellow-primary p-4">
              <div className="font-semibold">اطلاعات رفت و برگشت :</div>
              <Separator className="h-0.5 bg-yellow-primary" />
              <div className="grid grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-2">
                  <Plane size={16} />{" "}
                  <span>
                    {defaultData.transportation[0].company_name}{" "}
                    {defaultData.transportation[0].origin}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />{" "}
                  <span>
                    {farsiNumber(jaliliDate(defaultData.date.start))}{" "}
                    {farsiNumber(defaultData.transportation[0].start)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Plane size={16} />{" "}
                  <span>
                    {defaultData.transportation[1].company_name}{" "}
                    {defaultData.transportation[1].origin}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />{" "}
                  <span>
                    {farsiNumber(jaliliDate(defaultData.date.end))}{" "}
                    {farsiNumber(defaultData.transportation[1].start)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 rounded-lg border-2 border-yellow-primary p-4">
            <div className="font-semibold">توضیحات تور :</div>
            <Separator className="h-0.5 bg-yellow-primary" />
            <div className="flex flex-col gap-2">
              {defaultData.tour.certificate.tab_descriptions !== null &&
                defaultData.tour.certificate.tab_descriptions.map((d, i) => (
                  <div key={i} className="flex">
                    <Dot />
                    <span>{d}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border-2 border-yellow-primary p-4">
            <div className="font-semibold">خدمات تور :</div>
            <Separator className="h-0.5 bg-yellow-primary" />
            <div className="flex flex-col gap-2">
              {defaultData.tour.certificate.free_services !== null &&
                defaultData.tour.certificate.free_services.map((d, i) => (
                  <div key={i} className="flex">
                    <Dot />
                    <span>{d}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border-2 border-yellow-primary p-4">
            <div className="font-semibold">مدارک مورد نیاز :</div>
            <Separator className="h-0.5 bg-yellow-primary" />
            <div className="flex flex-col gap-2">
              {defaultData.tour.certificate.certificates !== null &&
                defaultData.tour.certificate.certificates.map((d, i) => (
                  <div key={i} className="flex">
                    <Dot />
                    <span>{d}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border-2 border-yellow-primary p-4">
            <div className="font-semibold">شرایط کنسلی :</div>
            <Separator className="h-0.5 bg-yellow-primary" />
            <div className="flex flex-col gap-2">
              <span className="inline-block w-fit rounded-lg bg-yellow-primary p-2">
                {defaultData.tour.certificate.cancel_rules}
              </span>
            </div>
          </div>

          <div className="flex flex-col rounded-lg border-2 border-yellow-primary p-4">
            <div className="font-semibold">اطلاعات حمل و نقل :</div>
            <Separator className="mt-4 h-0.5 bg-yellow-primary" />
            <div className="mt-5 flex flex-col gap-2">
              <div className="flex items-center gap-2 pr-3">
                <MapPin size={20} className="text-yellow-600" />
                <span>شروع تور : {defaultData.tour.origin}</span>
              </div>
              <div className="mr-10 h-8 border-r border-dashed border-black" />
              {defaultData.tour.transportation_type === "my_transportation" &&
                defaultData.transportation.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex w-fit flex-col rounded-lg border-2 border-dashed border-yellow-primary p-2 pl-20">
                      <div className="flex items-center gap-2">
                        {item.type === "هواپیما" && (
                          <Plane size={20} className="text-yellow-600" />
                        )}
                        {item.type === "قطار" && (
                          <Train size={20} className="text-yellow-600" />
                        )}
                        {item.type === "اتوبوس" && (
                          <Bus size={20} className="text-yellow-600" />
                        )}
                        <span>
                          {item.type === "هواپیما" && "فرودگاه"}
                          {item.type === "قطار" && "راه آهن"}
                          {item.type === "اتوبوس" && "ترمینال"} {item.origin}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Plane size={20} className="text-yellow-600" />
                        <span>{item.company_name}</span>
                        <span>رفت: {farsiNumber(item.start)}</span>
                      </div>
                    </div>
                    <div className="mr-10 h-8 border-r border-dashed border-black" />
                    {defaultData.transportation.length > index + 1 && (
                      <>
                        <div className="flex items-center gap-2 pr-3">
                          <Bed size={20} className="text-yellow-600" />
                          <span>
                            {farsiNumber(defaultData.tour.staying_nights)} شب
                            اقامت در {defaultData.tour.destination}
                          </span>
                        </div>
                        <div className="mr-10 h-8 border-r border-dashed border-black" />
                      </>
                    )}
                  </div>
                ))}

              {defaultData.tour.transportation_type === "system" &&
                defaultData.transportation.map((i, index) => {
                  const item = i.flight;
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="flex w-fit flex-col rounded-lg border-2 border-dashed border-yellow-primary p-2 pl-20">
                        <div className="flex items-center gap-2">
                          {/* {item.type === "هواپیما" && (
                          <Plane size={20} className="text-yellow-600" />
                        )}
                        {item.type === "قطار" && (
                          <Train size={20} className="text-yellow-600" />
                        )}
                        {item.type === "اتوبوس" && (
                          <Bus size={20} className="text-yellow-600" />
                        )} */}
                          <Plane size={20} className="text-yellow-600" />
                          {/* <span>
                          {item.type === "هواپیما" && "فرودگاه"}
                          {item.type === "قطار" && "راه آهن"}
                          {item.type === "اتوبوس" && "ترمینال"} {item.origin}
                        </span> */}
                          <span>فرودگاه {item.from}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Plane size={20} className="text-yellow-600" />
                          <span>{item.airline}</span>
                          <span>رفت: {farsiNumber(item.time_flight)}</span>
                        </div>
                      </div>
                      <div className="mr-10 h-8 border-r border-dashed border-black" />
                      {defaultData.transportation.length > index + 1 && (
                        <>
                          <div className="flex items-center gap-2 pr-3">
                            <Bed size={20} className="text-yellow-600" />
                            <span>
                              {farsiNumber(defaultData.tour.staying_nights)} شب
                              اقامت در {defaultData.tour.destination}
                            </span>
                          </div>
                          <div className="mr-10 h-8 border-r border-dashed border-black" />
                        </>
                      )}
                    </div>
                  );
                })}
              <div className="flex items-center gap-2 pr-3">
                <MapPin size={20} className="text-yellow-600" />
                <span>پایان تور : {defaultData.tour.destination}</span>
              </div>
            </div>
          </div>

          {defaultData.user && (
            <>
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
            </>
          )}
        </div>
        {data.map((item, index) => (
          <div key={index} className="p-2 pt-6">
            <span className="w-fit rounded-lg bg-yellow-400 px-6 py-1 font-semibold">
              اتاق {farsiNumber(index + 1)}
            </span>
            <div className="mt-2 flex flex-col gap-2">
              {item.passengers.map((p, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 rounded-lg p-2 shadow-lg"
                >
                  <span className="w-fit rounded-md bg-yellow-dark px-3 py-1">
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
        <div className="flex flex-col justify-between rounded-lg border-2 border-yellow-primary p-4 md:flex-row">
          <PassengersFiles data={defaultData} />
        </div>
      </div>
    </div>
  );
};

export default UserBookInfo;
