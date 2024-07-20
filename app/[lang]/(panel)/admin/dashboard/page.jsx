"use client";

import { useUser } from "@/hooks/use-user";
import { CreditCard, List } from "lucide-react";
import { farsiNumber } from "@/lib/farsi-number";

const AdminDashboardPage = () => {
  const userHook = useUser();

  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-5">
        <span className="text-lg font-semibold">
          {userHook.adminDashboard?.admin_info?.username}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          شماره تماس : {farsiNumber(userHook.adminDashboard?.admin_info?.phone)}
        </span>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-blue-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <List className="text-blue-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">تعداد آژانس های شما</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.adminDashboard?.your_agency_count)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-green-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <CreditCard
              className="text-green-500"
              strokeWidth={1.5}
              size={36}
            />
            <span className="text-muted-foreground">فروش های امروز</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.adminDashboard?.today_sales)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-red-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <CreditCard className="text-red-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">فروش های ماه</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.adminDashboard?.month_sales)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
