"use client";

import { useUser } from "@/hooks/use-user";
import { List } from "lucide-react";
import { farsiNumber } from "@/lib/farsi-number";

const AgencyDashboardPage = () => {
  const userHook = useUser();

  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-5">
        <span className="text-lg font-semibold">
          آژانس {userHook.agencyDashboard?.agency_info.agency_name}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          مدیریت آژانس : {userHook.agencyDashboard?.agency_info.username}
          {" -- "} شماره تماس :{" "}
          {farsiNumber(userHook.agencyDashboard?.agency_info.agency_c_phone)}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          ادمین : {userHook.agencyDashboard?.admin.username}
          {" -- "} شماره تماس :{" "}
          {farsiNumber(userHook.agencyDashboard?.admin.phone)}
        </span>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-yellow-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <List className="text-yellow-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">تعداد فروش امروز</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.agencyDashboard?.today_sales)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-green-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <List className="text-green-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">تورهای پیشنویس</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.agencyDashboard?.draft_tours)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-blue-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <List className="text-blue-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">
              تورهای در انتظار تایید
            </span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.agencyDashboard?.pending_sales)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-red-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <List className="text-red-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">تورهای رد شده</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.agencyDashboard?.rejected_tours)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboardPage;
